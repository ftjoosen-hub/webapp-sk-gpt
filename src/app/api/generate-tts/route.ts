import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

// Available OpenAI TTS voices
const OPENAI_VOICES = [
  { name: 'alloy', description: 'Alloy - Neutraal en helder' },
  { name: 'echo', description: 'Echo - Mannelijk en kalm' },
  { name: 'fable', description: 'Fable - Brits accent' },
  { name: 'onyx', description: 'Onyx - Diep en krachtig' },
  { name: 'nova', description: 'Nova - Vrouwelijk en warm' },
  { name: 'shimmer', description: 'Shimmer - Zacht en vriendelijk' }
]

// Helper function to validate voice name
function isValidVoice(voiceName: string): boolean {
  return OPENAI_VOICES.some(voice => voice.name === voiceName)
}

export async function POST(request: NextRequest) {
  try {
    // Check API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not found in environment variables')
      return NextResponse.json(
        { 
          error: 'API configuratie ontbreekt. Check Environment Variables.',
          hint: 'Voeg OPENAI_API_KEY toe aan je environment variables'
        }, 
        { status: 500 }
      )
    }

    // Parse request data
    const body = await request.json()
    console.log('TTS request received:', { 
      textLength: body.text?.length, 
      voiceName: body.voiceName
    })
    
    const { 
      text, 
      voiceName = 'alloy'
    } = body

    // Input validation
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Tekst is vereist en moet een string zijn' },
        { status: 400 }
      )
    }

    if (text.length > 4096) {
      return NextResponse.json(
        { error: 'Tekst mag maximaal 4.096 karakters bevatten' },
        { status: 400 }
      )
    }

    if (!isValidVoice(voiceName)) {
      return NextResponse.json(
        { error: `Ongeldige stem: ${voiceName}. Gebruik een van de beschikbare OpenAI stemmen.` },
        { status: 400 }
      )
    }

    console.log('Generating TTS audio with OpenAI...')

    // Generate speech using OpenAI TTS
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: voiceName as any,
      input: text,
      response_format: 'mp3'
    })

    // Convert response to buffer
    const buffer = Buffer.from(await mp3.arrayBuffer())
    
    console.log('TTS generation successful, audio data length:', buffer.length)

    // Return MP3 audio file
    return new Response(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })

  } catch (error: any) {
    console.error('TTS API error:', error)
    
    // Handle specific OpenAI API errors
    if (error.status === 429) {
      return NextResponse.json(
        { 
          error: 'API quota bereikt. Probeer het later opnieuw.',
          details: 'Rate limit exceeded'
        },
        { status: 429 }
      )
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return NextResponse.json(
      { 
        error: 'Er is een fout opgetreden bij het genereren van audio',
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// Export available voices for frontend use
export async function GET() {
  return NextResponse.json({
    voices: OPENAI_VOICES,
    maxTextLength: 4096,
    supportedLanguages: [
      'nl-NL', 'en-US', 'de-DE', 'fr-FR', 'es-ES', 'it-IT', 
      'pt-BR', 'ja-JP', 'ko-KR', 'zh-CN', 'ar-EG', 'hi-IN',
      'id-ID', 'ru-RU', 'th-TH', 'tr-TR', 'vi-VN', 'uk-UA',
      'pl-PL', 'ro-RO', 'bn-BD', 'mr-IN', 'ta-IN', 'te-IN'
    ]
  })
}