"use client";

import { useState } from "react";
import { Award, Check, Download, Eye, ExternalLink, QrCode, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MockStudentProfile } from "@/lib/mock-data";

interface CertificatesShowcaseProps {
  certificates: MockStudentProfile["certificates"];
  badges: MockStudentProfile["badges"];
  studentName: string;
}

export const CertificatesShowcase = ({
  certificates,
  badges,
  studentName,
}: CertificatesShowcaseProps) => {
  const [selectedCert, setSelectedCert] = useState<(typeof certificates)[0] | null>(null);

  return (
    <div className="rounded-2xl border-2 border-[#e8e2d7] bg-white p-6 shadow-md border-t-4 border-t-[#6e5e06]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-[#6e5e06]" />
            <h3 className="text-xl font-bold font-heading text-[#1d1b15]">
              Accredited Certificates & Scholarly Honors
            </h3>
          </div>
          <p className="text-sm text-[#4b4738] mt-1">
            Verified institutional certificates awarded upon successful milestone examination (≥ 70% threshold)
          </p>
        </div>
      </div>

      {/* Certificates Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="group relative rounded-xl border-2 border-[#dcc669] bg-gradient-to-br from-[#fff9ee] via-[#fffdf9] to-[#f9f3e8] p-5 shadow-xs transition hover:shadow-md hover:border-[#6e5e06]"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fae282] text-[#534600] border border-[#dcc669]">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <span className="rounded-sm bg-[#534600] px-2 py-0.5 text-[10px] font-bold text-[#fae282] uppercase tracking-wider">
                    Official Certification
                  </span>
                  <p className="text-xs font-semibold text-[#7c7766] mt-0.5">
                    {cert.course} • {cert.level}
                  </p>
                </div>
              </div>

              <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-800 flex items-center gap-1">
                <Check className="h-3 w-3" />
                Verified
              </span>
            </div>

            <h4 className="text-base font-bold font-heading text-[#1d1b15] mb-2 group-hover:text-[#6e5e06] transition-colors">
              {cert.title}
            </h4>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e8e2d7] pt-3 text-xs text-[#4b4738]">
              <div>
                <p>Honors: <strong className="text-[#6e5e06]">{cert.score}</strong></p>
                <p className="text-[11px] text-[#7c7766]">Issued: {cert.issueDate}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="secondaryOutline"
                  className="h-8 text-xs font-bold"
                  onClick={() => setSelectedCert(cert)}
                >
                  <Eye className="mr-1 h-3.5 w-3.5" />
                  Inspect
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Badges Section */}
      <div>
        <h4 className="text-sm font-bold uppercase tracking-wider text-[#6e5e06] mb-3">
          Scholarly Badges & Achievements
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex items-start gap-3 rounded-xl border border-[#e8e2d7] bg-[#fdfbf7] p-3.5 transition hover:bg-[#fff9ee] hover:border-[#cdc6b3]"
            >
              <span className="text-2xl">{badge.icon}</span>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-[#1d1b15]">{badge.title}</p>
                <p className="text-[11px] text-[#4b4738] leading-tight">{badge.description}</p>
                <p className="text-[10px] font-semibold text-[#6e5e06] pt-1">Unlocked: {badge.unlockedAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-2xl border-4 border-[#dcc669] bg-[#fff9ee] p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-[#7c7766] hover:bg-[#eee7dd] transition"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Certificate Canvas Design */}
            <div className="rounded-xl border-2 border-[#6e5e06] bg-white p-6 sm:p-10 text-center relative overflow-hidden shadow-inner">
              <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#dcc669] pointer-events-none" />

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fae282] text-[#534600] border-2 border-[#6e5e06] mb-3 shadow-md">
                <Award className="h-8 w-8" />
              </div>

              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#6e5e06] mb-1 font-heading">
                Language Learning Platform
              </h2>
              <p className="text-[11px] uppercase tracking-wider text-[#7c7766] mb-4">
                Academic Language Accreditation Board
              </p>

              <p className="text-sm italic text-[#4b4738] mb-2 font-serif">
                This is to officially certify that
              </p>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1d1b15] border-b-2 border-[#dcc669] pb-2 max-w-md mx-auto mb-3">
                {studentName}
              </h3>

              <p className="text-xs sm:text-sm text-[#4b4738] max-w-lg mx-auto mb-4">
                has successfully fulfilled all curriculum requirements, deterministic assessments, speech evaluations, and scored <strong>{selectedCert.score}</strong> on the examination for:
              </p>

              <h4 className="text-base sm:text-lg font-bold font-heading text-[#6e5e06] mb-1">
                {selectedCert.title}
              </h4>
              <p className="text-xs font-semibold text-[#7c7766] mb-6">
                {selectedCert.level}
              </p>

              <div className="flex items-center justify-between border-t border-[#e8e2d7] pt-4 text-left text-xs text-[#4b4738]">
                <div>
                  <p className="text-[10px] text-[#7c7766]">Date Awarded</p>
                  <p className="font-bold text-[#1d1b15]">{selectedCert.issueDate}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded border border-[#cdc6b3] bg-[#f9f3e8] p-1 flex items-center justify-center">
                    <QrCode className="h-6 w-6 text-[#6e5e06]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#7c7766]">Verification ID</p>
                    <p className="font-mono font-bold text-[#1d1b15] text-[10px]">{selectedCert.verificationId}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setSelectedCert(null)}
              >
                Close Preview
              </Button>
              <Button
                variant="secondary"
                onClick={() => window.print()}
                className="font-bold"
              >
                <Download className="mr-2 h-4 w-4" />
                Print / Download PDF Certificate
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
