# D'Lish Website

A modern, fast, and highly customizable Next.js application for **D'Lish Northampton**, a premium food, drinks, and dessert brand. 

Customer journey mapped: **DISCOVER → CRAVE → CUSTOMISE → ORDER → RETURN**.

## Tech Stack
- **Framework:** Next.js 15 (App Router, Server Components)
- **Styling:** Tailwind CSS v4, Framer Motion
- **CMS:** Sanity Studio (Embedded at `/studio`)
- **Forms:** React Server Actions with Zod Validation
- **Email:** Resend
- **Language:** TypeScript

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Environment Variables:**
   Copy `.env.example` to `.env.local` and fill in the missing values.
   ```bash
   cp .env.example .env.local
   ```
3. **Run Locally:**
   ```bash
   npm run dev
   ```

## Missing Content & Credentials required before launch:

1. **Sanity CMS Setup:** 
   - You need to create a Sanity project by running `npx sanity init`.
   - Update `NEXT_PUBLIC_SANITY_PROJECT_ID` in your `.env.local` with the real ID.
   - Once connected, go to `/studio`, log in, and populate the real menu items, prices, and site settings.
2. **Sanity Webhook:** 
   - Set up a webhook in your Sanity dashboard pointing to `your-domain.com/api/revalidate`.
   - Add the webhook secret to your `.env.local` as `SANITY_REVALIDATE_SECRET`.
3. **Email (Resend):** 
   - Get an API key from Resend.com.
   - Add it to `.env.local` as `RESEND_API_KEY`.
   - Update the "from" and "to" email addresses in `src/app/actions/catering.ts` to your verified domain.
4. **Brand Assets:** 
   - Replace the `D'LISH` text placeholders with the real logo if provided later.
   - Upload real food photography into the Sanity CMS.

## Architecture Notes
- **Pricing:** The `calculateBubbleTeaPrice` engine processes all money in **pence (integers)**. It only formats to pounds at the very end in the UI layer. Do not change this logic to use floats, or you risk rounding errors.
- **Order Handoff:** The site does not handle payments directly in v1. The Order Now button acts as a dynamic handoff to WhatsApp, Phone, or a generic URL based on `siteSettings`.
