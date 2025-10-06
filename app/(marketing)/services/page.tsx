import Hero from "@/components/hero";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  return (
    <>
      <Hero title="SERVICES" subtitle="A searchable, authenticated database of artisans, maker groups and designers across India. Find profiles by craft, location, techniques, materials and certifications." />

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Sticky sidebar */}
          <aside className="md:col-span-3 md:sticky md:top-24 md:h-fit">
            <nav className="flex flex-col gap-4">
              <Button asChild variant="outline" className="justify-between rounded-2xl h-12 px-5">
                <a href="#partners">Partner Websites</a>
              </Button>
              <Button asChild variant="outline" className="justify-between rounded-2xl h-12 px-5">
                <a href="#craft-care">Craft Care Fund</a>
              </Button>
              <Button asChild variant="outline" className="justify-between rounded-2xl h-12 px-5">
                <a href="#seed-fund">Seed Fund for Enterprises by</a>
              </Button>
              <Button asChild variant="outline" className="justify-between rounded-2xl h-12 px-5">
                <a href="#providers">Service Providers</a>
              </Button>
              <Button asChild variant="outline" className="justify-between rounded-2xl h-12 px-5">
                <a href="#events">Events & Exhibitions</a>
              </Button>
              <Button asChild variant="outline" className="justify-between rounded-2xl h-12 px-5">
                <a href="#retail">Retails Outlets  Supplied by CD</a>
              </Button>
              <Button asChild variant="outline" className="justify-between rounded-2xl h-12 px-5">
                <a href="#ask">Ask me anything</a>
              </Button>
            </nav>
            <div className="mt-6">
              <Button className="w-full h-12 rounded-2xl px-6">List your services here</Button>
            </div>
          </aside>

          {/* Content sections */}
          <div className="md:col-span-9">
            {/* Partner Websites */}
            <section id="partners" className="scroll-mt-24">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">PARTNER WEBSITES</h2>
                <Button asChild variant="outline" className="rounded-2xl h-11 px-6" withArrow>
                  <a href="/partner-websites">View All</a>
                </Button>
              </div>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <article key={idx}>
                    <div className="aspect-[16/10] w-full rounded-xl bg-muted"></div>
                    <h3 className="mt-6 text-lg font-medium">Creative Dignity</h3>
                    <p className="mt-2 text-muted-foreground leading-7">
                      This fund supports [specific craft] and the artisans behind it. It helps preserve traditions while
                      encouraging new ideas. Our goal is to keep the craft thriving for generations.
                    </p>
                    <a href="#" className="mt-4 inline-block underline">Visit Now</a>
                  </article>
                ))}
              </div>
            </section>

            {/* Craft Care Fund hero band */}
            <section id="craft-care" className="mt-16 scroll-mt-24">
              <div className="rounded-xl bg-muted p-8 sm:p-12 md:p-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7">
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">CRAFT CARE FUND BY CD</h2>
                    <p className="mt-6 text-muted-foreground max-w-prose leading-8">
                      This fund supports [specific craft] and the artisans behind it. It helps preserve traditions while
                      encouraging new ideas. Our goal is to keep the craft thriving for generations.
                    </p>
                    <div className="mt-8">
                      <Button asChild variant="outline" className="rounded-2xl h-12 px-6" withArrow>
                        <a href="/craft-care-fund">Know More</a>
                      </Button>
                    </div>
                  </div>
                  <div className="md:col-span-5">
                    <div className="aspect-[16/10] w-full rounded-xl bg-background/60"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Seed Care Fund - vertical grid, 3 cards per row */}
            <section id="seed-fund" className="mt-16 scroll-mt-24">
              <h3 className="text-3xl md:text-5xl font-semibold tracking-tight">SEED CARE FUND</h3>
              <div className="mt-10 max-h-[70vh] overflow-y-auto pr-2 snap-y snap-mandatory">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  { title: "Creative Dignity", slug: "creative-dignity" },
                  { title: "Rang De", slug: "rang-de" },
                  { title: "Tarasha", slug: "tarasha" },
                  { title: "Creative Dignity", slug: "creative-dignity" },
                  { title: "Rang De", slug: "rang-de" },
                  { title: "Tarasha", slug: "tarasha" },
                ].map((item, idx) => (
                  <article key={idx} className="snap-start">
                    <a href={`/seed-fund/${item.slug}`} className="block group">
                      <div className="aspect-[16/11] w-full rounded-xl bg-muted group-hover:bg-muted/80 transition-colors"></div>
                      <h4 className="mt-6 text-lg font-medium group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="mt-2 text-muted-foreground leading-7">
                        This fund supports [specific craft] and the artisans behind it. It helps preserve traditions while
                        encouraging new ideas. Our goal is to keep the craft thriving for generations.
                      </p>
                      <span className="mt-4 inline-block underline group-hover:no-underline transition-all">Visit Now</span>
                    </a>
                  </article>
                ))}
                </div>
              </div>
            </section>

            {/* Service Providers */}
            <section id="providers" className="mt-24 scroll-mt-24">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">SERVICE PROVIDERS</h2>
                <Button asChild variant="outline" className="rounded-2xl h-11 px-6" withArrow>
                  <a href="/service-providers">View All</a>
                </Button>
              </div>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <article key={idx}>
                    <div className="aspect-[16/10] w-full rounded-xl bg-muted"></div>
                    <h3 className="mt-6 text-lg font-medium">Insurance</h3>
                    <p className="mt-2 text-muted-foreground leading-7">
                      This fund supports [specific craft] and the artisans behind it. It helps preserve traditions while
                      encouraging new ideas. Our goal is to keep the craft thriving for generations.
                    </p>
                    <a href="#" className="mt-4 inline-block underline">Visit Now</a>
                  </article>
                ))}
              </div>
            </section>

            {/* Events & Exhibitions */}
            <section id="events" className="mt-24 scroll-mt-24">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">EVENTS & EXHIBITIONS</h2>
                <Button asChild variant="outline" className="rounded-2xl h-11 px-6" withArrow>
                  <a href="/events-exhibitions">View All</a>
                </Button>
              </div>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <article key={idx}>
                    <div className="aspect-[16/10] w-full rounded-xl bg-muted"></div>
                    <h3 className="mt-6 text-lg font-medium">Rajasthan Crafts Bazaar</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Jaipur — Sep 15–18, 2025 • Apply by Aug 25</p>
                    <p className="mt-2 text-muted-foreground leading-7">
                      Data is used to enable discovery, events and training. Personal contact info is shared only with consent.
                    </p>
                    <a href="#" className="mt-4 inline-block underline">Learn more</a>
                  </article>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button className="rounded-2xl h-11 px-6" withArrow>
                  View Calendar
                </Button>
                <Button variant="outline" className="rounded-2xl h-11 px-6" withArrow>
                  Submit an Event
                </Button>
              </div>
            </section>

            {/* Retail Outlets */}
            <section id="retail" className="mt-24 scroll-mt-24">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">RETAIL OUTLETS</h2>
                <Button asChild variant="outline" className="rounded-2xl h-11 px-6" withArrow>
                  <a href="/retail-outlets">View All</a>
            </Button>
              </div>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <article key={idx}>
                    <div className="aspect-[16/10] w-full rounded-xl bg-muted"></div>
                    <h3 className="mt-6 text-lg font-medium">FairKraft Creations</h3>
                    <p className="mt-2 text-muted-foreground leading-7">
                      Data is used to enable discovery, events and training. Personal contact info is shared only with consent.
                    </p>
                    <a href="#" className="mt-4 inline-block underline">Contact</a>
                  </article>
                ))}
              </div>
            </section>

            {/* Ask me anything - simple form skeleton */}
            <section id="ask" className="mt-24 scroll-mt-24">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">ASK ME ANYTHING</h2>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-sm mb-2">Enter your name</label>
                  <div className="border-b py-3" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Enter your e-mail</label>
                  <div className="border-b py-3" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Enter your contact number</label>
                  <div className="border-b py-3" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Select Type of Query</label>
                  <div className="border-b py-3" />
                </div>
              </div>
              <div className="mt-10">
                <label className="block text-sm mb-2">Write  Your Message</label>
                <div className="border-b py-12" />
              </div>
              <div className="mt-8">
                <Button className="rounded-2xl h-11 px-6" withArrow>
                  Send
                </Button>
              </div>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}



