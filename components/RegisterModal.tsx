"use client";


import * as React from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X, Scissors, Settings, ShoppingCart } from "lucide-react";
import MakerRegistrationForm from "./forms/maker-registration-form";
import ServiceProviderRegistrationForm from "./forms/service-provider-registration-form";
import BuyerRegistrationForm from "./forms/buyer-registration-form";


export default function RegisterModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedUserType, setSelectedUserType] = React.useState<null | "makers" | "service-providers" | "buyers">(null);

  const roles = [
    {
      id: "makers",
      title: "Makers",
      description: "Skilled artisans and craftspeople creating authentic handmade products",
      icon: Scissors,
      color: "bg-amber-600"
    },
    {
      id: "service-providers",
      title: "Service Providers", 
      description: "Consultants, logistics, training, and technical support services",
      icon: Settings,
      color: "bg-amber-600"
    },
    {
      id: "buyers",
      title: "Buyers",
      description: "Retailers, wholesalers, and customers sourcing authentic handmade products",
      icon: ShoppingCart,
      color: "bg-amber-600"
    }
  ];

  const handleRoleSelect = (roleId: "makers" | "service-providers" | "buyers") => {
    setSelectedUserType(roleId);
  };

  const handleBack = () => {
    setSelectedUserType(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">Join Artisan</DialogTitle>
        <DialogDescription className="sr-only">Select your role to get started with Artisan</DialogDescription>
        <div className="flex flex-col h-full px-4 py-6 sm:px-6 md:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-[color:var(--brand)]">Join Artisan</h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                {selectedUserType === null ? "Select your role to get started" :
                  selectedUserType === "makers" ? "Maker Registration" :
                  selectedUserType === "service-providers" ? "Service Provider Registration" :
                  selectedUserType === "buyers" ? "Buyer Registration" : ""}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Step 1: Role Selection */}
          {selectedUserType === null && (
            <div className="grid gap-4 flex-grow">
              {roles.map((role) => {
                const IconComponent = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id as "makers" | "service-providers" | "buyers")}
                    className="p-4 sm:p-6 rounded-xl border bg-card hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 ${role.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{role.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {role.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Step 2: Registration Forms */}
          {selectedUserType === "makers" && (
            <MakerRegistrationForm onBack={handleBack} />
          )}
          {selectedUserType === "service-providers" && (
            <ServiceProviderRegistrationForm onBack={handleBack} />
          )}
          {selectedUserType === "buyers" && (
            <BuyerRegistrationForm onBack={handleBack} />
          )}

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[color:var(--brand)] hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
