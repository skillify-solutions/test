import Hero from "@/components/hero";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <>
      <Hero
        title="ABOUT ARTISAN"
        subtitle="A searchable, authenticated database of artisans, maker groups and designers across India. Find profiles by craft, location, techniques, materials and certifications."
      />

      {/* Main content with left sidebar */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Sidebar */}
          <aside className="md:col-span-3 md:sticky md:top-24 md:h-fit">
            <nav className="flex flex-col gap-4">
              <Button asChild variant="outline" className="justify-between rounded-2xl h-12 px-5">
                <a href="#why">Why Artisan</a>
              </Button>
              <Button asChild variant="outline" className="justify-between rounded-2xl h-12 px-5">
                <a href="#mission">Mission</a>
              </Button>
              <Button asChild variant="outline" className="justify-between rounded-2xl h-12 px-5">
                <a href="#vision">Vision</a>
              </Button>
              <Button asChild variant="outline" className="justify-between rounded-2xl h-12 px-5">
                <a href="#team">Our Team</a>
              </Button>
              <Button asChild variant="outline" className="justify-between rounded-2xl h-12 px-5">
                <a href="#partners">Partners & Collaborators</a>
              </Button>
            </nav>
            <div className="mt-6">
              <Button asChild className="w-full h-12 rounded-2xl px-6">
                <a href="/contact-us">Contact Us</a>
              </Button>
            </div>
          </aside>

          {/* Content */}
          <div className="md:col-span-9">
            {/* WHY section */}
            <section id="why">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">WHY ARTISAN</h2>
              <p className="mt-6 text-muted-foreground leading-8 max-w-4xl">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque
                corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
                distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime
                placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut
                officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
                Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat.
              </p>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"></div>
            </section>

            {/* Mission + Vision side-by-side */}
            <section id="mission" className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-3xl md:text-5xl font-semibold tracking-tight">MISSON</h3>
                <p className="mt-6 text-muted-foreground leading-8">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque
                  corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                  qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Eum rerum quidem facilis est et expedita
                  distinctio.
                </p>
              </div>
              <div id="vision">
                <h3 className="text-3xl md:text-5xl font-semibold tracking-tight">VISION</h3>
                <p className="mt-6 text-muted-foreground leading-8">
                  Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat
                  facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis
                  debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint.
                </p>
              </div>
            </section>

            {/* Team */}
            <section id="team" className="mt-20">
              <h3 className="text-3xl md:text-5xl font-semibold tracking-tight">OUR TEAM</h3>
              <div className="mt-8 rounded-xl bg-muted aspect-[16/6]"></div>
              <p className="mt-4 text-center italic text-muted-foreground">
                At vero eos et accusamus et iusto odio dignissimos ducimus
              </p>
            </section>

            {/* Partners */}
            <section id="partners" className="mt-20">
              <h3 className="text-3xl md:text-5xl font-semibold tracking-tight">OUR PARTNERS & COLLABORATORS</h3>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6"></div>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}



