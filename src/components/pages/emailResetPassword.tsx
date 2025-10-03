import type React from "react"
import { useState } from "react"
import { requestPasswordReset } from "@/api/Auth"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export default function EmailPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    try {
      await requestPasswordReset(email)
      toast.success("Permintaan reset kata sandi berhasil dikirim.")
      localStorage.setItem("resetEmail", email)
      navigate("/otp")
    } catch (error) {
      toast.error(error as string || "Gagal mengirim email. Silakan coba lagi.")
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-lg">
        <div className="p-6 text-center border-b border-slate-200 ">
          <h1 className="text-2xl font-bold text-primary">Masukkan Email Anda</h1>
          <p className="mt-2 text-sm text-secondary/60 ">
            Silakan masukkan alamat email Anda di bawah ini
          </p>
        </div>

        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-primary/60">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="nama@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-lg bg-primary/80 hover:bg-primary active:bg-primary text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Kirim
              </button>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <div className="rounded-lg bg-input border border-primary p-4">
                <p className="text-sm text-secondary/60">Email berhasil dikirim!</p>
                <p className="mt-2 font-medium text-secondary">{email}</p>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setEmail("")
                }}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                Kirim Email Lain
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
