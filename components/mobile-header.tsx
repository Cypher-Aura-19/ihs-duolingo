import { MobileSidebar } from "./mobile-sidebar";

export const MobileHeader = () => {
  return (
    <nav className="fixed top-0 z-50 flex h-[50px] w-full items-center border-b border-[#534600] bg-[#6e5e06] px-4 shadow-sm lg:hidden">
      <MobileSidebar />
    </nav>
  );
};

