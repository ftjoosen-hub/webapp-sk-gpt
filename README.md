# 🚀 Ultimate ChatGPT Education Template - Next.js

> **Een complete, professionele AI template met OpenAI ChatGPT API, camera, multi-file upload, audio transcriptie, advanced TTS en meer!**
>
> **Gemaakt door Tom Naberink voor de onderwijssector**

Een geavanceerde Next.js template die **alles** biedt wat je nodig hebt voor innovatieve ChatGPT-projecten in het onderwijs. Van simpele chatbots tot complexe multi-modal AI applicaties - dit is je startpunt!

## ✨ Complete Feature Set

### 🎯 **Core AI Functionaliteiten**
- 🧠 **ChatGPT-4o**: Meest capabele OpenAI model voor alle taken
- 🎵 **Audio Transcriptie**: OpenAI Whisper voor speech-to-text
- 📸 **Multi-Image Analysis**: Meerdere afbeeldingen tegelijk analyseren
- 💬 **Markdown Rendering**: Perfecte opmaak van AI responses
- 🗣️ **Spraakherkenning**: Browser native voice input
- ⚡ **Streaming Responses**: Real-time AI response weergave

### 🔊 **Advanced Text-to-Speech (TTS)**
- 🎙️ **Dual TTS Engines**: Microsoft TTS + OpenAI TTS
- 🎭 **6 OpenAI Voices**: Alloy, Echo, Fable, Onyx, Nova, Shimmer
- ⚡ **Speed Control**: 4 snelheden voor Microsoft TTS (0.75x tot 2.0x)
- ⚙️ **Unified Settings**: Één settings dropdown voor alle TTS opties
- 📱 **Responsive Interface**: Geoptimaliseerd voor alle schermformaten

### 📁 **Geavanceerd File Management**
- 🖼️ **Afbeeldingen**: JPG, PNG, GIF, WebP, BMP - met preview en multi-select
- 📄 **Documenten**: PDF, DOCX, TXT, MD - automatische tekst extractie
- 📊 **Data**: CSV, JSON - gestructureerde data analyse
- 🎵 **Audio**: MP3, WAV, OGG, M4A, AAC, FLAC, MP4, WebM - auto-transcriptie
- 📱 **Camera Capture**: Direct foto's maken vanuit de browser
- 🎯 **Drag & Drop**: Bestanden slepen en neerzetten
- 📋 **Copy/Paste**: Afbeeldingen, URLs en tekst plakken
- ✅ **Batch Processing**: Meerdere bestanden tegelijk selecteren en verwerken

### 🎨 **User Experience**
- 💜 **Modern Design**: Strakke paarse interface met Tailwind CSS
- 📱 **Mobile First**: Perfect responsive op alle apparaten
- ⚡ **Real-time Feedback**: Loading states, progress indicators
- 🎮 **Keyboard Shortcuts**: Enter om te verzenden, Ctrl+V om te plakken
- 🔒 **Secure**: Alle API keys blijven server-side
- 📄 **Word Export**: AI responses exporteren naar Word documenten
- 📋 **One-Click Copy**: Responses kopiëren naar klembord

### 🚀 **Deployment & Performance**
- 🌐 **Netlify Optimized**: Perfect voor Bolt.new deployment
- ⚡ **Next.js 15**: Nieuwste versie met optimale performance
- 🔧 **TypeScript**: Volledig type-safe development
- 📦 **Lean Dependencies**: Alleen wat nodig is, geen bloat

## 🚀 Quick Start: Van 0 naar AI in 5 Minuten!

