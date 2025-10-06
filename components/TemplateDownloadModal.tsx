"use client";

import { useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface TemplateDownloadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TemplateDownloadModal({ open, onOpenChange }: TemplateDownloadModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (open) {
      // focus first input when opened
      const first = document.querySelector<HTMLInputElement>("#orgName");
      first?.focus();
    }
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[61] w-[90vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-background p-6 shadow-xl">
          <div className="flex items-start justify-between">
            <Dialog.Title className="text-lg font-medium">Sign Up to download this template!</Dialog.Title>
            <Dialog.Close ref={closeButtonRef} className="text-sm text-muted-foreground hover:underline">close[x]</Dialog.Close>
          </div>

          <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); onOpenChange(false); }}>
            <div>
              <Input id="orgName" placeholder="Organisation Name *" required className="h-12 rounded-xl" />
            </div>
            <div>
              <Input placeholder="Phone *" required className="h-12 rounded-xl" />
            </div>
            <div>
              <Input type="email" placeholder="Email *" required className="h-12 rounded-xl" />
            </div>
            <div>
              <Input placeholder="How many artisans would you reach with this content? *" required className="h-12 rounded-xl" />
            </div>
            <div className="pt-2">
              <Button className="w-full h-12 rounded-2xl" withArrow>Submit</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
