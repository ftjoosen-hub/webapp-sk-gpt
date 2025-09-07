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
      console.error('OPENAI_API_KEY not found in environment variables')
      return NextResponse.json(
        { 
          error: 'API configuratie ontbreekt. Check Environment Variables.',
          hint: 'Voeg OPENAI_API_KEY toe aan je environment variables',
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

    // Create streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Create OpenAI streaming completion using gpt-4o
          const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: messages,
            max_tokens: 4000,
            temperature: 0.7,
            stream: true
          })

          // Stream the response token by token
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content
            
            if (content) {
              // Check if controller is still open before sending
              try {
                const data = JSON.stringify({ 
                  token: content,
                  timestamp: new Date().toISOString()
                })
                
                controller.enqueue(
                  new TextEncoder().encode(`data: ${data}\n\n`)
                )
              } catch (error) {
                console.log('Controller already closed, stopping stream')
                break
              }
            }
          }

          // Send completion signal only if controller is still open
          try {
            controller.enqueue(
              new TextEncoder().encode(`data: ${JSON.stringify({ done: true })}\n\n`)
            )
            
            controller.close()
          } catch (error) {
            console.log('Controller already closed during completion')
          }

        } catch (error) {
          console.error('Streaming error:', error)
          
          // Send error to client
          const errorData = JSON.stringify({
            error: true,
            message: error instanceof Error ? error.message : 'Streaming error occurred'
          })
          
          controller.enqueue(
            new TextEncoder().encode(`data: ${errorData}\n\n`)
          )
          
          controller.close()
        }
      }
    })

    // Return streaming response with proper headers
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })

  } catch (error) {
    console.error('Streaming API error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return NextResponse.json(
      { 
        error: 'Er is een fout opgetreden bij het verwerken van je bericht',
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}