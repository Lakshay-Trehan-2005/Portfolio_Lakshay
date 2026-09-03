"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/context/language-context"
import emailjs from "@emailjs/browser"
import { AlertCircle, CheckCircle, Loader2, Shield } from "lucide-react"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

export default function ContactForm() {
  const { t } = useLanguage()
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    inquiryType: "Security Consultation",
    message: "",
  })

  const inquiryTypes = [
    "Security Consultation",
    "Vulnerability Assessment",
    "Automation & DevSecOps",
    "General Inquiry",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTypeSelect = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      inquiryType: type,
    }))
  }

  const EMAIL_RECIPIENT = "lakshaytrehan44@gmail.com"

  const createMailtoLink = () => {
    const subject = encodeURIComponent(`[${formData.inquiryType}] ${formData.subject || "Website Message"} - from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nInquiry Type: ${formData.inquiryType}\nSubject: ${formData.subject || "N/A"}\n\nMessage:\n${formData.message}`
    )
    return `mailto:${EMAIL_RECIPIENT}?subject=${subject}&body=${body}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formRef.current) return

    setIsSubmitting(true)
    setFormError(null)

    try {
      console.log("Sending email with data:", formData)
      console.log("Using service ID:", "service_ovykqc4")
      console.log("Using template ID:", "template_gmf406c")
      console.log("Using public key:", "xfL7pq5B0MfME5tu4")

      // Attempt to send email using EmailJS first
      const result = await emailjs.sendForm("service_ovykqc4", "template_gmf406c", formRef.current, "xfL7pq5B0MfME5tu4")

      console.log("EmailJS response:", result)

      if (result.status === 200) {
        setIsSubmitted(true)
        setFormData({
          name: "",
          email: "",
          subject: "",
          inquiryType: "Security Consultation",
          message: "",
        })
      } else {
        throw new Error(`EmailJS send failed. Status: ${result.status}`)
      }
    } catch (error) {
      console.error("EmailJS failed, falling back to mailto:", error)
      const mailtoLink = createMailtoLink()
      window.location.href = mailtoLink
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        inquiryType: "Security Consultation",
        message: "",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-slate-900/60 p-8 rounded-2xl border border-green-500/30 text-center my-auto">
        <CheckCircle className="w-14 h-14 text-green-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-green-400">{t("contact.form.success.title")}</h3>
        <p className="text-gray-300 mb-6 max-w-md mx-auto">{t("contact.form.success.description")}</p>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-2.5"
          onClick={() => {
            setIsSubmitted(false)
          }}
        >
          {t("contact.form.success.button")}
        </Button>
      </div>
    )
  }

  if (formError) {
    return (
      <div className="bg-slate-900/60 p-8 rounded-2xl border border-red-500/30 text-center my-auto">
        <AlertCircle className="w-14 h-14 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-red-400">{t("contact.form.error.title")}</h3>
        <p className="text-gray-300 mb-6">{formError}</p>
        <Button
          className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-6 py-2.5"
          onClick={() => {
            setFormError(null)
          }}
        >
          {t("contact.form.error.button")}
        </Button>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {/* Hidden input for inquiry type for emailjs serialization */}
      <input type="hidden" name="inquiryType" value={formData.inquiryType} />

      {/* Inquiry Type Pills */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
          Inquiry Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {inquiryTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleTypeSelect(type)}
              className={cn(
                "px-2.5 py-2 text-[11px] font-medium rounded-xl border transition-all text-center",
                formData.inquiryType === type
                  ? "bg-cyan-500/20 border-cyan-400/80 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                  : "bg-slate-900/70 border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Name and Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
            {t("contact.form.name")}
          </label>
          <Input
            id="name"
            name="name"
            placeholder={t("contact.form.name")}
            required
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 text-white rounded-xl"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
            {t("contact.form.email")}
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            required
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 text-white rounded-xl"
          />
        </div>
      </div>

      {/* Subject / Scope */}
      <div>
        <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
          Subject / Scope
        </label>
        <Input
          id="subject"
          name="subject"
          placeholder="e.g. ISO 27001 Consultation / Threat Assessment / DevSecOps"
          value={formData.subject}
          onChange={handleChange}
          className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 text-white rounded-xl"
        />
      </div>

      {/* Message Textarea */}
      <div>
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
          {t("contact.form.message")}
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder={`${t("contact.form.message")}... Share details regarding your project scope, security challenges, or requirements.`}
          rows={7}
          required
          value={formData.message}
          onChange={handleChange}
          className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 text-white resize-none rounded-xl min-h-[160px]"
        />
      </div>

      {/* Reassurance Indicators */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-gray-400 py-1">
        <span className="flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          Direct response within 24-48 hours
        </span>
        <span className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          Confidential advisory & NDA-ready
        </span>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-purple-600 via-cyan-600 to-blue-600 hover:from-purple-700 hover:via-cyan-700 hover:to-blue-700 text-white font-medium py-6 rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-300"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("contact.form.sending")}
          </>
        ) : (
          t("contact.form.submit")
        )}
      </Button>
    </form>
  )
}
