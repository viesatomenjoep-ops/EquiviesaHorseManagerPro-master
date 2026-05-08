# 🚀 Deployment Guide - Equiviesa

Complete deployment instructies voor GitHub, Vercel, Supabase en Docker.

## 📦 1. GitHub Setup

De git repository is lokaal al geïnitialiseerd. Volg deze stappen om naar GitHub te pushen:

### Stap 1: Maak een nieuwe GitHub repository

1. Ga naar [github.com/new](https://github.com/new)
2. Repository naam: `equiviesa-landing`
3. Visibility: Private of Public (jouw keuze)
4. **NIET** initialiseren met README, .gitignore of license (deze hebben we al)
5. Klik "Create repository"

### Stap 2: Verbind lokale repository met GitHub

```bash
cd /workspaces/default/code

# Vervang USERNAME met jouw GitHub username
git remote add origin https://github.com/USERNAME/equiviesa-landing.git

# Push naar GitHub
git push -u origin main
```

Of met SSH:
```bash
git remote add origin git@github.com:USERNAME/equiviesa-landing.git
git push -u origin main
```

## ☁️ 2. Vercel Deployment

### Optie A: Via Vercel Dashboard (Makkelijkst)

1. Ga naar [vercel.com](https://vercel.com)
2. Log in met je GitHub account
3. Klik "Add New" → "Project"
4. Importeer de `equiviesa-landing` repository
5. Configuratie wordt automatisch gedetecteerd via `vercel.json`
6. Klik "Deploy"

### Optie B: Via Vercel CLI

```bash
# Installeer Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd /workspaces/default/code
vercel

# Voor productie
vercel --prod
```

### Environment Variables op Vercel

Als je Supabase gebruikt, voeg deze toe in Vercel Dashboard → Settings → Environment Variables:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Custom Domain (Optioneel)

1. Ga naar Vercel project → Settings → Domains
2. Voeg `equiviesa.com` toe
3. Update DNS records zoals aangegeven

## 🗄️ 3. Supabase Setup

### Stap 1: Maak Supabase Project

1. Ga naar [supabase.com](https://supabase.com)
2. Klik "New Project"
3. Project naam: `equiviesa`
4. Database password: Kies een sterk wachtwoord (bewaar deze!)
5. Region: Kies closest bij je gebruikers (EU voor Europa)
6. Klik "Create new project"

### Stap 2: Haal API Keys op

1. Ga naar Project Settings → API
2. Kopieer:
   - Project URL (onder "Configuration")
   - `anon` `public` key (onder "Project API keys")

### Stap 3: Configureer Environment Variables

Maak lokaal een `.env` bestand:
```bash
cd /workspaces/default/code
cp .env.example .env
```

Vul in met je Supabase credentials:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Stap 4: Database Schema (Optioneel)

Als je lead forms wilt opslaan:

```sql
-- In Supabase SQL Editor
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  stable_name TEXT,
  plan_interest TEXT,
  language TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone
CREATE POLICY "Allow public inserts"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

## 🐳 4. Docker Deployment

### Lokaal testen

```bash
cd /workspaces/default/code

# Build image
docker build -t equiviesa:latest .

# Run container
docker run -p 3000:80 equiviesa:latest

# Of met docker-compose
docker-compose up
```

Open browser: `http://localhost:3000`

### Production Docker Deployment

#### Option A: Docker Hub

```bash
# Login to Docker Hub
docker login

# Tag image
docker tag equiviesa:latest USERNAME/equiviesa:latest

# Push to Docker Hub
docker push USERNAME/equiviesa:latest

# Deploy on server
docker pull USERNAME/equiviesa:latest
docker run -d -p 80:80 --name equiviesa USERNAME/equiviesa:latest
```

#### Option B: DigitalOcean App Platform

1. Upload je code naar GitHub
2. Ga naar DigitalOcean → Apps → Create App
3. Kies je GitHub repository
4. Select "Dockerfile" as build method
5. Deploy!

#### Option C: AWS ECS / Google Cloud Run

Beide platforms ondersteunen Docker containers. Volg hun documentatie voor deployment.

## 🔄 5. CI/CD Pipeline (GitHub Actions)

De repository bevat al een GitHub Actions workflow die automatisch:
- Build de applicatie
- Run tests
- Deploy naar Vercel (bij push naar main)
- Build Docker image

Pas `.github/workflows/deploy.yml` aan met je credentials.

## 📊 6. Monitoring & Analytics (Optioneel)

### Google Analytics

1. Maak GA4 property aan
2. Voeg toe aan `.env`:
```env
VITE_GA_ID=G-XXXXXXXXXX
```

### Vercel Analytics

Automatisch beschikbaar in Vercel dashboard na deployment.

## 🎯 Quick Start Checklist

- [ ] GitHub repository aangemaakt en code gepushed
- [ ] Vercel project gedeployed
- [ ] Custom domain toegevoegd (optioneel)
- [ ] Supabase project aangemaakt
- [ ] Environment variables geconfigureerd
- [ ] Database schema aangemaakt (indien nodig)
- [ ] Docker image gebuild en getest
- [ ] Production deployment gedaan
- [ ] SSL certificaat actief
- [ ] Analytics geïnstalleerd (optioneel)

## 🆘 Troubleshooting

### Build fails op Vercel
- Check of alle dependencies in `package.json` staan
- Verify Node version compatibility

### Docker container start niet
- Check logs: `docker logs <container-id>`
- Verify nginx configuration

### Supabase connection errors
- Verify API keys zijn correct
- Check RLS policies

## 📞 Support

Voor vragen: info@equiviesa.com

---

**Pro Tip:** Start met Vercel deployment voor snelste resultaten. Docker kan later toegevoegd worden voor meer controle.
