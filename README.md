# FitFlow

**FitFlow** is a fitness SaaS application that allows paid members to book classes, view upcoming sessions, and manage their schedules. It showcases end-to-end SaaS development, including authentication, Stripe integration, and clean UI — all built using modern full-stack technologies.

---

### Technical Blog  
https://shorturl.at/T6h8Y


### Live Demo  
https://fitflow-omega.vercel.app/

---

## Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
- **UI Components:** shadcn/ui
- **Backend & Auth:** Supabase (PostgreSQL, RLS, Auth)
- **Payments:** Stripe Checkout & Subscription Flow

---

##  Features

- Auth with Supabase (Signup/Login)
- Role-based access (Free vs Paid users)
- Weekly class booking interface
- Stripe subscription checkout & success flow
- Mobile-friendly responsive design

## 🛠️ Setup / Installation

1. **Clone the repository**

   git clone https://github.com/krupasawant/fitflow.git

   cd fitflow

3. **Install dependencies**
    npm install

4. **Create .env.local and add your environment variables**


    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url

    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

    STRIPE_SECRET_KEY=your-stripe-secret-key

    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

    NEXT_PUBLIC_SITE_URL=http://localhost:3000


5. **Run the development server**

    npm run dev
    Visit http://localhost:3000

## Future Improvements
- Webhooks for Stripe to auto-upgrade plans
- Admin dashboard to create/edit class types
- Limit capacity per session
- Past booking history
- Email confirmations & reminders
