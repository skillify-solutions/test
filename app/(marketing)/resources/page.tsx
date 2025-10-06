import Hero from "@/components/hero";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import DownloadLink from "@/components/DownloadLink";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ResourcesPage() {
  return (
    <>
      <Hero title="RESOURCES" subtitle="A searchable, authenticated database of artisans, maker groups and designers across India. Find profiles by craft, location, techniques, materials and certifications." />

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Sidebar */}
          <aside className="md:col-span-3 md:sticky md:top-24 md:h-fit">
            <nav className="flex flex-col gap-4">
              <Button asChild variant="outline" className="justify-between rounded h-12 px-5">
                <a href="#templates">Downloadable Templates</a>
              </Button>
              <Button asChild variant="outline" className="justify-between rounded h-12 px-5">
                <a href="#ama">Ask Me Anything</a>
              </Button>
            </nav>
          </aside>

          {/* Content */}
          <div className="md:col-span-9">
            {/* Downloadable templates */}
            <section id="templates" className="scroll-mt-24">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">DOWNLOADABLE TEMPLATES</h2>
                <Button asChild variant="outline" className="rounded h-11 px-6" withArrow>
                  <a href="/resources/downloadable-templates">View All</a>
                </Button>
              </div>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=800",
                  "https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=800",
                  "https://images.pexels.com/photos/6238196/pexels-photo-6238196.jpeg?auto=compress&cs=tinysrgb&w=800"
                ].map((img, idx) => (
                  <Card key={idx} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0 overflow-hidden">
                      <img src={img} alt={`Template ${idx + 1}`} className="aspect-[16/10] rounded-t w-full object-cover" />
                    </CardContent>
                    <CardHeader>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">Template {idx + 1}</CardTitle>
                      <CardDescription className="leading-7">
                        This fund supports specific crafts and the artisans behind it. It helps preserve traditions while
                        encouraging new ideas. Our goal is to keep the craft thriving for generations.
                      </CardDescription>
                      <div className="inline-block"><DownloadLink /></div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>

            {/* Ask Me Anything */}
            <section id="ama" className="mt-24 scroll-mt-24">
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



