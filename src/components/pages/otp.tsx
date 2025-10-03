import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { verifyOTP } from "@/api/Auth"
import { toast } from "sonner"

export default function OTPPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
  const [submitted, setSubmitted] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const email = localStorage.getItem("resetEmail") || ""

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {
  
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)

    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split("").forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char
      }
    })
    setOtp(newOtp)
    const nextIndex = Math.min(pastedData.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const otpCode = otp.join("")
    if (otpCode.length === 6) {
      setSubmitted(true)
      try {
        const result = await verifyOTP(email, otpCode)
        toast.success("OTP verified successfully!")
        const token = result.resetToken
        navigate(`/password?token=${token}`)
      } catch (error) {
        console.error("OTP verification failed:", error)
      }
    }
  }

  const handleResend = () => {
    console.log("Resend OTP requested")
    // Add your resend OTP logic here
  }

  const handleReset = () => {
    setSubmitted(false)
    setOtp(["", "", "", "", "", ""])
    setTimeout(() => inputRefs.current[0]?.focus(), 0)
  }

  const isComplete = otp.every((digit) => digit !== "")

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-lg">
        <div className="p-6 text-center border-b border-slate-200">
          <h1 className="text-2xl font-bold text-primary">Verifikasi OTP</h1>
          <p className="mt-2 text-sm text-secondary/60">
            Masukkan kode 6 digit yang telah dikirim ke email Anda
          </p>
        </div>
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex gap-2 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-14 text-center text-2xl font-semibold rounded-lg border-2 border-primary bg-white text-secondary focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition-all"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={!isComplete}
                className="w-full px-4 py-3 rounded-lg bg-primary/80 hover:bg-primary/90 active:bg-primary disabled:bg-primary/30 disabled:cursor-not-allowed text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Verifikasi
              </button>

              <div className="text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Tidak menerima kode?{" "}
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-secondary hover:underline font-medium"
                  >
                    Kirim Ulang
                  </button>
                </p>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4">
                <div className="flex justify-center mb-3">
                  <svg
                    className="w-12 h-12 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-green-800 dark:text-green-300">Verifikasi Berhasil!</p>
                <p className="mt-2 text-sm text-green-700 dark:text-green-400">
                  Kode OTP Anda: <span className="font-mono font-bold">{otp.join("")}</span>
                </p>
              </div>
              <button
                onClick={handleReset}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                Verifikasi Lagi
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
