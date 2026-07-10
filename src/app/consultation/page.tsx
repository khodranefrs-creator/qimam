'use client'

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronRight, ChevronLeft, Calendar, Clock, User, FileText, Phone, Mail, MessageSquare, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00",
]

type FormData = {
  practiceAreaId: string
  details: string
  preferredDate: string
  preferredTime: string
  name: string
  phone: string
  email: string
  contactMethod: string
  consent: boolean
}

type FormErrors = Partial<Record<keyof FormData | "step1" | "step2" | "step3", string>>

type PracticeArea = { id: string; title: string; slug: string }

const inputClass = "w-full rounded-[10px] border border-border/60 bg-white px-4 py-3 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all duration-200"
const labelClass = "block text-sm font-medium text-text-dark mb-1.5"
const errorClass = "text-xs text-error mt-1"

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } },
}

function getTodayString(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
}

function isFriday(dateStr: string): boolean {
  const d = new Date(dateStr + "T12:00:00")
  return d.getDay() === 5
}

function getSteps(t: ReturnType<typeof getTranslations>) {
  return [
    { id: 1, title: t.consultation.practiceArea },
    { id: 2, title: t.consultation.preferredTime },
    { id: 3, title: t.contact.formTitle },
    { id: 4, title: t.consultation.title },
  ]
}

function getContactMethods(t: ReturnType<typeof getTranslations>) {
  return [
    { value: "phone", label: t.nav.contactUs },
    { value: "whatsapp", label: t.footer.whatsapp },
    { value: "email", label: t.contact.emailLabel },
  ]
}

