import Hero from "@/components/hero";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
              <Button className="rounded">Get Listed Here</Button>
            </div>
          </div>
          <div className="md:col-span-9">
            <div className="flex items-center gap-3 justify-end">
              <input className="h-10 rounded-full border px-4 text-sm w-64" placeholder="Search for makers" />
              <Button className="rounded" withArrow={false}>Search</Button>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/5650003/pexels-photo-5650003.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/5650095/pexels-photo-5650095.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/6348119/pexels-photo-6348119.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/5706712/pexels-photo-5706712.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=800"
              ].map((img, i) => (
                <Card key={i} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0 overflow-hidden">
                    <img src={img} alt="Maker profile" className="aspect-[4/3] rounded-t w-full object-cover" />
                  </CardContent>
                  <CardHeader>
                    <CardTitle className="text-base group-hover:text-primary transition-colors duration-200">Dayalal Kudecha</CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      This fund supports specific crafts and the artisans behind it. It helps preserve traditions while encouraging new ideas. Our goal is to keep the craft thriving for generations.
                    </CardDescription>
                    <a className="text-sm underline hover:no-underline transition-all" href="#">Know More</a>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}



