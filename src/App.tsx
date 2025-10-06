import { Image } from "@heroui/react";
import "./App.css";
import LoginForm from "./Components/LoginForm";

function App() {
  return (
    <div className="flex flex-col p-4 lg:p-0 items-center justify-center">
      <div className="flex flex-col lg:flex-row gap-20">
        <div className="flex flex-col justify-end items-center gap-8 ">
          <div className="flex flex-col justify-end items-center gap-8 ">
            <div className="text-center text-pretty text-4xl md:text-5xl p-2 lg:min-w-[49rem] font-bold">
              <span className="tracking-in-expand ">
                Welcome to <span className="text-[#D22D25]">CSP</span> Quality
                <p>
                  <span className="text-[#0068FF]">Reports</span> System
                </p>
              </span>
            </div>
          </div>
          <Image
            alt="Control panel illustration"
            src="/undraw_visual-data_1eya.svg"
            className="lg:flex hidden"
            width={500}
          />
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="w-2/4">
            <Image
              alt="CSP Logo"
              src="/csp_logo.svg"
              width={500}
              className="rounded-none"
            />
          </div>
          <div className="bg-[#F8F9FA] w-full h-full rounded-3xl">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
