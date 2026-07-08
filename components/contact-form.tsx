"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/context/language-context"
import emailjs from "@emailjs/browser"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { useRef, useState } from "react"

export default function ContactForm() {
  const { t } = useLanguage()
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const EMAIL_RECIPIENT = "lakshaytrehan44@gmail.com"

  const createMailtoLink = () => {
    const subject = encodeURIComponent(`Website message from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)
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
        message: "",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-gray-900/50 p-6 rounded-lg border border-green-500/30 text-center">
        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-green-400">{t("contact.form.success.title")}</h3>
        <p className="text-gray-300 mb-4">{t("contact.form.success.description")}</p>
        <Button
          className="mt-2 bg-green-600 hover:bg-green-700 text-white"
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
      <div className="bg-gray-900/50 p-6 rounded-lg border border-red-500/30 text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-red-400">{t("contact.form.error.title")}</h3>
        <p className="text-gray-300 mb-4">{formError}</p>
        <Button
          className="mt-2 bg-red-600 hover:bg-red-700 text-white"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            {t("contact.form.name")}
          </label>
          <Input
            id="name"
            name="name"
            placeholder={t("contact.form.name")}
            required
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 text-white"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
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
            className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 text-white"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
          {t("contact.form.message")}
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder={`${t("contact.form.message")}...`}
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 text-white resize-none"
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-6"
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
