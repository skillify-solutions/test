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
    
    // Dummy login credentials for testing
    const dummyCredentials = [
      { email: "priya.sharma@example.com", password: "password123", role: "MAKER", name: "Priya Sharma" },
      { email: "rajesh.kumar@example.com", password: "password123", role: "DESIGN_CONSULTANT", name: "Rajesh Kumar" },
      { email: "anita.patel@example.com", password: "password123", role: "BUYER", name: "Anita Patel" },
      { email: "vikram.singh@example.com", password: "password123", role: "SERVICE_PROVIDER", name: "Vikram Singh" },
      { email: "sunita.devi@example.com", password: "password123", role: "MAKER_BUYER", name: "Sunita Devi" },
      { email: "admin@artisan.com", password: "admin123", role: "ADMIN", name: "Admin User" }
    ];
    
    // Check if credentials match
    const user = dummyCredentials.find(
      cred => cred.email === form.username && cred.password === form.password
    );
    
    if (user) {
      // Store user data in localStorage for session management
      localStorage.setItem('user', JSON.stringify({
        email: user.email,
        role: user.role,
        name: user.name,
        isLoggedIn: true
      }));
      
      console.log("Login successful:", user);
      setIsOpen(false);
      
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      alert("Invalid credentials. Please try again.\n\nDummy credentials:\n• priya.sharma@example.com / password123 (Maker)\n• rajesh.kumar@example.com / password123 (Design Consultant)\n• anita.patel@example.com / password123 (Buyer)\n• vikram.singh@example.com / password123 (Service Provider)\n• sunita.devi@example.com / password123 (Maker-Buyer)\n• admin@artisan.com / admin123 (Admin)");
    }
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

          {/* Dummy Credentials Info */}
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs text-amber-800 font-medium mb-2">Demo Credentials:</p>
            <div className="text-xs text-amber-700 space-y-1">
              <p>• priya.sharma@example.com / password123 (Maker)</p>
              <p>• anita.patel@example.com / password123 (Buyer)</p>
              <p>• vikram.singh@example.com / password123 (Service Provider)</p>
              <p>• admin@artisan.com / admin123 (Admin)</p>
            </div>
          </div>

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
