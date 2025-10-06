import Hero from "@/components/hero";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";

export default function MakerDatabasePage() {
  return (
    <>
      <Hero title="MAKER DATABASE" subtitle="A searchable, authenticated database of artisans, maker groups and designers across India. Find profiles by craft, location, techniques, materials and certifications." />
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-3 md:sticky md:top-24 md:h-fit">
            <div className="grid gap-3">
              {[
                "Craft type",
                "Location",
                "Maker Profile",
                "Associated Artisans",
                "Languages",
                "Raw materials",
                "Product range",
                "Production capacity",
                "Women centric",
              ].map((label) => (
                <button key={label} className="h-10 rounded-full border px-4 text-left text-sm">{label}</button>
              ))}
              <Button className="rounded-full">Get Listed Here</Button>
            </div>
          </div>
          <div className="md:col-span-9">
            <div className="flex items-center gap-3 justify-end">
              <input className="h-10 rounded-full border px-4 text-sm w-64" placeholder="Search for makers" />
              <Button className="rounded-full" withArrow={false}>Search</Button>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {Array.from({ length: 9 }).map((_, i) => (
                <article key={i} className="grid gap-3">
                  <div className="aspect-[4/3] w-full rounded-xl bg-muted" />
                  <h3 className="font-medium">Dayalal Kudecha</h3>
                  <p className="text-xs text-muted-foreground">This fund supports [specific craft] and the artisans behind it. It helps preserve traditions while encouraging new ideas. Our goal is to keep the craft thriving for generations.</p>
                  <a className="text-sm underline" href="#">Know More</a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}



