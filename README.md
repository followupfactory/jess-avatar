# Jess Avatar - Deployment Guide

Real-time conversational AI sales funnel. Lead clicks button → talks to Jess → gets closed → signs up.

## What This Is

A React application that puts Jess (your AI sales agent) on a funnel page as a real-time avatar. 

- Lead lands on page
- Clicks "Start Conversation"
- Talks to Jess live (AI voice + avatar video)
- Jess qualifies them
- Shows signup link at the end
- Lead pays, books onboarding call

**Cost per interaction**: ~$2-2.50 (STT + Claude + TTS + HeyGen video)

---

## Quick Start (5 Minutes)

### 1. Create a New GitHub Repo

Go to **github.com** → **New Repository**

- Name: `jess-avatar` (or whatever)
- Make it **Private** (optional)
- Click **Create Repository**

### 2. Push This Code to GitHub

```bash
# In your terminal, in this folder:
git init
git add .
git commit -m "Initial commit: Jess Avatar funnel"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/jess-avatar.git
git push -u origin main
```

(Replace `YOUR-USERNAME` with your actual GitHub username)

### 3. Deploy to Vercel

Go to **vercel.com/followupfactory** → **Create** → **Import a Git Repository**

- Find `jess-avatar` repo in the list
- Click **Import**
- Leave settings as default
- Click **Deploy**

Vercel will build and deploy your site in ~2 minutes.

**You now have a live URL.**

---

## Customization

### Change Jess's Intro Text

Open `jess-avatar.jsx`, find:

```javascript
<p className="landing-subtitle">
  Let's talk about how to turn your cold leads into booked appointments.
</p>
```

Edit the text to match whatever you want.

### Change Colors

All colors are in the `<style>` section in `jess-avatar.jsx`. Look for:

```css
--primary: #00d4ff;  /* Cyan - change this */
--accent: #ff00ff;   /* Magenta - change this */
```

Or edit the individual CSS vars (background colors, text colors, button colors, etc.)

### Change the Button Text

Find `<button className="primary-btn" onClick={handleStartConversation}>` and change `Start Conversation` to whatever you want.

---

## API Integration (Next Steps)

Once deployed and tested, you'll add real API integrations:

### 1. Claude API (Jess's Brain)

- Get API key from **console.anthropic.com** → API Keys
- Add to `.env` as `REACT_APP_CLAUDE_API_KEY`
- In code, call Claude API when lead speaks to generate Jess's response

### 2. ElevenLabs (Voice)

- Get API key from **elevenlabs.io**
- Get a voice ID (use Jess's voice or create custom)
- Add to `.env` as `REACT_APP_ELEVENLABS_API_KEY` and `REACT_APP_ELEVENLABS_VOICE_ID`
- When Claude responds, stream to ElevenLabs to generate audio

### 3. HeyGen (Avatar Video)

- Get API key from **heygen.com**
- Create or select an avatar, get avatar ID
- Add to `.env` as `REACT_APP_HEYGEN_API_KEY` and `REACT_APP_HEYGEN_AVATAR_ID`
- Stream audio + text to HeyGen, it syncs avatar lips and plays video

### 4. GHL Webhook (Lead Capture)

- In GHL, create a webhook that accepts POST with `{ name, phone, email, objections }`
- Add webhook URL to `.env` as `REACT_APP_GHL_WEBHOOK_URL`
- After Jess qualifies lead, code sends data to GHL

---

## Environment Variables

Create a `.env` file in the root (copy from `.env.example`):

```
REACT_APP_CLAUDE_API_KEY=sk-...
REACT_APP_ELEVENLABS_API_KEY=...
REACT_APP_ELEVENLABS_VOICE_ID=...
REACT_APP_HEYGEN_API_KEY=...
REACT_APP_HEYGEN_AVATAR_ID=...
REACT_APP_GHL_WEBHOOK_URL=https://...
REACT_APP_GHL_SIGNUP_LINK=https://your-booking-link
```

In Vercel:
- Go to project settings → **Environment Variables**
- Add each key/value pair
- Redeploy

---

## Testing

### Local Testing

```bash
npm install
npm start
```

Opens on `localhost:3000`. You can test the UI flow without APIs.

### Live Testing

Once deployed to Vercel, share the URL and click through:

1. Click "Start Conversation" button
2. See loading states (microphone, speaking, etc.)
3. Form auto-fills (or manually fill name/phone/email)
4. See thank you screen
5. Check that signup link works

---

## Selling This to Clients

This is white-label ready. For each client:

1. **Duplicate** this repo on GitHub
2. Change the text/colors to match **their brand**
3. Deploy to **their own Vercel account** (or yours under a subdomain)
4. Update `.env` with **their GHL webhook URL** and booking link
5. Charge them:
   - Setup fee: $500-1000 (one-time)
   - Monthly fee: $197-497 (covers API costs + maintenance)

---

## Troubleshooting

**Page won't load?**
- Check Vercel logs: **vercel.com/followupfactory** → project → **Deployments** → click latest → **View Logs**
- Look for errors in the "Build" and "Runtime" sections

**API keys not working?**
- Make sure keys are in `.env` file (locally) or Environment Variables (in Vercel)
- After adding to Vercel, click **Redeploy** to apply changes

**Button doesn't work?**
- Check browser console: **F12** → **Console** → look for errors
- Make sure `REACT_APP_GHL_SIGNUP_LINK` is set

---

## Architecture

```
jess-avatar.jsx
├── Landing Stage (shows avatar + button)
├── Listening Stage (user speaks, Jess listens)
├── Speaking Stage (Jess responds)
├── Capture Stage (collect name/phone/email)
└── Thank You Stage (show signup link)

API Flow (when fully integrated):
User speaks → Web Speech API → Claude (generate response) → ElevenLabs (voice) → HeyGen (avatar) → GHL webhook (capture lead)
```

---

## Next: Full API Integration

Once you confirm deployment works, I'll build:

1. **Backend server** (Node.js) to orchestrate Claude → ElevenLabs → HeyGen calls
2. **Web Speech API** integration (browser captures voice)
3. **Conversation memory** (keep context between messages)
4. **Intent detection** (Jess knows when to close, when to book, when to handle objections)
5. **GHL webhook** integration (automatic lead creation)

That's the production version. This is the launchpad.

---

## Questions?

Everything in this repo is yours to customize. Need help?

- Check `.env.example` for all available config
- Edit `jess-avatar.jsx` for UI/text changes
- Ask for specific API integration help when ready

**Deploy it first, then iterate.**
