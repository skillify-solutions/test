import Hero from "@/components/hero";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SeedFundPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const seedFundData = {
  "creative-dignity": {
    title: "Creative Dignity",
    description: "A comprehensive fund supporting traditional crafts and artisans across India. We focus on preserving heritage while encouraging innovation and sustainable practices.",
    story: "Creative Dignity has been working with artisans for over a decade, supporting traditional crafts and helping them adapt to modern markets while maintaining their cultural authenticity.",
    details: {
      "Fund Type": "Craft Development",
      "Established": "2015",
      "Focus Areas": "Textiles, Pottery, Woodwork",
      "Geographic Coverage": "Pan India",
      "Beneficiaries": "500+ Artisans",
      "Investment Range": "₹50,000 - ₹5,00,000"
    }
  },
  "rang-de": {
    title: "Rang De",
    description: "Empowering artisans through micro-finance and skill development programs. We believe in the power of traditional crafts to create sustainable livelihoods.",
    story: "Rang De connects investors with artisans, providing them with the financial support needed to grow their businesses while preserving traditional techniques.",
    details: {
      "Fund Type": "Micro-finance",
      "Established": "2008",
      "Focus Areas": "Handicrafts, Textiles",
      "Geographic Coverage": "Rural India",
      "Beneficiaries": "1000+ Artisans",
      "Investment Range": "₹10,000 - ₹1,00,000"
    }
  },
  "tarasha": {
    title: "Tarasha",
    description: "Supporting women artisans and their families through craft-based entrepreneurship programs and market access initiatives.",
    story: "Tarasha focuses on empowering women artisans by providing them with business skills, market connections, and financial support to build sustainable enterprises.",
    details: {
      "Fund Type": "Women Empowerment",
      "Established": "2020",
      "Focus Areas": "Textiles, Jewelry, Home Decor",
      "Geographic Coverage": "North & Central India",
      "Beneficiaries": "300+ Women Artisans",
      "Investment Range": "₹25,000 - ₹2,00,000"
    }
  }
};

export default async function SeedFundPage({ params }: SeedFundPageProps) {
  const { slug } = await params;
  const fund = seedFundData[slug as keyof typeof seedFundData];
  
  if (!fund) {
    return (
      <>
        <Hero title="Fund Not Found" subtitle="The requested fund could not be found." />
        <Section>
          <div className="text-center">
            <p className="text-muted-foreground">Please check the URL and try again.</p>
            <Button asChild className="mt-4">
              <a href="/services">Back to Services</a>
            </Button>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <Hero title={fund.title} subtitle={fund.description} />
      
      <Section>
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <li>→</li>
            <li><Link href="/services" className="hover:text-foreground">Services</Link></li>
            <li>→</li>
            <li><Link href="/services#seed-fund" className="hover:text-foreground">Seed Care Fund</Link></li>
            <li>→</li>
            <li className="text-foreground">{fund.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Main content */}
          <div className="md:col-span-8">
            {/* Story section */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">Story</h2>
              <p className="text-muted-foreground leading-8 text-lg">{fund.story}</p>
            </section>

            {/* Fund details */}
            <section className="mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">Fund Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(fund.details).map(([key, value]) => (
                  <div key={key} className="border-b pb-4">
                    <dt className="font-medium text-foreground">{key}</dt>
                    <dd className="text-muted-foreground mt-1">{value}</dd>
                  </div>
                ))}
              </div>
            </section>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
              <Button className="rounded-2xl h-12 px-6" withArrow>
                Apply for Funding
              </Button>
              <Button variant="outline" className="rounded-2xl h-12 px-6" withArrow>
                Learn More
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="md:col-span-4">
            <div className="sticky top-24">
              <div className="rounded-xl bg-muted p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Contact</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start rounded-2xl h-12 px-5">
                    📧 Email Us
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-2xl h-12 px-5">
                    📞 Call Us
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-2xl h-12 px-5">
                    💬 WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
