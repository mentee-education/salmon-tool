// Certificate Page - COO Branding
// Unlocks when all lessons are completed
// Generates a downloadable certificate with the student's name

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ALL_LESSONS } from "@/data/courseData";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Award, Download, Lock, ChevronLeft, CheckCircle2 } from "lucide-react";

const COO_LOGO_URL = "/booklet/p01.jpg";

export default function Certificate() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [studentName, setStudentName] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("salmon_completed");
      if (saved) setCompletedLessons(JSON.parse(saved));
      const savedName = localStorage.getItem("fnt_student_name");
      if (savedName) setStudentName(savedName);
    } catch {}
  }, []);

  const totalLessons = ALL_LESSONS.length;
  const completedCount = completedLessons.length;
  const allComplete = completedCount >= totalLessons;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const handleGenerate = () => {
    if (!studentName.trim()) return;
    localStorage.setItem("fnt_student_name", studentName);
    const now = new Date();
    setCompletionDate(now.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" }));
    setShowCertificate(true);
  };

  const handleDownload = async () => {
    if (!certRef.current) return;
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        backgroundColor: "#fff",
        useCORS: true,
      });
      const link = document.createElement("a");
      link.download = `FNT-Certificate-${studentName.replace(/\s+/g, "-")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      // Fallback: print
      window.print();
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fdfcf9" }}>
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a18 0%, #2C2420 50%, #3d2e22 100%)" }}>
          <div className="absolute inset-0 opacity-[0.06]">
            <img src={COO_LOGO_URL} alt="" className="absolute right-[-5%] top-[-10%] w-[50%] max-w-[500px]" style={{ opacity: 0.12 }} />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
            <Link href="/course">
              <span className="inline-flex items-center gap-1.5 text-sm cursor-pointer mb-6" style={{ color: "#a09a90", fontFamily: "'DM Sans', sans-serif" }}>
                <ChevronLeft className="w-4 h-4" /> Back to Program
              </span>
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: "#D4A853" }} />
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 700, color: "#fff" }}>
                Certificate of Completion
              </h1>
            </div>
            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(16px, 2.5vw, 20px)", color: "#c4b9a8", maxWidth: 600 }}>
              Complete all lessons in the program to earn your certificate of achievement.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Progress Section */}
          <div className="mb-12 p-6 sm:p-8 rounded-sm border" style={{ borderColor: "#e2ddd5", background: "#fff" }}>
            <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a1a18" }}>
              Your Progress
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "#ede9e0" }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${progressPercent}%`, background: allComplete ? "#2d8a4e" : "#9B2335" }}
                />
              </div>
              <span className="text-sm font-bold shrink-0" style={{ fontFamily: "'DM Sans', sans-serif", color: allComplete ? "#2d8a4e" : "#9B2335" }}>
                {completedCount}/{totalLessons}
              </span>
            </div>
            {allComplete ? (
              <div className="flex items-center gap-2 text-sm" style={{ color: "#2d8a4e", fontFamily: "'DM Sans', sans-serif" }}>
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold">All lessons completed! You can now generate your certificate.</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm" style={{ color: "#8a7e72", fontFamily: "'DM Sans', sans-serif" }}>
                <Lock className="w-4 h-4" />
                <span>Complete {totalLessons - completedCount} more lesson{totalLessons - completedCount !== 1 ? "s" : ""} to unlock your certificate.</span>
              </div>
            )}
          </div>

          {/* Certificate Generation */}
          {allComplete && !showCertificate && (
            <div className="p-6 sm:p-8 rounded-sm border text-center" style={{ borderColor: "#D4A853", background: "#FFFDF5" }}>
              <Award className="w-12 h-12 mx-auto mb-4" style={{ color: "#D4A853" }} />
              <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#1a1a18" }}>
                Congratulations!
              </h2>
              <p className="text-sm mb-6" style={{ fontFamily: "'Source Serif 4', serif", color: "#6b5e52", maxWidth: 500, margin: "0 auto 24px" }}>
                You have completed all lessons in the SALMON Program. Enter your name below to generate your personalized certificate.
              </p>
              <div className="max-w-sm mx-auto mb-4">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-left" style={{ fontFamily: "'DM Sans', sans-serif", color: "#8a7e72" }}>
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-[#D4A853] focus:border-transparent"
                  style={{ borderColor: "#e2ddd5", fontFamily: "'Source Serif 4', serif", color: "#1a1a18" }}
                  onKeyDown={e => e.key === "Enter" && handleGenerate()}
                />
              </div>
              <button
                onClick={handleGenerate}
                disabled={!studentName.trim()}
                className="inline-flex items-center gap-2 px-8 py-3 font-bold text-white text-sm uppercase tracking-wider transition-all duration-200 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontFamily: "'DM Sans', sans-serif", background: "#D4A853", borderRadius: 2 }}
              >
                <Award className="w-4 h-4" />
                Generate Certificate
              </button>
            </div>
          )}

          {/* Locked State */}
          {!allComplete && (
            <div className="p-8 sm:p-12 rounded-sm border text-center" style={{ borderColor: "#e2ddd5", background: "#fff" }}>
              <Lock className="w-16 h-16 mx-auto mb-4" style={{ color: "#d4d0c8" }} />
              <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#1a1a18" }}>
                Certificate Locked
              </h2>
              <p className="text-sm mb-6" style={{ fontFamily: "'Source Serif 4', serif", color: "#6b5e52", maxWidth: 400, margin: "0 auto 24px" }}>
                Continue working through the program lessons to unlock your certificate of completion.
              </p>
              <Link href="/course">
                <span
                  className="inline-flex items-center gap-2 px-6 py-3 font-bold text-white text-sm uppercase tracking-wider cursor-pointer transition-all duration-200 hover:shadow-lg"
                  style={{ fontFamily: "'DM Sans', sans-serif", background: "#9B2335", borderRadius: 2 }}
                >
                  Continue Learning
                </span>
              </Link>
            </div>
          )}

          {/* Generated Certificate */}
          {showCertificate && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-6 py-2.5 font-bold text-white text-sm uppercase tracking-wider transition-all duration-200 hover:shadow-lg"
                  style={{ fontFamily: "'DM Sans', sans-serif", background: "#9B2335", borderRadius: 2 }}
                >
                  <Download className="w-4 h-4" />
                  Download Certificate
                </button>
              </div>

              {/* The Certificate */}
              <div
                ref={certRef}
                className="relative mx-auto overflow-hidden"
                style={{
                  background: "#fff",
                  border: "3px solid #D4A853",
                  padding: "48px 40px",
                  maxWidth: 800,
                  aspectRatio: "1.414 / 1",
                }}
              >
                {/* Inner border */}
                <div
                  className="absolute"
                  style={{
                    inset: 12,
                    border: "1px solid #D4A853",
                    pointerEvents: "none",
                  }}
                />

                {/* Corner accents */}
                {[
                  { top: 8, left: 8 },
                  { top: 8, right: 8 },
                  { bottom: 8, left: 8 },
                  { bottom: 8, right: 8 },
                ].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute w-6 h-6"
                    style={{
                      ...pos,
                      borderTop: pos.top !== undefined ? "2px solid #D4A853" : undefined,
                      borderBottom: pos.bottom !== undefined ? "2px solid #D4A853" : undefined,
                      borderLeft: pos.left !== undefined ? "2px solid #D4A853" : undefined,
                      borderRight: pos.right !== undefined ? "2px solid #D4A853" : undefined,
                    } as React.CSSProperties}
                  />
                ))}

                {/* COO Logo */}
                <div className="text-center mb-6">
                  <img
                    src={COO_LOGO_URL}
                    alt="Seabird Island"
                    className="h-16 sm:h-20 mx-auto"
                    crossOrigin="anonymous"
                  />
                </div>

                {/* Certificate Title */}
                <div className="text-center mb-8">
                  <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ fontFamily: "'DM Sans', sans-serif", color: "#D4A853" }}>
                    Seabird Island
                  </p>
                  <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "#1a1a18", lineHeight: 1.2 }}>
                    Certificate of Completion
                  </h1>
                  <div className="w-24 h-0.5 mx-auto mt-4" style={{ background: "#D4A853" }} />
                </div>

                {/* Body */}
                <div className="text-center mb-8">
                  <p className="text-sm mb-4" style={{ fontFamily: "'Source Serif 4', serif", color: "#6b5e52" }}>
                    This certifies that
                  </p>
                  <p
                    className="mb-4"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(22px, 3.5vw, 32px)",
                      fontWeight: 700,
                      color: "#9B2335",
                      borderBottom: "2px solid #D4A853",
                      display: "inline-block",
                      paddingBottom: 4,
                      paddingLeft: 24,
                      paddingRight: 24,
                    }}
                  >
                    {studentName}
                  </p>
                  <p className="text-sm mt-4" style={{ fontFamily: "'Source Serif 4', serif", color: "#6b5e52", maxWidth: 480, margin: "16px auto 0" }}>
                    has successfully completed all modules of the
                  </p>
                  <p className="text-base font-bold mt-2" style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a1a18" }}>
                    The SALMON Program Program
                  </p>
                  <p className="text-sm mt-4" style={{ fontFamily: "'Source Serif 4', serif", color: "#6b5e52" }}>
                    Awarded on {completionDate}
                  </p>
                </div>

                {/* Signature area */}
                <div className="flex items-end justify-between mt-12 px-8">
                  <div className="text-center">
                    <div className="w-40 border-b mb-1" style={{ borderColor: "#d4d0c8" }} />
                    <p className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif", color: "#8a7e72" }}>
                      Seabird Island
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-40 border-b mb-1" style={{ borderColor: "#d4d0c8" }} />
                    <p className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif", color: "#8a7e72" }}>
                      Date
                    </p>
                  </div>
                </div>

                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
                  <img src={COO_LOGO_URL} alt="" className="w-[60%]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
