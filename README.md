# SkillMatch – Frontend (React)

## Installazione

### 1. Install dependencies
npm install

### 2. Development mode
npm run dev

### 3. Production build
npm run build

## Stack Tecnologico
- React
- Vite
- TailwindCSS
- React Router
- JWT Auth
- Axios + custom hook useApi()

## Struttura cartelle
src/
  ├── api/             → gateway paths
  ├── components/      → componenti riutilizzabili
  ├── hooks/           → useAuth, useApi
  ├── layouts/         → CompanyLayout, AdminLayout...
  ├── pages/           → tutte le pagine
  ├── router/          → AppRouter + RoleGuard
  ├── services/        → chiamate API
  └── utils/           → helper vari

## Funzionalità implementate
✓ Registrazione/Login  
✓ Dashboard (company, professional, admin)  
✓ Gestione profilo (professional & company)  
✓ Gestione skill con split automatico  
✓ Matching intelligente  
✓ Contratti  
✓ Pagamenti con fattura PDF  
✓ Segnalazioni  
✓ Pannello Admin completo