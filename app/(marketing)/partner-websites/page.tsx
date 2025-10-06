import Hero from "@/components/hero";
import Section from "@/components/section";
import Link from "next/link";

export default function PartnerWebsitesPage() {
  return (
    <>
      <Hero title="PARTNER WEBSITES" subtitle="A searchable, authenticated database of artisans, maker groups and designers across India. Find profiles by craft, location, techniques, materials and certifications." />
      <Section>
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <li>→</li>
            <li><Link href="/services" className="hover:text-foreground">Services</Link></li>
            <li>→</li>
            <li className="text-foreground">Partner Websites</li>
          </ol>
        </nav>

        {/* Partner cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { title: "Creative Dignity" },
            { title: "Rang De" },
            { title: "Tarasha" },
            { title: "Creative Dignity" },
            { title: "Rang De" },
            { title: "Tarasha" },
          ].map((partner, i) => (
            <article key={i} className="grid gap-3">
              <div className="aspect-[4/3] w-full rounded-xl bg-muted"></div>
              <h3 className="text-sm font-medium">{partner.title}</h3>
              <p className="text-xs text-muted-foreground">This fund supports [specific craft] and the artisans behind it. It helps preserve traditions while encouraging new ideas. Our goal is to keep the craft thriving for generations.</p>
              <a className="text-sm underline" href="#">Visit Now</a>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}



