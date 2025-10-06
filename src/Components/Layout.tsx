import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./Navbar";

export default function Layout() {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      <header>{location.pathname !== "/" ? <Navbar /> : null}</header>
      <div className="flex flex-1">
        <main className="flex-grow bg-[#FFFFFF] p-4 mt-4 md:mt-0 flex flex-col justify-center items-center">
          <Outlet />
        </main>
      </div>
      <footer className="italic text-center text-[#868E96]">
        CSP Quality Reports System powered by IT Department ®
      </footer>
    </div>
  );
}
