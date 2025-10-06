import Hero from "@/components/hero";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RetailOutletsPage() {
  const retailOutlets = [
    {
      title: "FairKraft Creations",
      description: "Data is used to enable discovery, events and training. Personal contact info is shared only with consent.",
    },
    {
      title: "The KaleNele Store",
      description: "Data is used to enable discovery, events and training. Personal contact info is shared only with consent.",
    },
    {
      title: "Tvami handicrafts pvt ltd",
      description: "Data is used to enable discovery, events and training. Personal contact info is shared only with consent.",
    },
    {
      title: "Artisan's Haven",
      description: "Data is used to enable discovery, events and training. Personal contact info is shared only with consent.",
    },
    {
      title: "Crafts of India",
      description: "Data is used to enable discovery, events and training. Personal contact info is shared only with consent.",
    },
    {
      title: "Heritage Handlooms",
      description: "Data is used to enable discovery, events and training. Personal contact info is shared only with consent.",
    },
  ];

  return (
    <>
      <Hero title="RETAIL OUTLETS" subtitle="A searchable, authenticated database of artisans, maker groups and designers across India. Find profiles by craft, location, techniques, materials and certifications." />
      
      <Section>
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <li>→</li>
            <li><Link href="/services" className="hover:text-foreground">Services</Link></li>
            <li>→</li>
            <li className="text-foreground">Retail Outlets</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Left Sidebar */}
          <aside className="md:col-span-3 md:sticky md:top-24 md:h-fit">
            <nav className="flex flex-col gap-4">
              {/* Location Dropdown */}
              <div className="relative">
                <select className="inline-flex items-center justify-between whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-transparent hover:bg-muted py-2 rounded-2xl h-12 px-5 w-full appearance-none">
                  <option value="">Location</option>
                  <option value="pune">Pune</option>
                  <option value="jaipur">Jaipur</option>
                  <option value="delhi">Delhi</option>
                </select>
                <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">↓</span>
              </div>
              {/* Type Dropdown */}
              <div className="relative">
                <select className="inline-flex items-center justify-between whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-transparent hover:bg-muted py-2 rounded-2xl h-12 px-5 w-full appearance-none">
                  <option value="">Type</option>
                  <option value="handicrafts">Handicrafts</option>
                  <option value="textiles">Textiles</option>
                  <option value="pottery">Pottery</option>
                </select>
                <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">↓</span>
              </div>
            </nav>
            <div className="mt-6">
              <Button asChild className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-foreground text-background hover:brightness-95 py-2 after:ml-2 after:content-['→'] w-full h-12 rounded-2xl px-6">
                <a href="/list-your-outlet">List your retail outlet here</a>
              </Button>
            </div>
          </aside>

          {/* Content sections */}
          <div className="md:col-span-9">
            {/* Retail Outlets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {retailOutlets.map((outlet, idx) => (
                <article key={idx} className="flex flex-col gap-3">
                  <div className="aspect-[16/11] w-full rounded-xl bg-muted grid place-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image opacity-40"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{outlet.title}</h3>
                  <p className="text-muted-foreground text-sm">{outlet.description}</p>
                  <a href="#" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                    Contact →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}