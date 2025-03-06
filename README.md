# PaisaBank

[PaisaBank](https://paisa-bank.vercel.app)

<img width="1710" alt="Screenshot 2025-03-05 at 10 20 35 PM" src="https://github.com/user-attachments/assets/32ba37cf-cfc3-49d8-94ce-8a198a18c920" />

## 📁 Estructura
```
PaisaBank/
├── src/
│   ├── app/           # Rutas
│   ├── components/    # Componentes de pág + ui
│   ├── db/           # Configuración y modelos de la db
│   ├── lib/          # Utilidades
│   ├── services/     # Servicios
│   └── middleware.ts # Middleware (auth)
```

## 🛠️ Tecnologías

### Core
- **Next.js 15** - Framework
- **TypeScript** - Lenguaje

### UI
- **Tailwind CSS 4** - CSS
- **Shadcn** - Componentes
- **Framer Motion** - Anim.

### DB y Back
- **Supabase + api routes** - Backend

### Forms
- **React Hook Form** - Form
- **Zod** - Validación

### Dev
- **ESLint** - Linting

### Factibilidad
Problema: Argentina !== open-banking.
Solución: alguna maniobra con Web Scraping o integración parcial con los bancos más utilizados.

Riesgo: Manejar información financiera === ataques y fraude. 
Solución: MFA


