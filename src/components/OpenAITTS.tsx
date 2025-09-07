import React, { useState, useRef, useEffect } from 'react'

// Available OpenAI TTS voices
export const OPENAI_VOICES = [
  { name: 'alloy', description: 'Alloy - Neutraal en helder' },
  { name: 'echo', description: 'Echo - Mannelijk en kalm' },
  { name: 'fable', description: 'Fable - Brits accent' },
  { name: 'onyx', description: 'Onyx - Diep en krachtig' },
  { name: 'nova', description: 'Nova - Vrouwelijk en warm' },
  { name: 'shimmer', description: 'Shimmer - Zacht en vriendelijk' }
]

type TtsStatus = 'idle' | 'generating' | 'loading' | 'playing' | 'paused' | 'error'

interface OpenAITTSProps {
  content: string
  isMarkdown?: boolean
  isStreaming?: boolean
  className?: string
  selectedVoice?: typeof OPENAI_VOICES[0]
  hideSettings?: boolean
}

export default function OpenAITTS({ 
  content, 
  isMarkdown = true, 
  isStreaming = false,
  className = "",
  selectedVoice: propSelectedVoice,
  hideSettings = false
}: OpenAITTSProps) {
  const [ttsStatus, setTtsStatus] = useState<TtsStatus>('idle')
  const [selectedVoice, setSelectedVoice] = useState(propSelectedVoice || OPENAI_VOICES[0]) // Alloy as default
  const [showVoiceSettings, setShowVoiceSettings] = useState(false)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  const [progress, setProgress] = useState('')
  
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Update local state when props change
  useEffect(() => {
    if (propSelectedVoice) {
      setSelectedVoice(propSelectedVoice)
    }
  }, [propSelectedVoice])

  // Convert markdown to plain text
  const convertMarkdownToPlainText = (markdown: string): string => {
    return markdown
      .replace(/#{1,6}\s+/g, '') // Headers
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Bold
      .replace(/\*([^*]+)\*/g, '$1') // Italic  
      .replace(/`([^`]+)`/g, '$1') // Inline code
      .replace(/```[\s\S]*?```/g, '[Code]') // Code blocks
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
      .replace(/^\s*[-*+]\s+/gm, '• ') // Lists
      .replace(/^\s*\d+\.\s+/gm, '') // Numbered lists
      .replace(/^\s*>\s+/gm, '') // Quotes
      .replace(/\n{2,}/g, ' ') // Multiple newlines to single space
      .replace(/\s+/g, ' ') // Multiple spaces to single
      .trim()
  }

  const generateTTS = async () => {
    if (isStreaming || !content.trim()) return

    // If currently playing, pause/resume
    if (ttsStatus === 'playing' && audioRef.current) {
      audioRef.current.pause()
      setTtsStatus('paused')
      return
    }

    if (ttsStatus === 'paused' && audioRef.current) {
      audioRef.current.play()
      setTtsStatus('playing')
      return
    }

    await startNewTTS()
  }

  const startNewTTS = async () => {
    setTtsStatus('generating')
    setProgress('Audio genereren...')

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    try {
      const textToSpeak = isMarkdown ? convertMarkdownToPlainText(content) : content

      // Limit text length for OpenAI TTS (4096 characters max)
      const limitedText = textToSpeak.length > 4096 ? textToSpeak.substring(0, 4096) + '...' : textToSpeak

      console.log('🚀 Generating TTS audio with OpenAI...', {
        textLength: limitedText.length,
        voice: selectedVoice.name
      })

      const response = await fetch('/api/generate-tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: limitedText,
          voiceName: selectedVoice.name
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('TTS API Error:', response.status, errorText)
        throw new Error(`TTS API fout: ${response.status}`)
      }

      setTtsStatus('loading')
      setProgress('Audio laden...')

      const audioBlob = await response.blob()
      console.log('Audio blob created:', {
        type: audioBlob.type,
        size: audioBlob.size
      })

      const audioUrl = URL.createObjectURL(audioBlob)
      const audio = new Audio()
      audioRef.current = audio
      setCurrentAudio(audio)

      audio.onloadstart = () => {
        console.log('🔄 Audio loading started')
        setProgress('Audio wordt geladen...')
      }
      audio.oncanplay = () => {
        console.log('✅ Audio ready to play')
        setProgress('')
      }
      
      audio.onplay = () => {
        console.log('🎉 Audio playing')
        setTtsStatus('playing')
        setProgress('')
      }
      audio.onpause = () => setTtsStatus('paused')
      audio.onended = () => {
        console.log('✅ Audio playback completed')
        setTtsStatus('idle')
        setCurrentAudio(null)
        audioRef.current = null
        setProgress('')
        URL.revokeObjectURL(audioUrl)
      }
      audio.onerror = (event) => {
        console.error('❌ Audio playback error:', event)
        setTtsStatus('error')
        setProgress('Afspeel fout')
        setTimeout(() => {
          setTtsStatus('idle')
          setProgress('')
        }, 3000)
        setCurrentAudio(null)
        audioRef.current = null
        URL.revokeObjectURL(audioUrl)
      }

      audio.src = audioUrl
      console.log('🎵 Starting audio playback...')
      
      try {
        await audio.play()
        console.log('✅ Audio playback started successfully!')
      } catch (playError) {
        console.error('❌ Play error:', playError)
        throw playError
      }

    } catch (error) {
      console.error('TTS Error:', error)
      setTtsStatus('error')
      setProgress('Er is een fout opgetreden')
      setTimeout(() => {
        setTtsStatus('idle')
        setProgress('')
      }, 3000)
    }
  }

  const stopTTS = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setCurrentAudio(null)
    setTtsStatus('idle')
    setProgress('')
  }

  const getTtsButtonText = () => {
    switch (ttsStatus) {
      case 'generating': return `🔄 ${progress || 'Genereren...'}`
      case 'loading': return `📥 ${progress || 'Laden...'}`
      case 'playing': return '⏸️ Pauzeren'
      case 'paused': return '▶️ Hervatten'
      case 'error': return `❌ ${progress || 'Fout'}`
      default: return `🔊 OpenAI TTS (${selectedVoice.name})`
    }
  }

  const getTtsButtonClass = () => {
    const baseClass = "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed"
    
    switch (ttsStatus) {
      case 'generating':
      case 'loading':
        return `${baseClass} bg-blue-100 text-blue-700 border border-blue-200 animate-pulse`
      case 'playing':
        return `${baseClass} bg-green-100 text-green-700 border border-green-200`
      case 'paused':
        return `${baseClass} bg-yellow-100 text-yellow-700 border border-yellow-200`
      case 'error':
        return `${baseClass} bg-red-100 text-red-700 border border-red-200`
      default:
        return `${baseClass} bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 border border-gray-200 hover:border-blue-200`
    }
  }

  if (!content.trim()) return null

  return (
    <div className={`${className}`}>
      {/* Horizontal Layout - Main TTS Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={generateTTS}
          disabled={isStreaming || ttsStatus === 'generating' || ttsStatus === 'loading'}
          className={getTtsButtonClass()}
          title={`Lees voor met ${selectedVoice.name} stem`}
        >
          <span className="truncate">{getTtsButtonText()}</span>
        </button>

        {!hideSettings && (
          <button
            onClick={() => setShowVoiceSettings(!showVoiceSettings)}
            className={`p-2 rounded-lg text-sm transition-all duration-200 ${
              showVoiceSettings 
                ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                : 'bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-700 border border-gray-200'
            }`}
            title="Stem instellingen"
          >
            🎤
          </button>
        )}

        {(ttsStatus === 'playing' || ttsStatus === 'paused') && (
          <button
            onClick={stopTTS}
            className="p-2 rounded-lg text-sm transition-all duration-200 bg-red-100 hover:bg-red-200 text-red-700 border border-red-200"
            title="Stop voorlezen"
          >
            ⏹️
          </button>
        )}
      </div>

      {/* Voice Settings Panel - Show below when toggled - Only if not hidden */}
      {!hideSettings && showVoiceSettings && (
        <div className="absolute z-10 mt-2 right-0 w-80 p-4 bg-purple-50 border border-purple-200 rounded-lg shadow-lg space-y-4">
          <div>
            <label className="block text-purple-700 text-sm font-medium mb-2">🎭 Stemkeuze</label>
            <select
              value={selectedVoice.name}
              onChange={(e) => {
                const voice = OPENAI_VOICES.find(v => v.name === e.target.value)
                if (voice) setSelectedVoice(voice)
              }}
              className="w-full p-2 border border-purple-200 rounded-lg bg-white text-purple-700"
            >
              {OPENAI_VOICES.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.description}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}