export default function ConsultationPage() {
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)
  const [currentStep, setCurrentStep] = useState(1)
  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>([])
  const [formData, setFormData] = useState<FormData>({
    practiceAreaId: "",
    details: "",
    preferredDate: "",
    preferredTime: "",
    name: "",
    phone: "+966",
    email: "",
    contactMethod: "phone",
    consent: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loadingAreas, setLoadingAreas] = useState(true)
  const [areasError, setAreasError] = useState(false)

  useEffect(() => {
    fetch("/api/practice-areas")
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data) => {
        if (Array.isArray(data)) setPracticeAreas(data)
        else throw new Error()
      })
      .catch(() => setAreasError(true))
      .finally(() => setLoadingAreas(false))
  }, [])

  const updateField = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }, [])

  function validateStep1(): boolean {
    const errs: FormErrors = {}
    const areaErr = getFieldError("practiceAreaId")
    if (areaErr) errs.practiceAreaId = areaErr
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function validateStep2(): boolean {
    const errs: FormErrors = {}
    const dateErr = getFieldError("preferredDate")
    if (dateErr) errs.preferredDate = dateErr
    const timeErr = getFieldError("preferredTime")
    if (timeErr) errs.preferredTime = timeErr
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function validateStep3(): boolean {
    const errs: FormErrors = {}
    const nameErr = getFieldError("name")
    if (nameErr) errs.name = nameErr
    const phoneErr = getFieldError("phone")
    if (phoneErr) errs.phone = phoneErr
    const emailErr = getFieldError("email")
    if (emailErr) errs.email = emailErr
    const cmErr = getFieldError("contactMethod")
    if (cmErr) errs.contactMethod = cmErr
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleNext() {
    if (currentStep === 1 && validateStep1()) setCurrentStep(2)
    else if (currentStep === 2 && validateStep2()) setCurrentStep(3)
    else if (currentStep === 3 && validateStep3()) setCurrentStep(4)
  }

  function handlePrev() {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1)
  }

  const todayStr = getTodayString()

  function getFieldError(field: keyof FormData): string | undefined {
    switch (field) {
      case "practiceAreaId":
        return formData.practiceAreaId ? undefined : t.consultation.errArea
      case "preferredDate":
        if (!formData.preferredDate) return t.consultation.errDate
        if (formData.preferredDate < todayStr) return t.consultation.errDate
        if (isFriday(formData.preferredDate)) return t.consultation.errDate
        return undefined
      case "preferredTime":
        return formData.preferredTime ? undefined : t.consultation.errTime
      case "name":
        return formData.name.trim() ? undefined : t.consultation.errName
      case "phone":
        if (!formData.phone.trim()) return t.consultation.errPhone
        if (!/^\+966\d{9}$/.test(formData.phone.trim())) return t.consultation.errPhone
        return undefined
      case "email":
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) return t.consultation.errEmail
        return undefined
      case "contactMethod":
        return formData.contactMethod ? undefined : t.consultation.errContactMethod
      case "consent":
        return formData.consent ? undefined : t.consultation.errConsent
      default:
        return undefined
    }
  }

  function handleBlur(field: keyof FormData) {
    const err = getFieldError(field)
    setErrors((prev) => ({ ...prev, [field]: err }))
  }

  function getSelectedAreaTitle(): string {
    const area = practiceAreas.find((a) => a.id === formData.practiceAreaId)
    return area ? area.title : t.common.noData
  }

  function formatDate(dateStr: string): string {
    if (!dateStr) return t.common.noData
    const d = new Date(dateStr + "T12:00:00")
    return d.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
  }

  async function handleSubmit() {
    if (!formData.consent) {
      setErrors({ consent: t.consultation.errConsent })
      return
    }
    setSubmitting(true)
    setErrors({})

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrors({ step1: data.error || t.common.error })
        setSubmitting(false)
        return
      }
      setSubmitted(true)
    } catch {
      setErrors({ step1: t.common.error })
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-surface border border-border/60 shadow-subtle p-8 md:p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-success" />
              </div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-4">{t.consultation.success}</h1>
              <p className="text-text-muted mb-8 leading-relaxed">
                {t.consultation.successDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/">
                  <Button variant="primary" size="lg">{t.nav.home}</Button>
                </Link>
                <Link href="/practice-areas">
                  <Button variant="secondary" size="lg">{t.practiceAreas.title}</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  function renderStepIndicator() {
    return (
      <div className="flex items-center justify-center gap-0 mb-8 md:mb-10 -mx-2 md:mx-0">
        {getSteps(t).map((step, idx) => (
          <div key={step.id} className="flex items-center min-w-0 flex-1">
            <div
              onClick={step.id < currentStep ? () => setCurrentStep(step.id) : undefined}
              className={`flex flex-col items-center gap-1.5 md:gap-2 w-full px-1 ${step.id < currentStep ? "cursor-pointer" : ""}`}
            >
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[11px] md:text-sm font-bold transition-all duration-300 shrink-0 ${
                  step.id === currentStep
                    ? "bg-accent-gold text-primary shadow-gold"
                    : step.id < currentStep
                    ? "bg-success text-white"
                    : "bg-gray-100 text-text-muted"
                }`}
              >
                {step.id < currentStep ? <Check size={14} className="md:w-4 md:h-4" /> : step.id}
              </div>
              <span
                className={`text-[10px] md:text-xs font-medium text-center leading-tight transition-colors duration-300 ${
                  step.id <= currentStep ? "text-accent-gold" : "text-text-muted"
                }`}
              >
                {step.title}
              </span>
            </div>
            {idx < getSteps(t).length - 1 && (
              <div
                className={`h-0.5 self-start mt-[14px] md:mt-[18px] transition-colors duration-300 flex-1 mx-1 md:mx-2 ${
                  step.id < currentStep ? "bg-success" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    )
  }

  function renderBreadcrumb() {
    return (
      <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
        <Link href="/" className="hover:text-accent-gold transition">{t.nav.home}</Link>
        {isRtl ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        <span className="text-text-dark font-medium">{t.consultation.title}</span>
      </nav>
    )
  }

  function renderStep1() {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-3">
            <FileText size={24} className="text-accent-gold" />
          </div>
          <h2 className="text-xl font-heading font-bold text-primary">{t.consultation.practiceArea}</h2>
          <p className="text-text-muted text-sm mt-1">{t.consultation.description}</p>
        </div>

        <div>
          <label className={labelClass}>{t.consultation.practiceArea} <span className="text-error">*</span></label>
          {loadingAreas ? (
            <div className="flex items-center gap-2 text-text-muted text-sm py-2">
              <Loader2 size={16} className="animate-spin" />
              {t.common.loading}
            </div>
          ) : areasError ? (
            <div className="flex items-center gap-2 text-error text-sm py-2">
              <span>{t.common.error}</span>
            </div>
          ) : (
            <select
              value={formData.practiceAreaId}
              onChange={(e) => updateField("practiceAreaId", e.target.value)}
              onBlur={() => handleBlur("practiceAreaId")}
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              <option value="">-- {t.consultation.selectArea} --</option>
              {practiceAreas.map((area) => (
                <option key={area.id} value={area.id}>{area.title}</option>
              ))}
            </select>
          )}
          {errors.practiceAreaId && <p className={errorClass}>{errors.practiceAreaId}</p>}
        </div>

        <div>
          <label className={labelClass}>{t.consultation.detailsLabel}</label>
          <textarea
            value={formData.details}
            onChange={(e) => updateField("details", e.target.value)}
            placeholder={t.consultation.detailsPlaceholder}
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>
    )
  }

  function renderStep2() {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-3">
            <Calendar size={24} className="text-accent-gold" />
          </div>
          <h2 className="text-xl font-heading font-bold text-primary">{t.consultation.preferredTime}</h2>
        </div>

        <div>
          <label className={labelClass}>{t.consultation.dateLabel} <span className="text-error">*</span></label>
          <input
            type="date"
            value={formData.preferredDate}
            onChange={(e) => updateField("preferredDate", e.target.value)}
            onBlur={() => handleBlur("preferredDate")}
            min={todayStr}
            className={`${inputClass}`}
          />
              <p className="text-xs text-text-muted mt-1.5">{t.footer.satThu}</p>
          {errors.preferredDate && <p className={errorClass}>{errors.preferredDate}</p>}
        </div>

        <div>
          <label className={labelClass}>{t.consultation.timeLabel} <span className="text-error">*</span></label>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => updateField("preferredTime", time)}
                onBlur={() => handleBlur("preferredTime")}
                className={`px-3 py-2.5 rounded-[8px] text-sm font-medium transition-all duration-200 border ${
                  formData.preferredTime === time
                    ? "bg-accent-gold text-primary border-accent-gold shadow-gold"
                    : "bg-white text-text-dark border-border/60 hover:border-accent-gold/40 hover:bg-accent-gold/5"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
          {errors.preferredTime && <p className={errorClass}>{errors.preferredTime}</p>}
        </div>
      </div>
    )
  }

  function renderStep3() {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-3">
            <User size={24} className="text-accent-gold" />
          </div>
          <h2 className="text-xl font-heading font-bold text-primary">{t.contact.formTitle}</h2>
          <p className="text-text-muted text-sm mt-1">{t.contact.formDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{t.consultation.nameLabel} <span className="text-error">*</span></label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                placeholder={t.consultation.namePlaceholder}
                className={inputClass}
              />
            {errors.name && <p className={errorClass}>{errors.name}</p>}
          </div>

          <div>
            <label className={labelClass}>{t.consultation.phoneLabel} <span className="text-error">*</span></label>
            <div className="relative">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  const val = e.target.value
                  if (val === "+966" || val.startsWith("+966")) {
                    updateField("phone", val)
                  } else if (val === "") {
                    updateField("phone", "+966")
                  }
                }}
                onBlur={() => handleBlur("phone")}
                placeholder="+9665XXXXXXXX"
                className={`${inputClass} ps-10`}
              />
              <Phone size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-text-muted" />
            </div>
            <p className="text-xs text-text-muted mt-1.5">+966501234567</p>
            {errors.phone && <p className={errorClass}>{errors.phone}</p>}
          </div>

          <div>
            <label className={labelClass}>{t.consultation.emailLabel}</label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="example@domain.com"
                className={`${inputClass} ps-10`}
              />
              <Mail size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-text-muted" />
            </div>
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>

          <div>
              <label className={labelClass}>{t.consultation.contactMethod} <span className="text-error">*</span></label>
            <div className="flex flex-col sm:flex-row gap-2 mt-1">
              {getContactMethods(t).map((method) => (
                <button
                  key={method.value}
                  type="button"
                  onClick={() => updateField("contactMethod", method.value)}
                  onBlur={() => handleBlur("contactMethod")}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-[8px] text-xs sm:text-sm font-medium transition-all duration-200 border ${
                    formData.contactMethod === method.value
                      ? "bg-accent-gold text-primary border-accent-gold shadow-gold"
                      : "bg-white text-text-dark border-border/60 hover:border-accent-gold/40 hover:bg-accent-gold/5"
                  }`}
                >
                  {method.value === "phone" && <Phone size={16} className="shrink-0" />}
                  {method.value === "whatsapp" && <MessageSquare size={16} className="shrink-0" />}
                  {method.value === "email" && <Mail size={16} className="shrink-0" />}
                  {method.label}
                </button>
              ))}
            </div>
            {errors.contactMethod && <p className={errorClass}>{errors.contactMethod}</p>}
          </div>
        </div>
      </div>
    )
  }

  function renderStep4() {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-3">
            <CheckCircle size={24} className="text-accent-gold" />
          </div>
          <h2 className="text-xl font-heading font-bold text-primary">{t.consultation.title}</h2>
          <p className="text-text-muted text-sm mt-1">{t.consultation.description}</p>
        </div>

        <div className="bg-gray-50 rounded-[12px] border border-border/60 divide-y divide-border/40">
          <div className="px-4 sm:px-5 py-4">
            <h3 className="text-xs font-bold text-accent-gold uppercase tracking-wider mb-3">{t.consultation.practiceArea}</h3>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-2">
                <span className="text-sm text-text-muted">{t.consultation.practiceArea}:</span>
                <span className="text-sm font-medium text-text-dark">{getSelectedAreaTitle()}</span>
              </div>
              {formData.details && (
                <div>
                  <span className="text-sm text-text-muted block mb-1">{t.consultation.detailsLabel}:</span>
                  <p className="text-sm text-text-dark bg-white rounded-[8px] p-3 border border-border/40">{formData.details}</p>
                </div>
              )}
            </div>
          </div>

          <div className="px-4 sm:px-5 py-4">
            <h3 className="text-xs font-bold text-accent-gold uppercase tracking-wider mb-3">{t.consultation.preferredTime}</h3>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-2">
                <span className="text-sm text-text-muted">{t.consultation.dateLabel}:</span>
                <span className="text-sm font-medium text-text-dark flex items-center gap-1.5 break-words">
                  <Calendar size={14} className="text-accent-gold shrink-0" />
                  <span>{formatDate(formData.preferredDate)}</span>
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-2">
                <span className="text-sm text-text-muted">{t.consultation.timeLabel}:</span>
                <span className="text-sm font-medium text-text-dark flex items-center gap-1.5">
                  <Clock size={14} className="text-accent-gold shrink-0" />
                  {formData.preferredTime || t.consultation.notSelected}
                </span>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-5 py-4">
            <h3 className="text-xs font-bold text-accent-gold uppercase tracking-wider mb-3">{t.contact.infoTitle}</h3>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
                <span className="text-sm text-text-muted">{t.consultation.nameLabel}:</span>
                <span className="text-sm font-medium text-text-dark">{formData.name}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
                <span className="text-sm text-text-muted">{t.consultation.phoneLabel}:</span>
                <span className="text-sm font-medium text-text-dark" dir="ltr">{formData.phone}</span>
              </div>
              {formData.email && (
                <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
                  <span className="text-sm text-text-muted">{t.consultation.emailLabel}:</span>
                  <span className="text-sm font-medium text-text-dark break-all">{formData.email}</span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
                <span className="text-sm text-text-muted">{t.consultation.contactMethod}</span>
                <span className="text-sm font-medium text-text-dark">
                  {getContactMethods(t).find((m) => m.value === formData.contactMethod)?.label || formData.contactMethod}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-amber-50/50 rounded-[12px] border border-amber-200/50 p-3 sm:p-4">
          <input
            type="checkbox"
            id="consent"
            checked={formData.consent}
            onChange={(e) => updateField("consent", e.target.checked)}
            onBlur={() => handleBlur("consent")}
            className="mt-0.5 w-4 h-4 rounded border-border/60 text-accent-gold focus:ring-accent-gold shrink-0"
          />
          <label htmlFor="consent" className="text-xs sm:text-sm text-text-muted cursor-pointer leading-relaxed">
            {t.consultation.consent}{" "}
            <Link href="/privacy-policy" className="text-accent-gold hover:underline whitespace-nowrap">{t.privacy.title}</Link>
            <span className="text-error"> *</span>
          </label>
        </div>

        {errors.consent && <p className={errorClass}>{errors.consent}</p>}
        {errors.step1 && <p className={errorClass}>{errors.step1}</p>}
      </div>
    )
  }

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {renderBreadcrumb()}

          <div className="bg-white rounded-surface border border-border/60 shadow-subtle p-6 md:p-8 lg:p-10">
            {renderStepIndicator()}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-6 md:mt-8 pt-6 border-t border-border/40">
              <div>
                {currentStep > 1 && (
                  <Button variant="outline" size="lg" onClick={handlePrev} className="gap-1.5 md:gap-2 text-xs sm:text-sm px-3 sm:px-5">
                    {isRtl ? <ChevronRight size={16} className="md:w-[18px] md:h-[18px]" /> : <ChevronLeft size={16} className="md:w-[18px] md:h-[18px]" />}
                    {t.common.back}
                  </Button>
                )}
              </div>
              <div>
                {currentStep < 4 ? (
                  <Button variant="primary" size="lg" onClick={handleNext} className="gap-1.5 md:gap-2 text-xs sm:text-sm px-3 sm:px-5">
                    {t.blog.next}
                    {isRtl ? <ChevronLeft size={16} className="md:w-[18px] md:h-[18px]" /> : <ChevronRight size={16} className="md:w-[18px] md:h-[18px]" />}
                  </Button>
                ) : (
                  <Button variant="primary" size="lg" onClick={handleSubmit} disabled={submitting} className="gap-1.5 md:gap-2 text-xs sm:text-sm px-3 sm:px-5 min-w-0 sm:min-w-[160px]">
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin shrink-0" />
                        <span className="truncate">{t.consultation.submitting}</span>
                      </>
                    ) : (
                      <>
                        <Check size={16} className="md:w-[18px] md:h-[18px] shrink-0" />
                        <span>{t.consultation.submit}</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
