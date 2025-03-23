import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit?: (values: LoginFormValues) => Promise<void>;
  className?: string;
}

const LoginForm = ({ onSubmit, className = "" }: LoginFormProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(values);
      } else {
        // Mock implementation for when no onSubmit is provided
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      setMagicLinkSent(true);
    } catch (error) {
      console.error("Login error:", error);
      form.setError("email", {
        type: "manual",
        message: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "w-full max-w-md p-6 bg-white rounded-lg shadow-md",
        className,
      )}
    >
      {!magicLinkSent ? (
        <>
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Mitarbeiter Login
            </h2>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="E-Mail-Adresse eingeben" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <div className="text-center">
          <p className="text-gray-600">
            Ein Magic Link wurde an Ihre E-Mail-Adresse gesendet.
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
