import Hero from "@/components/hero";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CraftCareFundPage() {
  return (
    <>
      <Hero title="CRAFT CARE FUND BY CD" subtitle="A searchable, authenticated database of artisans, maker groups and designers across India. Find profiles by craft, location, techniques, materials and certifications." />
      
      <Section>
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <li>→</li>
            <li><Link href="/services" className="hover:text-foreground">Services</Link></li>
            <li>→</li>
            <li className="text-foreground">Craft Care Fund</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Sticky sidebar */}
          <aside className="md:col-span-3 md:sticky md:top-24 md:h-fit">
            <nav className="flex flex-col gap-4">
              <Button asChild variant="outline" className="justify-between rounded-2xl h-12 px-5">
                <a href="#about">About This Fund</a>
              </Button>
              <Button asChild variant="outline" className="justify-between rounded-2xl h-12 px-5">
                <a href="#apply">How To Apply</a>
              </Button>
              <Button asChild variant="outline" className="justify-between rounded-2xl h-12 px-5">
                <a href="#help">Need Help?</a>
              </Button>
            </nav>
            <div className="mt-6">
              <Button className="w-full h-12 rounded-2xl px-6" withArrow>
                Apply Now
              </Button>
            </div>
          </aside>

          {/* Content sections */}
          <div className="md:col-span-9">
            {/* About section */}
            <section id="about" className="scroll-mt-24">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">About</h2>
              <p className="mt-6 text-muted-foreground leading-8 max-w-4xl">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque
                corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
                distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime
                placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
              </p>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-[16/9] w-full rounded-xl bg-muted"></div>
                <div className="aspect-[16/9] w-full rounded-xl bg-muted"></div>
              </div>
            </section>

            {/* How to Apply section */}
            <section id="apply" className="mt-20 scroll-mt-24">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">How to apply</h2>
              <p className="mt-6 text-muted-foreground leading-8 max-w-4xl">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque
                corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
              </p>
              
              <ul className="mt-8 space-y-4 text-muted-foreground">
                <li>• Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                <li>• Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
                <li>• Ut enim ad minim veniam, quis nostrud exercitation</li>
                <li>• Duis aute irure dolor in reprehenderit in voluptate velit</li>
                <li>• Excepteur sint occaecat cupidatat non proident</li>
              </ul>

              <div className="mt-10">
                <Button className="rounded-2xl h-12 px-6" withArrow>
                  Apply Now
                </Button>
              </div>
            </section>

            {/* Need Help section */}
            <section id="help" className="mt-20 scroll-mt-24">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Need Help?</h2>
              <p className="mt-6 text-muted-foreground leading-8 max-w-4xl">
                If you have any questions about the Craft Care Fund or need assistance with your application, please don&apos;t hesitate to reach out to our team.
              </p>
              
              <div className="mt-8">
                <Button variant="outline" className="rounded-2xl h-12 px-6" withArrow>
                  Contact Support
                </Button>
              </div>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}