import Hero from "@/components/hero";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ServiceProvidersPage() {
  return (
    <>
      <Hero title="SERVICE PROVIDERS" subtitle="A searchable, authenticated database of artisans, maker groups and designers across India. Find profiles by craft, location, techniques, materials and certifications." />
      
      <Section>
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <li>→</li>
            <li><Link href="/services" className="hover:text-foreground">Services</Link></li>
            <li>→</li>
            <li className="text-foreground">Service Providers</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Sticky sidebar */}
          <aside className="md:col-span-3 md:sticky md:top-24 md:h-fit">
            <nav className="flex flex-col gap-4">
              <Button asChild variant="outline" className="justify-between rounded-2xl h-12 px-5">
                <a href="#help">Need Help?</a>
              </Button>
            </nav>
            <div className="mt-6">
              <Button className="w-full h-12 rounded-2xl px-6" withArrow>
                List your services here
              </Button>
            </div>
          </aside>

          {/* Content sections */}
          <div className="md:col-span-9">
            {/* Service Providers grid */}
            <section id="providers">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {[
                  { title: "Insurance" },
                  { title: "Design" },
                  { title: "Legal" },
                  { title: "Insurance" },
                  { title: "Design" },
                  { title: "Legal" },
                ].map((service, i) => (
                  <article key={i} className="grid gap-3">
                    <div className="aspect-[4/3] w-full rounded-xl bg-muted"></div>
                    <h3 className="text-sm font-medium">{service.title}</h3>
                    <p className="text-xs text-muted-foreground">This fund supports [specific craft] and the artisans behind it. It helps preserve traditions while encouraging new ideas. Our goal is to keep the craft thriving for generations.</p>
                    <a className="text-sm underline" href="#">Visit Now</a>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}