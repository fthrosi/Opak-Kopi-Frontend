import type React from "react";
import { useState } from "react";
import { resetPassword } from "@/api/Auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function PasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const validatePassword = (pass: string) => {
    if (pass.length < 6) {
      return "Password minimal 6 karakter";
    }
    if (!/(?=.*[a-z])/.test(pass)) {
      return "Password harus mengandung huruf kecil";
    }
    if (!/(?=.*[A-Z])/.test(pass)) {
      return "Password harus mengandung huruf besar";
    }
    if (!/(?=.*\d)/.test(pass)) {
      return "Password harus mengandung angka";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { password?: string; confirmPassword?: string } = {};
    const passwordError = validatePassword(password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token") || "";
    try {
      await resetPassword(token, password);
      toast.success("Password berhasil direset!");
      setSubmitted(false);
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (error) {
      toast.error(error as string || "Gagal mereset password. Silakan coba lagi.");
    }
  };
  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return { strength: 0, label: "", color: "" };
    if (pass.length < 6)
      return { strength: 25, label: "Lemah", color: "bg-red-500" };
    let strength = 25;
    if (/(?=.*[a-z])/.test(pass)) strength += 25;
    if (/(?=.*[A-Z])/.test(pass)) strength += 25;
    if (/(?=.*\d)/.test(pass)) strength += 25;
    if (strength <= 50)
      return { strength, label: "Sedang", color: "bg-yellow-500" };
    if (strength <= 75)
      return { strength, label: "Baik", color: "bg-blue-500" };
    return { strength, label: "Kuat", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-input rounded-full mb-4">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-primary mb-2">
              Buat Password
            </h1>
            <p className="text-secondary/60">Masukkan password baru Anda</p>
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                Password berhasil dibuat!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-secondary mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors({ ...errors, password: "" });
                    }}
                    className={`w-full px-4 py-3 pr-12 rounded-lg border ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-300 dark:border-slate-600 focus:ring-blue-500"
                    } bg-white text-slate-900  placeholder-slate-400 focus:outline-none focus:ring-2 transition-all`}
                    placeholder="Masukkan password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        Kekuatan Password
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          passwordStrength.strength <= 50
                            ? "text-red-600 dark:text-red-400"
                            : passwordStrength.strength <= 75
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength.color} transition-all duration-300`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      />
                    </div>
                  </div>
                )}
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-secondary mb-2"
                >
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrors({ ...errors, confirmPassword: "" });
                    }}
                    className={`w-full px-4 py-3 pr-12 rounded-lg border ${
                      errors.confirmPassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-300 dark:border-slate-600 focus:ring-blue-500"
                    } bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all`}
                    placeholder="Konfirmasi password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.confirmPassword}
                  </p>
                )}
                {confirmPassword &&
                  password === confirmPassword &&
                  !errors.confirmPassword && (
                    <p className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Password cocok
                    </p>
                  )}
              </div>

              <button
                type="submit"
                className="w-full bg-primary/80 hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
              >
                Buat Password
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-primary">
            <p className="text-xs text-secondary/70 text-center">
              Password harus minimal 6 karakter dan mengandung huruf besar,
              huruf kecil, dan angka
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
