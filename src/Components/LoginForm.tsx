import { useForm } from "react-hook-form";
import type { LoginCredential } from "../Types/types";
import { useNavigate } from "react-router-dom";
import { Divider } from "@heroui/react";
import { useState } from "react";
import { toast } from "sonner";
import { useBoundStore } from "../Store/BoundStore/BoundStore";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../Services/AuthServices";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredential>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const setUserData = useBoundStore((state) => state.setUserData);

  const { mutateAsync: handleUserLogin } = useMutation({
    mutationFn: loginUser,
    onSuccess: (userData) => {
      toast.success(`Success Login, Welcome ${userData.name}`);
      setTimeout(() => {
        setUserData(userData);
        navigate(userData ? "/csp/dashboard" : "/");
      }, 3500);
    },
    onError: () => {
      toast.error("Wrong credentials!");
    },
  });

  const checkCredentials = async (data: LoginCredential) => {
    handleUserLogin({
      usuario: data.usuario,
      contrasena: data.contrasena,
    });
  };

  return (
    <>
      <div className="p-4 md:p-6">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-semibold text-center text-pretty">
            Sign in to your account
          </h1>
          <form
            noValidate
            onSubmit={handleSubmit(checkCredentials)}
            className="md:m-4"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="numberEmployee"
                className={`${
                  errors.usuario
                    ? "text-sm font-bold text-[#F71111] "
                    : "text-sm font-bold"
                }`}
              >
                {/* {errors.no_employee ? `${t("No.Employee")}` : t("No.Employee")} */}
                Username:
              </label>
              <input
                id="usuario"
                className="w-full h-10 rounded-full p-4 border border-[#E0E0E0] bg-white"
                type="text"
                {...register("usuario", {
                  required: "Campo obligatorio",
                })}
              />
              <label
                htmlFor="password"
                className={`${
                  errors.contrasena
                    ? "text-sm font-bold text-[#F71111] "
                    : "text-sm font-bold"
                }`}
              >
                {/* {errors.password ? `${t("Password")}` : t("Password")} */}
                Password:
              </label>
              <div className="relative w-full">
                <input
                  id="password"
                  className="w-full h-10 rounded-full p-4 border border-[#E0E0E0] bg-white"
                  type={showPassword ? "text" : "password"}
                  {...register("contrasena", {
                    required: "Campo obligatorio",
                  })}
                />
                <div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <i className="bi bi-eye text-[#0068FF] text-xl"></i>
                  ) : (
                    <i className="bi bi-eye-slash text-[#0068FF] text-xl"></i>
                  )}
                </div>
              </div>
            </div>
            <input
              type="submit"
              className="w-full p-2 text-center text-white font-bold bg-[#F71111] rounded-full mt-8 hover:cursor-pointer"
              /* value={`${t("Sign In")}`} */
              value={"Sign In"}
            />
          </form>
          <Divider></Divider>
          <p className="text-center italic text-[#0068FF] font-bold hover:cursor-pointer">
            Forgot password?{" "}
          </p>
        </div>
      </div>
    </>
  );
}
