"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Hero from "@/components/hero";
import Section from "@/components/section";

export default function Home() {
  const [activeTab, setActiveTab] = useState("maker");
  return (
    <>
      {/* Hero */}
      <Hero
        kickerTitle="hosted by"
        kickerSubtitle="Creative Dignity"
        title="A living map of India's handmade ecosystem — connecting artisans, designers, buyers, service providers and all related stakeholders."
        subtitle="Artisan amplifies visibility for India's handmade ecosystem, fixes data gaps, and creates short pathways to markets."
      />

      {/* Stats strip (with intro paragraph above like in mockup) */}
      <Section className="pt-8">
        <p className="mx-auto max-w-3xl text-center text-sm text-muted-foreground">
          Artisan amplifies visibility for India&apos;s handmade ecosystem, fixes data gaps, and creates short pathways to
          markets. The platform is designed to preserve craft knowledge, improve livelihoods and protect authenticity —
          combining digital tools with our partners’ field teams who support outreach, training and market integration.
        </p>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-center">
          {[
            ["1,250+", "ARTISAN PROFILES"],
            ["750+", "BUYER PROFILES"],
            ["18", "DISTRICTS"],
            ["1,300+", "CRAFTS MAPPED"],
            ["120+", "EVENTS LISTED"],
          ].map(([num, label]) => (
            <div key={label as string} className="grid gap-1">
              <div className="text-3xl font-semibold tracking-tight">{num}</div>
              <div className="text-xs tracking-wide text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* The community behind the platform */}
      <Section>
        <h2 className="text-[22px] font-semibold tracking-tight">THE COMMUNITY BEHIND THE PLATFORM</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-3">
            <ul className="grid text-[20px] leading-7">
              <li className="border-b">
                <button 
                  onClick={() => setActiveTab("maker")}
                  className={`w-full flex items-center justify-between text-left py-4 font-medium ${
                    activeTab === "maker" ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  Maker
                  {activeTab === "maker" && <span className="text-sm">→</span>}
                </button>
              </li>
              <li className="border-b">
                <button 
                  onClick={() => setActiveTab("market")}
                  className={`w-full text-left py-4 ${
                    activeTab === "market" ? "font-medium text-foreground" : "text-muted-foreground"
                  }`}
                >
                  Market Channel
                  {activeTab === "market" && <span className="text-sm ml-2">→</span>}
                </button>
              </li>
              <li className="border-b">
                <button 
                  onClick={() => setActiveTab("design")}
                  className={`w-full text-left py-4 ${
                    activeTab === "design" ? "font-medium text-foreground" : "text-muted-foreground"
                  }`}
                >
                  Design Consultant
                  {activeTab === "design" && <span className="text-sm ml-2">→</span>}
                </button>
              </li>
            </ul>
          </div>
          <div className="md:col-span-6">
            {activeTab === "maker" && (
              <>
                <p className="text-[15px] leading-7 text-muted-foreground max-w-[46ch]">
                  A searchable, authenticated database of artisans, maker groups and handmade enterprises across India. Find profiles
                  by craft, location, techniques, materials and certifications. Each profile lists capability, product samples,
                  contact options and verification status so buyers and designers can connect with confidence.
                </p>
                <div className="mt-8 flex gap-4">
                  <Button asChild className="h-10 rounded-full px-6">
                    <Link href="/maker-database">Explore Database</Link>
                  </Button>
                  <Button asChild variant="outline" className="h-10 rounded-full px-6">
                    <Link href="/contact-us">Sign up as an artisan</Link>
                  </Button>
                </div>
              </>
            )}
            
            {activeTab === "market" && (
              <>
                <p className="text-[15px] leading-7 text-muted-foreground max-w-[46ch]">
                  Connect with retail outlets, e-commerce platforms, and distribution channels that specialize in handmade products. 
                  Find verified market channels that understand the value of authentic craftsmanship and provide fair opportunities 
                  for artisans to reach broader audiences.
                </p>
                <div className="mt-8 flex gap-4">
                  <Button asChild className="h-10 rounded-full px-6">
                    <Link href="/retail-outlets">Explore Market Channels</Link>
                  </Button>
                  <Button asChild variant="outline" className="h-10 rounded-full px-6">
                    <Link href="/contact-us">List your channel</Link>
                  </Button>
                </div>
              </>
            )}
            
            {activeTab === "design" && (
              <>
                <p className="text-[15px] leading-7 text-muted-foreground max-w-[46ch]">
                  Access design consultants and creative professionals who specialize in traditional crafts and contemporary design. 
                  Connect with experts who can help bridge traditional techniques with modern aesthetics, providing guidance on 
                  product development, market positioning, and design innovation.
                </p>
                <div className="mt-8 flex gap-4">
                  <Button asChild className="h-10 rounded-full px-6">
                    <Link href="/service-providers">Find Design Consultants</Link>
                  </Button>
                  <Button asChild variant="outline" className="h-10 rounded-full px-6">
                    <Link href="/contact-us">Offer your services</Link>
                  </Button>
                </div>
              </>
            )}
          </div>
          <div className="md:col-span-3">
            <img src="/images/product-new.png" alt="Community showcase" className="aspect-[3/4] rounded-xl w-full object-cover" />
          </div>
        </div>
      </Section>

      {/* Partners strip */}
      <Section>
        <h2 className="text-sm font-semibold tracking-wider">OUR PARTNERS & COLLABORATORS</h2>
        <div className="mt-6 flex items-center gap-4 overflow-x-auto p-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="shrink-0 w-28">
              <CardContent className="p-4">
                <img src="/images/logo-new.png" alt="Partner logo" className="h-10 w-full rounded-md object-contain" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4">
          <Select>
            <SelectTrigger className="h-10 w-56">
              <SelectValue placeholder="See All Partners" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">See All Partners</SelectItem>
              <SelectItem value="government">Government</SelectItem>
              <SelectItem value="ngos">NGOs</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Section>

      {/* Events & Exhibitions */}
      <Section>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wider">EVENTS & EXHIBITIONS</h2>
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link href="/events-exhibitions">View All Events</Link>
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-0">
                <img src="/images/product-new.png" alt="Event" className="aspect-[4/3] rounded-t-2xl w-full object-cover" />
              </CardContent>
              <CardHeader>
                <CardTitle className="text-sm">Rajasthan Crafts Bazaar</CardTitle>
                <CardDescription className="text-xs">Jaipur — Sep 5–8, 2025 • Apply by Aug 25</CardDescription>
              </CardHeader>
              <div className="px-6 pb-4">
                <Badge variant="secondary">Exhibition</Badge>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <Button asChild variant="default"><Link href="/events-exhibitions">View All Events</Link></Button>
          <Button asChild variant="outline"><Link href="/contact-us">Submit an Event</Link></Button>
        </div>
      </Section>

      {/* How to use the platform — and safeguards */}
      <Section>
        <h2 className="text-sm font-semibold tracking-wider">HOW TO USE THE PLATFORM — AND SAFEGUARDS</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            ["How is authenticity verified?", "Verification combines field validation, community references and documentation where available. Badges: Verified Artisan, Community Verified."],
            ["Who can create a profile?", "Profiles can be created by artisans or registered groups. Creative Dignity provides assisted onboarding and field verifiers where authorised."],
            ["How is data used?", "Data is used to enable discovery, outreach and training. Personal contact info is shared only with consent."],
          ].map(([title, desc]) => (
            <div key={title as string} className="grid gap-2">
              <h3 className="text-sm font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <Button asChild variant="default"><Link href="/resources">Read Full Guidelines</Link></Button>
          <Button asChild variant="outline"><Link href="/contact-us">Report An Issue</Link></Button>
        </div>
      </Section>

      {/* Retail outlets */}
      <Section>
        <h2 className="text-sm font-semibold tracking-wider">RETAIL OUTLETS</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-0">
                <img src="/images/product-new.png" alt="Retail Outlet" className="aspect-[4/3] rounded-t-2xl w-full object-cover" />
              </CardContent>
              <CardHeader>
                <CardTitle className="text-sm">FairKraft Creations</CardTitle>
                <CardDescription className="text-xs">Data is used to enable discovery, events and training. Personal contact info is shared only with consent.</CardDescription>
              </CardHeader>
              <div className="px-6 pb-4">
                <Badge variant="secondary">Retail</Badge>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <Button asChild variant="default"><Link href="/retail-outlets">View All Retail Outlets</Link></Button>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <h2 className="text-sm font-semibold tracking-wider">TESTIMONIALS</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <blockquote className="md:col-span-7 text-sm text-muted-foreground">
            Creative Dignity hume aaj ke samay digital duniya se jodta hai aur is digital world me ek dusre se jodta hai. (CD connects us to today’s digital world and connects us to each other here.)
            <footer className="mt-3 text-foreground">- Vankar Jagdish</footer>
          </blockquote>
          <div className="md:col-span-5">
            <img src="/images/product-new.png" alt="Testimonial" className="aspect-[16/10] rounded-xl w-full object-cover" />
          </div>
        </div>
      </Section>
    </>
  );
}
