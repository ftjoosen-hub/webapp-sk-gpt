import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

export async function POST(request: NextRequest) {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not found in environment variables')
      return NextResponse.json(
        { 
          error: 'OpenAI API key niet geconfigureerd. Voeg OPENAI_API_KEY toe aan je environment variables.',
          hint: 'Voor audio transcriptie is een OpenAI API key vereist',
          debug: 'Environment variable OPENAI_API_KEY is not set'
        }, 
        { status: 500 }
      )
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'Geen audio bestand ontvangen' },
        { status: 400 }
      )
    }

    // Validate file type (Whisper supported formats)
    const allowedTypes = [
      'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/m4a', 'audio/aac', 
      'audio/ogg', 'audio/flac', 'audio/webm', 'audio/mp4'
    ]
    
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(mp3|wav|m4a|aac|ogg|flac|webm|mp4|mpeg|mpga)$/i)) {
      return NextResponse.json(
        { error: 'Niet ondersteund audio formaat. Ondersteunde formaten: MP3, WAV, M4A, AAC, OGG, FLAC, WebM, MP4' },
        { status: 400 }
      )
    }

    // Check file size - OpenAI Whisper limit is 25MB
    const maxSize = 25 * 1024 * 1024 // 25MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { 
          error: 'Audio bestand te groot. Maximum grootte is 25MB.',
          actualSize: `${(file.size / 1024 / 1024).toFixed(1)}MB`
        },
        { status: 400 }
      )
    }

    try {
      console.log('🎵 Starting OpenAI Whisper transcription...', {
        fileName: file.name,
        fileSize: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
        mimeType: file.type
      })

      // Create transcription using OpenAI Whisper
      const transcription = await openai.audio.transcriptions.create({
        file: file,
        model: 'whisper-1',
        language: 'nl', // Dutch language
        response_format: 'text'
      })

      console.log('✅ OpenAI Whisper transcription successful', {
        transcriptionLength: transcription.length,
        fileName: file.name,
        fileSize: `${(file.size / 1024 / 1024).toFixed(1)}MB`
      })

      return NextResponse.json({
        success: true,
        transcription: transcription,
        fileName: file.name,
        fileSize: file.size,
        engine: 'OpenAI Whisper',
        message: 'Audio succesvol getranscribeerd met OpenAI Whisper'
      })

    } catch (transcriptionError: any) {
      console.error('OpenAI Whisper transcription error:', transcriptionError)
      
      // Handle specific OpenAI errors
      if (transcriptionError?.status === 429) {
        return NextResponse.json(
          { error: 'OpenAI API quota overschreden. Probeer later opnieuw.' },
          { status: 429 }
        )
      }
      
      if (transcriptionError?.status === 413) {
        return NextResponse.json(
          { 
            error: 'Audio bestand te groot voor OpenAI Whisper (max 25MB).',
            hint: 'Probeer een kleiner bestand of comprimeer de audio'
          },
          { status: 413 }
        )
      }

      // More detailed error info
      return NextResponse.json(
        { 
          error: 'Fout bij audio transcriptie',
          details: transcriptionError?.message || 'Onbekende fout bij OpenAI Whisper transcriptie',
          hint: 'Controleer of het audio bestand geldig is en probeer een kleiner bestand'
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Audio transcription API error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return NextResponse.json(
      { 
        error: 'Er is een fout opgetreden bij het verwerken van het audio bestand',
        details: errorMessage,
        timestamp: new Date().toISOString(),
        engine: 'OpenAI Whisper'
      },
      { status: 500 }
    )
  }
}