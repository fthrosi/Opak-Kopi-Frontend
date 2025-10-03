import type React from "react";
import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceID || !templateID || !publicKey) {
        throw new Error("EmailJS environment variables are not set");
      }
      const result = await emailjs.send(
        serviceID,
        templateID,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          tanggal: new Date().toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        },
        publicKey
      );
        console.log("Email successfully sent!", result.status, result.text);
        toast.success("Pesan berhasil dikirim!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
    } catch (error) {
      console.error("Error sending message:", error);
        toast.error("Gagal mengirim pesan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 pt-11.5 xs:pt-12.5 sm:pt-13 md:pt-18 lg:pt-19 xl:pt-20 2xl:pt-[5.9rem]">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-xl xs:text-3xl font-bold text-primary mb-2">
            Hubungi Kami
          </h1>
          <p className="text-sm text-secondary/60">
            Kirimkan pesan Anda dan kami akan segera merespons
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-secondary mb-2"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-primary bg-white text-primary placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Masukkan nama Anda"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium  text-secondary mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-primary bg-white text-primary placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-secondary mb-2"
            >
              Subjek
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-primary bg-white text-primary placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Topik pesan Anda"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-secondary mb-2"
            >
              Pesan
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 rounded-lg border  border-primary bg-white text-primary placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              placeholder="Tulis pesan Anda di sini..."
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 rounded-lg bg-primary/70 hover:bg-primary/90 disabled:bg-primary/40 text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Mengirim...
              </span>
            ) : (
              "Kirim Pesan"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
