import React from "react";
import Image from "next/image";
import Link from "next/link";

export const GUEST_USER = {
  id: "user_guest",
  userId: "user_guest",
  firstName: "Guest",
  lastName: "Learner",
  imageUrl: "/mascot.svg",
  emailAddresses: [{ emailAddress: "guest@lingo.local" }],
};

// Server-side auth mock
export const auth = Object.assign(
  async () => ({
    userId: GUEST_USER.id,
    user: GUEST_USER,
    protect: async () => {},
  }),
  {
    protect: async () => {},
  }
);

export const currentUser = async () => GUEST_USER;

// Client-side auth hook mock
export const useAuth = () => ({
  isSignedIn: true,
  isLoaded: true,
  userId: GUEST_USER.id,
  sessionId: "sess_guest",
  signOut: () => {},
});

export const useUser = () => ({
  isSignedIn: true,
  isLoaded: true,
  user: GUEST_USER,
});

// Mock UI components for client views
export const ClerkProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const ClerkLoaded = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const ClerkLoading = ({ children }: { children?: React.ReactNode }) => {
  return null;
};

export const UserButton = ({
  appearance,
}: {
  appearance?: { elements?: { userButtonPopoverCard?: { pointerEvents: string } } };
}) => {
  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 shadow-sm">
      <div className="relative h-7 w-7 overflow-hidden rounded-full bg-green-100">
        <Image
          src="/mascot.svg"
          alt="Guest Learner"
          fill
          className="object-cover"
        />
      </div>
      <span className="text-xs font-bold text-neutral-700">Guest</span>
    </div>
  );
};

export const SignInButton = ({
  children,
  asChild,
}: {
  children?: React.ReactNode;
  asChild?: boolean;
  mode?: string;
}) => {
  return <Link href="/learn">{children || "Sign In"}</Link>;
};

export const SignUpButton = ({
  children,
  asChild,
}: {
  children?: React.ReactNode;
  asChild?: boolean;
  mode?: string;
}) => {
  return <Link href="/learn">{children || "Sign Up"}</Link>;
};

export const Show = ({
  when,
  children,
}: {
  when: "signed-in" | "signed-out";
  children: React.ReactNode;
}) => {
  if (when === "signed-in") {
    return <>{children}</>;
  }
  return null;
};
