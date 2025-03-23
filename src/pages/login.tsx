import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/LoginForm";
import { cn } from "@/lib/utils";
import supabase from "@/lib/supabase";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (values: { email: string, password: string }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        console.error("Login-Fehler:", error.message);
        return;
      }

      // Redirect nach erfolgreichem Login
      navigate('/dashboard');
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md mb-8 text-center">
        <img src="assets/images/logo.webp" alt="Logo" className="h-16 mx-auto mb-4" />
        <p className="text-gray-600">
          Mitarbeiterbereich - Bitte melden Sie sich an
        </p>
      </div>

      <LoginForm onSubmit={handleLogin} className={cn("w-full max-w-md")} />

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/")}
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
        >
          Zurück zur Startseite
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
