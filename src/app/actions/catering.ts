"use server"

import { z } from "zod"
import { Resend } from "resend"
import { headers } from "next/headers"

const resend = new Resend(process.env.RESEND_API_KEY)

const cateringSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  eventDate: z.string().min(1, "Event date is required"),
  guestCount: z.string().min(1, "Guest count is required"),
  eventLocation: z.string().min(1, "Event location is required"),
  eventType: z.string().min(1, "Event type is required"),
  message: z.string().optional(),
  honeypot: z.string().max(0, "Invalid submission"),
})

const ipRequests = new Map<string, { count: number, resetTime: number }>()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS = 3 // 3 requests per 15 mins

export async function submitCateringEnquiry(prevState: any, formData: FormData) {
  try {
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || "unknown-ip"
    const now = Date.now()
    const record = ipRequests.get(ip)

    if (record && now < record.resetTime) {
      if (record.count >= MAX_REQUESTS) {
        return { success: false, error: "Too many requests. Please try again later." }
      }
      record.count += 1
    } else {
      ipRequests.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    }

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

    // Silently reject if honeypot is filled
    if (rawData.honeypot && typeof rawData.honeypot === 'string' && rawData.honeypot.length > 0) {
      return { success: true, message: "Thanks, we'll get back to you soon" }
    }

    const validatedData = cateringSchema.safeParse(rawData)

    if (!validatedData.success) {
      return { 
        success: false, 
        error: "Validation failed. Please check your inputs.",
        fieldErrors: validatedData.error.flatten().fieldErrors 
      }
    }

    const d = validatedData.data

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is missing. Pretending success.")
      return { success: true, message: "Thanks, we'll get back to you soon" }
    }

    const toEmail = process.env.CATERING_TO_EMAIL || "uk.dlish@gmail.com"
    const submittedAt = new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })

    const { error } = await resend.emails.send({
      from: 'Catering Enquiries <onboarding@resend.dev>', // Resend's free tier only allows onboarding@resend.dev unless verified
      to: [toEmail],
      replyTo: d.email,
      subject: `New Catering Enquiry - ${d.eventType} - ${d.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2>New Catering Enquiry</h2>
          <p><strong>Submitted At:</strong> ${submittedAt}</p>
          <hr/>
          <p><strong>Full Name:</strong> ${d.name}</p>
          <p><strong>Email Address:</strong> ${d.email}</p>
          <p><strong>Phone Number:</strong> ${d.phone}</p>
          <p><strong>Event Date:</strong> ${d.eventDate}</p>
          <p><strong>Guest Count:</strong> ${d.guestCount}</p>
          <p><strong>Event Location / Postcode:</strong> ${d.eventLocation}</p>
          <p><strong>Event Type:</strong> ${d.eventType}</p>
          <p><strong>Additional Details:</strong><br/> ${d.message || 'None'}</p>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, error: "Something went wrong. Please call us at 07850 536587." }
    }

    return { success: true, message: "Thanks, we'll get back to you soon" }

  } catch (error) {
    console.error("Catering submission error:", error)
    return { success: false, error: "Something went wrong. Please call us at 07850 536587." }
  }
}
