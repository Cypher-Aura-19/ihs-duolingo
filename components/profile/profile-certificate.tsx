"use client";

import { Award, BadgeCheck, Download, Eye, QrCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MockStudentProfile } from "@/lib/mock-data";

interface ProfileCertificateProps {
  certificate: MockStudentProfile["certificates"][0];
  studentName: string;
}

const cleanDashes = (value: string) => value.replace(/[–—]/g, "-");

export const ProfileCertificate = ({
  certificate,
  studentName,
}: ProfileCertificateProps) => {
  if (!certificate) return null;

  return (
    <Dialog>
      <section className="rounded-2xl border border-[#e3ded2] bg-white p-5 shadow-[0_12px_32px_rgba(76,67,40,0.05)]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-[#6e5e06]" />
            <h2 className="font-heading text-lg font-extrabold text-[#1d1b15]">
              Certificate
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f5edbd] px-2 py-1 text-[11px] font-bold text-[#594c05]">
            <BadgeCheck className="h-3.5 w-3.5" />
            Verified
          </span>
        </div>

        <div className="mt-4 border-l-4 border-[#6e5e06] bg-[#faf8f2] px-4 py-4">
          <p className="text-[11px] font-bold text-[#6e5e06]">
            Language achievement
          </p>
          <h3 className="mt-1.5 text-sm font-extrabold leading-snug text-[#1d1b15]">
            {certificate.title}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[#686354]">
            {cleanDashes(certificate.level)}
          </p>

          <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-[#e3ded2] pt-3">
            <div>
              <dt className="text-[10px] font-semibold text-[#8b8576]">
                Score
              </dt>
              <dd className="mt-0.5 text-xs font-bold text-[#2c2a23]">
                {certificate.score}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold text-[#8b8576]">
                Issued
              </dt>
              <dd className="mt-0.5 text-xs font-bold text-[#2c2a23]">
                {certificate.issueDate}
              </dd>
            </div>
          </dl>
        </div>

        <DialogTrigger asChild>
          <Button
            variant="secondaryOutline"
            size="sm"
            className="mt-4 w-full rounded-xl normal-case tracking-normal active:translate-y-px"
          >
            <Eye className="mr-2 h-4 w-4" />
            View certificate
          </Button>
        </DialogTrigger>
      </section>

      <DialogContent className="max-h-[90dvh] max-w-2xl overflow-y-auto rounded-2xl border border-[#d9cfac] bg-[#fffdf8] p-4 shadow-[0_28px_80px_rgba(29,27,21,0.24)] sm:p-7">
        <DialogHeader className="pr-8">
          <DialogTitle className="font-heading text-xl font-extrabold text-[#1d1b15]">
            Certificate preview
          </DialogTitle>
          <DialogDescription className="text-[#686354]">
            Verified language achievement for {studentName}.
          </DialogDescription>
        </DialogHeader>

        <div className="relative overflow-hidden rounded-2xl border border-[#b8a85e] bg-white p-6 text-center sm:p-10">
          <div className="absolute inset-x-0 top-0 h-1 bg-[#6e5e06]" />

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f5edbd] text-[#594c05]">
            <Award className="h-7 w-7" />
          </div>

          <p className="mt-5 text-xs font-bold text-[#6e5e06]">
            Language Learning Platform
          </p>
          <p className="mt-1 text-xs text-[#7c7766]">
            Academic Accreditation Board
          </p>

          <p className="mt-8 text-sm text-[#686354]">This certifies that</p>
          <h3 className="mx-auto mt-2 max-w-md border-b border-[#d9cfac] pb-3 font-heading text-2xl font-extrabold tracking-[-0.025em] text-[#1d1b15] sm:text-3xl">
            {studentName}
          </h3>

          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#686354]">
            completed the required curriculum and assessments with a final score
            of
            <strong className="text-[#1d1b15]"> {certificate.score}</strong>.
          </p>

          <h4 className="mx-auto mt-5 max-w-lg font-heading text-lg font-extrabold text-[#594c05]">
            {certificate.title}
          </h4>
          <p className="mt-1 text-sm font-semibold text-[#686354]">
            {cleanDashes(certificate.level)}
          </p>

          <div className="mt-8 grid gap-4 border-t border-[#e3ded2] pt-5 text-left sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold text-[#8b8576]">
                Date issued
              </p>
              <p className="mt-1 text-sm font-bold text-[#1d1b15]">
                {certificate.issueDate}
              </p>
            </div>
            <div className="flex items-center gap-3 sm:justify-end">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ded8ca] bg-[#faf8f2] text-[#6e5e06]">
                <QrCode className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-semibold text-[#8b8576]">
                  Verification ID
                </p>
                <p className="mt-1 font-mono text-[11px] font-bold text-[#1d1b15]">
                  {certificate.verificationId}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.print()}
            className="rounded-xl normal-case tracking-normal active:translate-y-px"
          >
            <Download className="mr-2 h-4 w-4" />
            Print or save PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
