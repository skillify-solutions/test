import Hero from "@/components/hero";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ServicesPage() {
  return (
    <>
      <Hero title="SERVICES" subtitle="A searchable, authenticated database of artisans, maker groups and designers across India. Find profiles by craft, location, techniques, materials and certifications." />

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Sticky sidebar */}
          <aside className="md:col-span-3 md:sticky md:top-24 md:h-fit">
            <nav className="flex flex-col gap-4">
              <Button asChild variant="outline" className="justify-between rounded h-12 px-5">
                <a href="#partners">Partner Websites</a>
              </Button>
              <Button asChild variant="outline" className="justify-between rounded h-12 px-5">
                <a href="#craft-care">Craft Care Fund</a>
              </Button>
              <Button asChild variant="outline" className="justify-between rounded h-12 px-5">
                <a href="#seed-fund">Seed Fund for Enterprises by</a>
              </Button>
              <Button asChild variant="outline" className="justify-between rounded h-12 px-5">
                <a href="#providers">Service Providers</a>
              </Button>
              <Button asChild variant="outline" className="justify-between rounded h-12 px-5">
                <a href="#events">Events & Exhibitions</a>
              </Button>
              <Button asChild variant="outline" className="justify-between rounded h-12 px-5">
                <a href="#retail">Retails Outlets  Supplied by CD</a>
              </Button>
              <Button asChild variant="outline" className="justify-between rounded h-12 px-5">
                <a href="#ask">Ask me anything</a>
              </Button>
            </nav>
            <div className="mt-6">
              <Button className="w-full h-12 rounded px-6">List your services here</Button>
            </div>
          </aside>

          {/* Content sections */}
          <div className="md:col-span-9">
            {/* Partner Websites */}
            <section id="partners" className="scroll-mt-24">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">PARTNER WEBSITES</h2>
                <Button asChild variant="outline" className="rounded h-11 px-6" withArrow>
                  <a href="/partner-websites">View All</a>
                </Button>
              </div>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=800",
                  "https://images.pexels.com/photos/5650003/pexels-photo-5650003.jpeg?auto=compress&cs=tinysrgb&w=800",
                  "https://images.pexels.com/photos/5650095/pexels-photo-5650095.jpeg?auto=compress&cs=tinysrgb&w=800"
                ].map((img, idx) => (
                  <Card key={idx} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0 overflow-hidden">
                      <img src={img} alt="Partner website" className="aspect-[16/10] rounded-t w-full object-cover" />
                    </CardContent>
                    <CardHeader>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">Creative Dignity</CardTitle>
                      <CardDescription className="leading-7">
                        This fund supports specific crafts and the artisans behind it. It helps preserve traditions while
                        encouraging new ideas. Our goal is to keep the craft thriving for generations.
                      </CardDescription>
                      <a href="#" className="inline-block underline hover:no-underline transition-all text-sm">Visit Now</a>
                    </CardHeader>
                  </Card>
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
                      <Button asChild variant="outline" className="rounded h-12 px-6" withArrow>
                        <a href="/craft-care-fund">Know More</a>
                      </Button>
                    </div>
                  </div>
                  <div className="md:col-span-5">
                    <img src="https://images.pexels.com/photos/5650003/pexels-photo-5650003.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Craft Care Fund" className="aspect-[16/10] w-full rounded object-cover shadow-sm" />
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
                  <Card key={idx} className="snap-start group hover:shadow-lg transition-all duration-300">
                    <a href={`/seed-fund/${item.slug}`} className="block">
                      <CardContent className="p-0 overflow-hidden">
                        <img src={[
                          "https://images.pexels.com/photos/5650095/pexels-photo-5650095.jpeg?auto=compress&cs=tinysrgb&w=800",
                          "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=800",
                          "https://images.pexels.com/photos/5650003/pexels-photo-5650003.jpeg?auto=compress&cs=tinysrgb&w=800"
                        ][idx % 3]} alt={item.title} className="aspect-[16/11] rounded-t w-full object-cover" />
                      </CardContent>
                      <CardHeader>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">{item.title}</CardTitle>
                        <CardDescription className="leading-7">
                          This fund supports specific crafts and the artisans behind it. It helps preserve traditions while
                          encouraging new ideas. Our goal is to keep the craft thriving for generations.
                        </CardDescription>
                        <span className="inline-block underline group-hover:no-underline transition-all text-sm">Visit Now</span>
                      </CardHeader>
                    </a>
                  </Card>
                ))}
                </div>
              </div>
            </section>

            {/* Service Providers */}
            <section id="providers" className="mt-24 scroll-mt-24">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">SERVICE PROVIDERS</h2>
                <Button asChild variant="outline" className="rounded h-11 px-6" withArrow>
                  <a href="/service-providers">View All</a>
                </Button>
              </div>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  {title: "Insurance", img: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800"},
                  {title: "Legal Services", img: "https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg?auto=compress&cs=tinysrgb&w=800"},
                  {title: "Marketing", img: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"}
                ].map((service, idx) => (
                  <Card key={idx} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0 overflow-hidden">
                      <img src={service.img} alt={service.title} className="aspect-[16/10] rounded-t w-full object-cover" />
                    </CardContent>
                    <CardHeader>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">{service.title}</CardTitle>
                      <CardDescription className="leading-7">
                        This fund supports specific crafts and the artisans behind it. It helps preserve traditions while
                        encouraging new ideas. Our goal is to keep the craft thriving for generations.
                      </CardDescription>
                      <a href="#" className="inline-block underline hover:no-underline transition-all text-sm">Visit Now</a>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>

            {/* Events & Exhibitions */}
            <section id="events" className="mt-24 scroll-mt-24">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">EVENTS & EXHIBITIONS</h2>
                <Button asChild variant="outline" className="rounded h-11 px-6" withArrow>
                  <a href="/events-exhibitions">View All</a>
                </Button>
              </div>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=800",
                  "https://images.pexels.com/photos/6348119/pexels-photo-6348119.jpeg?auto=compress&cs=tinysrgb&w=800",
                  "https://images.pexels.com/photos/5650095/pexels-photo-5650095.jpeg?auto=compress&cs=tinysrgb&w=800"
                ].map((img, idx) => (
                  <Card key={idx} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0 overflow-hidden">
                      <img src={img} alt="Event" className="aspect-[16/10] rounded-t w-full object-cover" />
                    </CardContent>
                    <CardHeader>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">Rajasthan Crafts Bazaar</CardTitle>
                      <CardDescription className="text-sm">Jaipur — Sep 15–18, 2025 • Apply by Aug 25</CardDescription>
                      <CardDescription className="leading-7">
                        Data is used to enable discovery, events and training. Personal contact info is shared only with consent.
                      </CardDescription>
                      <a href="#" className="inline-block underline hover:no-underline transition-all text-sm">Learn more</a>
                    </CardHeader>
                  </Card>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button className="rounded h-11 px-6" withArrow>
                  View Calendar
                </Button>
                <Button variant="outline" className="rounded h-11 px-6" withArrow>
                  Submit an Event
                </Button>
              </div>
            </section>

            {/* Retail Outlets */}
            <section id="retail" className="mt-24 scroll-mt-24">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">RETAIL OUTLETS</h2>
                <Button asChild variant="outline" className="rounded h-11 px-6" withArrow>
                  <a href="/retail-outlets">View All</a>
            </Button>
              </div>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  "https://images.pexels.com/photos/5706712/pexels-photo-5706712.jpeg?auto=compress&cs=tinysrgb&w=800",
                  "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=800",
                  "https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?auto=compress&cs=tinysrgb&w=800"
                ].map((img, idx) => (
                  <Card key={idx} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0 overflow-hidden">
                      <img src={img} alt="Retail outlet" className="aspect-[16/10] rounded-t w-full object-cover" />
                    </CardContent>
                    <CardHeader>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">FairKraft Creations</CardTitle>
                      <CardDescription className="leading-7">
                        Data is used to enable discovery, events and training. Personal contact info is shared only with consent.
                      </CardDescription>
                      <a href="#" className="inline-block underline hover:no-underline transition-all text-sm">Contact</a>
                    </CardHeader>
                  </Card>
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
                <Button className="rounded h-11 px-6" withArrow>
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



