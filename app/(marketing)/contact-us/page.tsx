"use client";
import Hero from "@/components/hero";
import Section from "@/components/section";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const disabled = !form.name || !form.email;
  return (
    <>
      <Hero title="CONTACT US" subtitle="A searchable, authenticated database of artisans, maker groups and designers across India. Find profiles by craft, location, techniques, materials and certifications." />
      <Section>
        <div className="rounded-xl bg-muted p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left content */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Get in touch</h2>
              <p className="mt-4 text-muted-foreground max-w-prose">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque
                corrupti quos dolores.
              </p>

              <div className="mt-8 space-y-6 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-[color:var(--brand)]">✉️</span>
                  <span>contact@artisan.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[color:var(--brand)]">🏠</span>
                  <span>Lorem ipsum dolor sit amet consectetur. Lake Leonardchester</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[color:var(--brand)]">📞</span>
                  <span>+91 8723092393</span>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="lg:col-span-7">
              <form className="grid gap-4">
                <input className="h-12 rounded-xl border px-4" placeholder="Name*" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
                <input className="h-12 rounded-xl border px-4" placeholder="Phone*" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} />
                <input className="h-12 rounded-xl border px-4" placeholder="Email*" type="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
                <textarea className="min-h-40 rounded-xl border p-4" placeholder="Message" value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})} />
                <div>
                  <Button className="rounded-2xl h-12 px-6" disabled={disabled} withArrow>Submit</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}



