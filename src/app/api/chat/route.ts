import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

// Helper function to convert base64 to OpenAI image format
function base64ToOpenAIImage(base64: string) {
  return {
    type: "image_url" as const,
    image_url: {
      url: base64
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not found in environment variables');
      return NextResponse.json(
        { 
          error: 'API configuratie ontbreekt. Check Netlify Environment Variables.',
          hint: 'Voeg OPENAI_API_KEY toe in Netlify Site Settings → Environment Variables',
          debug: 'Environment variable OPENAI_API_KEY is not set'
        }, 
        { status: 500 }
      )
    }

    // Parse request data
    const body = await request.json()
    console.log('Received request body:', body)
    
    const { message, image, images } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Bericht is vereist' },
        { status: 400 }
      )
    }

    // Input validation
    if (typeof message !== 'string' || message.length > 100000) {
      return NextResponse.json(
        { error: 'Bericht moet een string zijn van maximaal 100.000 karakters' },
        { status: 400 }
      )
    }

    // Prepare messages array for OpenAI
    const messages: any[] = []
    
    // Create user message with text and images
    const userMessage: any = {
      role: 'user',
      content: []
    }

    // Add text content
    userMessage.content.push({
      type: 'text',
      text: message
    })

    // Add images if provided
    if (images && images.length > 0) {
      // Multiple images
      images.forEach((imageData: string) => {
        userMessage.content.push(base64ToOpenAIImage(imageData))
      })
    } else if (image) {
      // Single image (backward compatibility)
      userMessage.content.push(base64ToOpenAIImage(image))
    }

    messages.push(userMessage)

    // Make OpenAI API call using gpt-4o (most capable model)
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages,
      max_tokens: 4000,
      temperature: 0.7
    })

    const response = completion.choices[0]?.message?.content || 'Geen response ontvangen'

    return NextResponse.json({ 
      response: response,
      success: true,
      model: 'gpt-4o'
    })

  } catch (error) {
    console.error('Fout bij het aanroepen van OpenAI API:', error)
    
    // Better error information for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return NextResponse.json(
      { 
        error: 'Er is een fout opgetreden bij het verwerken van je bericht',
        details: errorMessage,
        timestamp: new Date().toISOString(),
        hint: 'Check Netlify Function logs voor meer details'
      },
      { status: 500 }
    )
  }
}