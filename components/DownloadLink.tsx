"use client";

import { useState } from "react";
import TemplateDownloadModal from "@/components/TemplateDownloadModal";

export default function DownloadLink() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a href="#" onClick={(e) => { e.preventDefault(); setOpen(true); }} className="underline">
        Download
      </a>
      <TemplateDownloadModal open={open} onOpenChange={setOpen} />
    </>
  );
}
