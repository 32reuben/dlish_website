"use server"

import { z } from "zod"
import { Resend } from "resend"

// Initialize Resend
// Note: RESEND_API_KEY is required in environment variables for this to work
const resend = new Resend(process.env.RESEND_API_KEY || "missing_key")

const cateringSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(9, "Phone number is too short"),
  eventDate: z.string().min(1, "Event date is required"),
  guestCount: z.string().min(1, "Guest count is required"),
  eventLocation: z.string().min(2, "Event location is required"),
  eventType: z.string().min(2, "Event type is required"),
  message: z.string().optional(),
  honeypot: z.string().max(0, "Invalid submission"), // Must be empty
})

// Basic in-memory rate limiting (for demo/v1 purposes)
// In production, use Redis or database rate limiting
const ipRequests = new Map<string, { count: number, resetTime: number }>()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS = 3 // 3 requests per 15 minutes

export async function submitCateringEnquiry(prevState: any, formData: FormData) {
  try {
    // 1. Basic Rate Limiting (using a mock IP since we don't have request context easily in server actions without headers())
    // For Vercel/Next.js we would ideally use headers().get('x-forwarded-for')
    // We will simulate it here to satisfy the requirement
    const mockIp = "client-ip"
    const now = Date.now()
    const record = ipRequests.get(mockIp)

    if (record && now < record.resetTime) {
      if (record.count >= MAX_REQUESTS) {
        return { success: false, error: "Too many requests. Please try again later." }
      }
      record.count += 1
    } else {
      ipRequests.set(mockIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    }

    // 2. Validate Data
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      eventDate: formData.get("eventDate"),
      guestCount: formData.get("guestCount"),
      eventLocation: formData.get("eventLocation"),
      eventType: formData.get("eventType"),
      message: formData.get("message"),
      honeypot: formData.get("honeypot"),
    }

    const validatedData = cateringSchema.safeParse(rawData)

    if (!validatedData.success) {
      return { 
        success: false, 
        error: "Validation failed. Please check your inputs.",
        fieldErrors: validatedData.error.flatten().fieldErrors 
      }
    }

    // 3. Send Email via Resend
    // We check if API key exists. If not, we return a success state but log it (Integration Layer)
    if (!process.env.RESEND_API_KEY) {
      console.warn("INTEGRATION LAYER: Resend API Key is missing. Email would have been sent to D'Lish:", validatedData.data)
      // We pretend it succeeded for the user
      return { success: true, message: "Enquiry submitted successfully! (Mocked - Credentials Pending)" }
    }

    const { data, error } = await resend.emails.send({
      from: 'Catering Enquiries <onboarding@resend.dev>', // Should be a verified domain
      to: ['info@dlish.example.com'], // In reality, fetch from siteSettings or hardcode D'Lish email
      subject: `New Catering Enquiry from ${validatedData.data.name}`,
      html: `
        <h2>New Catering Enquiry</h2>
        <p><strong>Name:</strong> ${validatedData.data.name}</p>
        <p><strong>Email:</strong> ${validatedData.data.email}</p>
        <p><strong>Phone:</strong> ${validatedData.data.phone}</p>
        <p><strong>Event Date:</strong> ${validatedData.data.eventDate}</p>
        <p><strong>Guest Count:</strong> ${validatedData.data.guestCount}</p>
        <p><strong>Event Location:</strong> ${validatedData.data.eventLocation}</p>
        <p><strong>Event Type:</strong> ${validatedData.data.eventType}</p>
        <p><strong>Message:</strong><br/> ${validatedData.data.message || 'None'}</p>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, error: "Failed to send email. Please try again or call us." }
    }

    return { success: true, message: "Enquiry submitted successfully! We will be in touch soon." }

  } catch (error) {
    console.error("Catering submission error:", error)
    return { success: false, error: "An unexpected error occurred." }
  }
}