### Stap 1: 🍴 Fork dit template in GitHub
Fork dit template in GitHub. Ga naar [github.com](https://github.com) en login in. Ga dan naar deze pagina: [https://github.com/TomNaberink/apitemplateTom](https://github.com/TomNaberink/apitemplateTom)
Klik rechtsbovenin op 'Use this template', geef het een gepaste naam voor je project en klik op 'create fork'.

### Stap 2: 📥 Import in Bolt.new
Open [Bolt.new](https://bolt.new) en login. Selecteer 'import from github' en login op GitHub. Kies dan de 'repository' die je net hebt geforkt.

### Stap 3: 🔑 API Keys Verkrijgen
**Vereist:** [OpenAI API Key](https://platform.openai.com/api-keys) (betaald)

⚠️ **Kosten**: OpenAI API is betaald maar heeft een gratis trial credit. Monitor je usage!

### Stap 4: 🛠️ Project Setup
```bash
# Clone het project
git clone https://github.com/TomNaberink/templateAPIinclcamera.git
cd templateAPIinclcamera

# Dependencies installeren
npm install

# Environment variables
cp .env.example .env.local
# Edit .env.local en voeg je API keys toe
```

### Stap 5: 🔧 Environment Configuration
Maak `.env.local` aan met je API keys:

```env
# VEREIST: Voor alle OpenAI functionaliteiten (inclusief audio transcriptie)
OPENAI_API_KEY=your_openai_api_key_here
```

### Stap 6: 🎉 Start & Test
```bash
npm run dev
# Open http://localhost:3000
# Test alle features met de ingebouwde interface!
```

### Stap 7: 🚀 Deploy naar Netlify
1. **In Bolt.new**: "Deploy to Netlify"
2. **Environment Variables toevoegen** in Netlify dashboard:
   - `OPENAI_API_KEY` (vereist voor alle functionaliteiten)
3. **Deploy** en je app is live!

## 📋 Volledige Feature Demonstratie

### 🎯 **ChatGPT-4o Model**
ChatGPT-4o kiest automatisch de beste aanpak voor je vraag, of het nu gaat om tekst, afbeeldingen, audio of complexe analyses.

### 🔊 **Text-to-Speech Demo**
```
1. Schrijf een AI response
2. Klik op ⚙️ voor TTS instellingen
3. Kies tussen Microsoft TTS (standaard) of Gemini AI TTS
4. Microsoft: Pas snelheid aan (4 opties)
5. Gemini: Kies stem (30 opties) + emotie (7 opties)
6. Klik 🔊 om audio af te spelen
```

### 🎯 **Multi-Modal AI Conversaties**
```
✅ Upload 3 afbeeldingen + audio bestand + PDF document
✅ Selecteer welke bestanden je wilt analyseren  
✅ Vraag: "Vergelijk deze afbeeldingen met de audio transcriptie"
✅ ChatGPT analyseert alles tegelijk en geeft uitgebreid antwoord
✅ Luister naar response met TTS + download als Word
```

### 📸 **Camera & Vision**
- 📷 Direct foto's maken in de browser
- 🖼️ Afbeelding preview met bewerking opties
- 👁️ ChatGPT Vision voor object/tekst herkenning
- 🔄 Multi-image comparison en analyse

### 🎵 **Audio Processing Pipeline**
```
Audio Upload → Whisper Transcriptie → ChatGPT Analyse → Markdown Response → TTS Output
```
- Ondersteunt 6 audio formaten (MP3, WAV, AIFF, AAC, OGG, FLAC)
- Nederlandse prompt voor optimale transcriptie
- Tot 25MB bestanden (inline data limiet)
- Perfecte transcriptie kwaliteit met OpenAI Whisper

### 📁 **Smart File Management**
- **Visual File Manager**: Grid view met previews
- **Batch Selection**: Checkboxes voor multi-select
- **Type Icons**: 📸 🎵 📄 📊 voor duidelijke herkenning
- **Size & Date Info**: Complete metadata weergave
- **Drag & Drop Zones**: Visuele feedback bij slepen

## 🛠️ Technical Architecture

### 📂 **Project Structure**
```
├── 🔑 .env.local                 # API Keys (maak zelf aan)
├── 📦 package.json               # Dependencies & scripts
├── ⚙️ next.config.js             # Next.js configuration
├── 🌐 netlify.toml               # Netlify deployment config
├── 📋 README.md                  # Deze documentatie
└── src/
    ├── 🎨 app/
    │   ├── 🌍 globals.css         # Tailwind CSS styling
    │   ├── 📱 layout.tsx          # App layout & metadata
    │   ├── 🏠 page.tsx            # Main interface
    │   └── 🔌 api/
    │       ├── 💬 chat/route.ts            # Gemini AI endpoint
    │       ├── 🌊 chat-stream/route.ts     # Streaming responses
    │       ├── 🔊 generate-tts/route.ts    # Gemini TTS endpoint
    │       ├── 🎵 transcribe-audio/route.ts # Whisper transcription
    │       └── 📄 upload-docx/route.ts     # Document processing
    └── 🧩 components/
        ├── 🤖 TestChatBot.tsx     # Main AI interface
        ├── 🔊 GeminiTTS.tsx       # Gemini TTS component
        ├── ⚙️ ResponseActions.tsx # TTS, Copy, Word export
        ├── 📸 CameraCapture.tsx   # Camera functionality
        ├── 📝 MarkdownRenderer.tsx # Response formatting
        ├── 📁 FileUpload.tsx      # File handling
        ├── 🗣️ VoiceInput.tsx      # Speech recognition
        └── 📋 CopyButton.tsx      # Copy functionality
```

### 🔌 **API Endpoints**

| Endpoint | Functie | Input | Output |
|----------|---------|-------|--------|
| `/api/chat` | ChatGPT AI Conversatie | `message`, `images[]` | AI Response |
| `/api/chat-stream` | Streaming AI Response | `message`, `images[]` | Server-Sent Events |
| `/api/generate-tts` | OpenAI TTS Audio | `text`, `voiceName` | MP3 Audio |
| `/api/transcribe-audio` | Audio → Tekst | Audio File | Transcriptie |
| `/api/upload-docx` | Document Processing | PDF/DOCX/CSV | Extracted Text |

### 📊 **Supported File Formats**

| Category | Formats | Processing | Max Size |
|----------|---------|------------|----------|
| 📸 **Images** | JPG, PNG, GIF, WebP, BMP | ChatGPT Vision | 20MB |
| 🎵 **Audio** | MP3, WAV, AIFF, AAC, OGG, FLAC | OpenAI Whisper | 25MB |
| 📄 **Documents** | PDF, DOCX, TXT, MD | Text Extraction | 10MB |
| 📊 **Data** | CSV, JSON | Structure Parsing | 5MB |

## 🔧 Advanced Usage & Customization

### 🎨 **Styling Customization**
```css
/* globals.css - Pas het kleurenschema aan */
:root {
  --primary-color: #9333ea;     /* Paars accent */
  --secondary-color: #f3f4f6;   /* Light background */
  --text-color: #1f2937;        /* Dark text */
}
```

### 🤖 **ChatGPT Model Configuration**
```typescript
// src/app/api/chat/route.ts
const completion = await openai.chat.completions.create({
  model: 'gpt-4o', // Most capable model
  messages: messages,
  max_tokens: 4000,
  temperature: 0.7
})
```

### 🔊 **TTS Engine Customization**
```typescript
// src/components/ResponseActions.tsx
const [useGeminiTTS, setUseGeminiTTS] = useState(false) // Default to Microsoft TTS
const [selectedGeminiVoice, setSelectedGeminiVoice] = useState(GEMINI_VOICES[3]) // Kore
const [selectedGeminiEmotion, setSelectedGeminiEmotion] = useState(EMOTION_STYLES[0]) // Neutraal
```

### 🎵 **OpenAI Whisper Transcriptie Configuration**
```typescript
// src/app/api/transcribe-audio/route.ts
const transcription = await openai.audio.transcriptions.create({
  file: file,
  model: 'whisper-1',
  language: 'nl',
  response_format: 'text'
})
```

## 🌐 Production Deployment

### 🎯 **Netlify (Aanbevolen)**
**Via Bolt.new:**
1. ✅ "Deploy to Netlify" button
2. ✅ Build settings: `npm run build`
3. ✅ Environment variables toevoegen
4. ✅ Automatische HTTPS & CDN

**Handmatig:**
```bash
# Build voor productie
npm run build

# Deploy naar Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=.next
```

### ⚡ **Vercel Alternative**
```bash
# Vercel deployment
npm install -g vercel
vercel --prod
# Vergeet niet environment variables in te stellen!
```

### 🔧 **Environment Variables (Production)**
```
OPENAI_API_KEY=sk-proj-xxxxxxxxxx    # OpenAI Platform
NODE_ENV=production                   # Auto-set door Netlify
```

## 🚨 Troubleshooting & Common Issues

### ❌ **Build Failures**
| Error | Oorzaak | Oplossing |
|-------|---------|-----------|
| `OPENAI_API_KEY not found` | Missing env var | Check Netlify environment variables |
| `Module not found: openai` | Missing dependency | Run `npm install` |
| `Build command failed` | Wrong build settings | Set build command to `npm run build` |
| `Hydration mismatch` | SSR/Client mismatch | Clear `.next` cache, restart dev server |

### 🔧 **API Issues**
| Problem | Solution |
|---------|----------|
| OpenAI 429 Error | Check API quota/billing |
| Whisper fails | Verify audio format & size |
| Upload timeout | Reduce file size < 25MB |
| CORS errors | Check API route configuration |

### 📱 **Mobile Issues**
- **Camera niet beschikbaar**: Gebruik HTTPS (required voor camera API)
- **File upload fails**: Check mobile browser compatibility
- **Touch events**: Tested op iOS Safari & Android Chrome

## 🎓 Educational Use Cases

### 👨‍🏫 **Voor Docenten**
- 🎙️ **Lezingen transcriberen** en analyseren met AI
- 📸 **Werkstukken fotograferen** en automatisch feedback geven  
- 📄 **PDF's uploaden** voor snelle samenvatting
- 🗣️ **Spraaknotities** omzetten naar tekst en structureren

### 👩‍🎓 **Voor Studenten**
- 📝 **Aantekeningen verbeteren** met AI ondersteuning
- 🔍 **Complexe teksten analyseren** en uitleggen
- 🎨 **Creatieve projecten** met multi-modal input
- 💡 **Concepten begrijpen** door verschillende media te combineren

### 🏫 **Institutionele Deployment**
```bash
# Multi-tenant setup
OPENAI_API_KEY=shared_institutional_key
STUDENT_MODE=true                    # Simplified interface
ADMIN_DASHBOARD=true                # Usage analytics
```

## 🔒 Security & Privacy

### 🛡️ **Data Protection**
- ✅ **Server-side API keys**: Nooit client-side exposed
- ✅ **File validation**: Strict type & size checking  
- ✅ **Input sanitization**: XSS prevention
- ✅ **HTTPS only**: Secure transmission

### 📊 **Data Handling**
- 🔄 **Temporary processing**: Files niet permanent opgeslagen
- 🗑️ **Auto-cleanup**: Uploads automatisch verwijderd
- 🚫 **No tracking**: Geen user analytics by default
- 🔐 **Privacy first**: GDPR compliant design

## 🤝 Contributing & Development

### 🛠️ **Development Setup**
```bash
# Development mode
npm run dev

# Type checking  
npm run lint

# Production build test
npm run build && npm start
```

### 📈 **Feature Roadmap**
- [ ] **PDF OCR**: Scanned documents verwerken
- [ ] **Video Upload**: Frame extraction en analyse
- [ ] **Real-time Collaboration**: Multiple users
- [ ] **Template Library**: Pre-made educational prompts
- [ ] **Analytics Dashboard**: Usage insights
- [ ] **SSO Integration**: School account systems

### 🐛 **Bug Reports**
Found een issue? [Open een GitHub Issue](https://github.com/TomNaberink/templateAPIinclcamera/issues) met:
- 🖥️ Browser & OS version
- 📝 Steps to reproduce
- 📋 Error messages/screenshots
- 🎯 Expected vs actual behavior

## 📚 Resources & Links

### 🔗 **API Documentation**
- [OpenAI API Docs](https://platform.openai.com/docs) - OpenAI ontwikkelaar resources
- [OpenAI Whisper](https://platform.openai.com/docs/guides/speech-to-text) - Audio transcriptie
- [Next.js 15](https://nextjs.org/docs) - Framework documentatie

### 🎥 **Video Tutorials**
- [OpenAI API Setup](https://platform.openai.com/api-keys) - API key verkrijgen
- [Netlify Deployment](https://netlify.com) - Hosting platform
- [OpenAI Platform](https://platform.openai.com) - API setup

### 💡 **Community**
- [GitHub Repository](https://github.com/TomNaberink/templateAPIinclcamera)
- [Issues & Feature Requests](https://github.com/TomNaberink/templateAPIinclcamera/issues)
- [Tom Naberink LinkedIn](https://linkedin.com/in/tomnaberink) - Direct contact

---

## 🎉 **Ready to Transform Education?**

Deze template geeft je **alles** wat je nodig hebt om geavanceerde AI-applicaties te bouwen voor het onderwijs. Van simpele chatbots tot complexe multi-modal AI-assistenten - de mogelijkheden zijn eindeloos!

**💜 Gemaakt met passie door Tom Naberink**
**🚀 Deploy nu en start met bouwen aan de toekomst van onderwijs!**

---

*Versie 2.0 - Complete ChatGPT Education Template*
*Last updated: Juni 2025* 