"use client";

import { useState } from "react";
import Hero from "@/components/hero";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EventsExhibitionsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const upcomingEvents = [
    {
      title: "SWADESHi",
      location: "Harshal hall, Pune — 10-14 Sep '25",
      description: "Data is used to enable discovery, events and training. Personal contact info is shared only with consent."
    },
    {
      title: "Rajasthan Crafts Bazaar",
      location: "Jaipur — Sep 15-18, 2025 • Apply by Aug 25",
      description: "Data is used to enable discovery, events and training. Personal contact info is shared only with consent."
    },
    {
      title: "Craft Fair Delhi",
      location: "Delhi — Oct 20-25, 2025",
      description: "Data is used to enable discovery, events and training. Personal contact info is shared only with consent."
    },
    {
      title: "Textile Exhibition Mumbai",
      location: "Mumbai — Nov 10-15, 2025",
      description: "Data is used to enable discovery, events and training. Personal contact info is shared only with consent."
    },
    {
      title: "Artisan Workshop Bangalore",
      location: "Bangalore — Dec 5-8, 2025",
      description: "Data is used to enable discovery, events and training. Personal contact info is shared only with consent."
    },
    {
      title: "Heritage Crafts Festival",
      location: "Chennai — Jan 15-20, 2026",
      description: "Data is used to enable discovery, events and training. Personal contact info is shared only with consent."
    }
  ];

  const pastEvents = [
    {
      title: "Traditional Crafts Expo",
      location: "Kolkata — Mar 10-15, 2024",
      description: "Data is used to enable discovery, events and training. Personal contact info is shared only with consent."
    },
    {
      title: "Handicrafts Fair",
      location: "Ahmedabad — Feb 5-10, 2024",
      description: "Data is used to enable discovery, events and training. Personal contact info is shared only with consent."
    },
    {
      title: "Artisan Meet",
      location: "Hyderabad — Jan 20-25, 2024",
      description: "Data is used to enable discovery, events and training. Personal contact info is shared only with consent."
    }
  ];

  return (
    <>
      <Hero title="EVENTS & EXHIBITIONS" subtitle="A searchable, authenticated database of artisans, maker groups and designers across India. Find profiles by craft, location, techniques, materials and certifications." />
      
      <Section>
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <li>→</li>
            <li><Link href="/services" className="hover:text-foreground">Services</Link></li>
            <li>→</li>
            <li className="text-foreground">Events & Exhibitions</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Sticky sidebar */}
          <aside className="md:col-span-3 md:sticky md:top-24 md:h-fit">
            <nav className="flex flex-col gap-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <div className="border rounded-xl px-4 py-3 bg-background">
                    <span className="text-muted-foreground">Select Location</span>
                    <span className="float-right">▼</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <div className="border rounded-xl px-4 py-3 bg-background">
                    <span className="text-muted-foreground">Select Date</span>
                    <span className="float-right">▼</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <div className="border rounded-xl px-4 py-3 bg-background">
                    <span className="text-muted-foreground">Select Type</span>
                    <span className="float-right">▼</span>
                  </div>
                </div>
              </div>
            </nav>
            <div className="mt-6">
              <Button className="w-full h-12 rounded-2xl px-6" withArrow>
                Submit an Event
              </Button>
            </div>
          </aside>

          {/* Content sections */}
          <div className="md:col-span-9">
            {/* Event tabs */}
            <div className="flex space-x-8 mb-8">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`text-lg font-medium pb-2 ${
                  activeTab === "upcoming"
                    ? "text-foreground border-b-2 border-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`text-lg font-medium pb-2 ${
                  activeTab === "past"
                    ? "text-foreground border-b-2 border-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Past Events
              </button>
            </div>

            {/* Event cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {(activeTab === "upcoming" ? upcomingEvents : pastEvents).map((event, i) => (
                <article key={i} className="grid gap-3">
                  <div className="aspect-[4/3] w-full rounded-xl bg-muted"></div>
                  <h3 className="text-sm font-medium">{event.title}</h3>
                  <p className="text-xs text-muted-foreground">{event.location}</p>
                  <p className="text-xs text-muted-foreground">{event.description}</p>
                  <a className="text-sm underline" href="#">Learn more</a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}