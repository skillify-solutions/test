import Hero from "@/components/hero";
import Section from "@/components/section";
import DownloadLink from "@/components/DownloadLink";
import Link from "next/link";

export default function DownloadableTemplatesPage() {
  return (
    <>
      <Hero title="DOWNLOADABLE TEMPLATES" subtitle="A searchable, authenticated database of artisans, maker groups and designers across India. Find profiles by craft, location, techniques, materials and certifications." />
      <Section>
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <li>→</li>
            <li><Link href="/resources" className="hover:text-foreground">Resources</Link></li>
            <li>→</li>
            <li className="text-foreground">Downloadable Templates</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {["Contract templates","Sustainability Certificates","Design Guidelines","Contract templates","Sustainability Certificates","Design Guidelines","Contract templates","Sustainability Certificates","Design Guidelines"].map((title, i) => (
            <article key={i} className="grid gap-3">
              <div className="aspect-[4/3] w-full rounded-xl bg-muted"></div>
              <h3 className="text-sm font-medium">{title}</h3>
              <p className="text-xs text-muted-foreground">This fund supports [specific craft] and the artisans behind it. It helps preserve traditions while encouraging new ideas. Our goal is to keep the craft thriving for generations.</p>
              <DownloadLink />
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}



