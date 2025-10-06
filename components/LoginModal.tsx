"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import RegisterModal from "./RegisterModal";

export default function LoginModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login form submitted:", form);
    // Here you would typically handle the login logic
    setIsOpen(false); // Close modal after submission
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full sm:max-w-md">
        <DialogTitle className="sr-only">Login to Artisan</DialogTitle>
        <DialogDescription className="sr-only">Sign in to your Artisan account to connect with India&apos;s handmade ecosystem</DialogDescription>
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold mb-2 text-[color:var(--brand)]">Welcome to Artisan</h2>
            <p className="text-muted-foreground text-lg">Connect with India&apos;s handmade ecosystem</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="grid gap-6 flex-grow">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                <Mail className="inline h-4 w-4 mr-2" />
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                className="h-12 rounded-xl"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                <Lock className="inline h-4 w-4 mr-2" />
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  className="h-12 rounded-xl pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-auto pt-6">
              <Button type="submit" className="w-full h-12 rounded-xl" withArrow={false}>
                Sign In
              </Button>
            </div>
          </form>

          {/* Additional Links */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <RegisterModal>
                <button className="text-[color:var(--brand)] hover:underline">
                  Create Account
                </button>
              </RegisterModal>
            </p>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Back to Home
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
