import { useEffect, useState } from "react";
import { verifyEmail } from "@/api/Auth";
import { useSearchParams,useNavigate } from "react-router-dom";

export function VerifyEmailContent() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const searchParams = useSearchParams();
  const token = searchParams[0].get("token");

  const verify = async () => {
    if (!token) {
        setStatus("error");
        return;
    }
    try {
      await verifyEmail(token);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }

  }

  useEffect(() => {
    // Simulasi proses verifikasi
    const timer = setTimeout(() => {
        verify();
      setStatus("success");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === "success" && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (status === "success" && countdown === 0) {
      navigate("/login");
    }
  }, [status, countdown]);

  const handleContinue = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      <div className="w-full max-w-md">
        <div className="p-8 rounded-lg shadow-xl border border-primary/50 backdrop-blur-sm bg-white">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Icon Status */}
            <div className="relative">
              {status === "loading" && (
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-primary animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              )}
              {status === "success" && (
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center animate-[zoom-in_0.5s_ease-out]">
                  <svg
                    className="w-10 h-10 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              )}
              {status === "error" && (
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center animate-[zoom-in_0.5s_ease-out]">
                  <svg
                    className="w-10 h-10 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Heading */}
            <div className="space-y-2">
              {status === "loading" && (
                <>
                  <h1 className="text-2xl font-semibold text-primary">
                    Memverifikasi Email
                  </h1>
                  <p className="text-primary text-balance">
                    Mohon tunggu sebentar, kami sedang memverifikasi email
                    Anda...
                  </p>
                </>
              )}
              {status === "success" && (
                <>
                  <h1 className="text-2xl font-semibold text-primary">
                    Email Terverifikasi!
                  </h1>
                  <p className="text-primary text-balance">
                    Selamat! Email Anda telah berhasil diverifikasi. Anda
                    sekarang dapat mengakses semua fitur aplikasi.
                  </p>
                </>
              )}
              {status === "error" && (
                <>
                  <h1 className="text-2xl font-semibold text-red-600">
                    Verifikasi Gagal
                  </h1>
                  <p className="text-red-600 text-balance">
                    Maaf, link verifikasi tidak valid atau sudah kadaluarsa.
                    Silakan coba lagi.
                  </p>
                </>
              )}
            </div>

            {/* Additional Info */}
            {status === "success" && (
              <div className="w-full p-4 rounded-lg bg-white border border-primary/70">
                <p className="text-sm text-primary">
                  Anda akan diarahkan ke halaman login dalam{" "}
                  <span className="font-semibold text-primary">
                    {countdown}
                  </span>{" "}
                  detik
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="w-full space-y-3 pt-2">
              {status === "success" && (
                <button
                  onClick={handleContinue}
                  className="w-full px-6 py-3 rounded-lg bg-white text-primary font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group"
                >
                  Lanjutkan ke Login
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Footer Text */}
            {status === "success" && (
              <p className="text-xs text-primary pt-4">
                Jika Anda tidak diarahkan secara otomatis, klik tombol di atas
                untuk melanjutkan.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
