import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Heart, Users, Award, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl text-amber-100">
            Preserving traditions, empowering artisans, celebrating craftsmanship
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">Connecting Artisans with the World</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Founded in 1995, our mission has been to create a sustainable marketplace that celebrates
                India&apos;s rich heritage of handcrafted excellence. We work directly with over 500 artisan
                communities across 25 states, ensuring fair wages and preserving traditional techniques
                that have been passed down through generations.
              </p>
              <p>
                Every product you purchase tells a story of skill, dedication, and cultural heritage.
                By choosing handcrafted items, you&apos;re not just buying a product – you&apos;re supporting
                livelihoods, preserving ancient crafts, and contributing to sustainable economic development.
              </p>
              <p>
                We believe in transparency, authenticity, and the power of traditional craftsmanship.
                Each artisan partner is carefully selected and provided with fair trade practices,
                ensuring their work receives the recognition and compensation it deserves.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/5650003/pexels-photo-5650003.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Artisan at work"
              className="rounded-lg shadow-2xl w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <Card className="text-center border-amber-200 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-3xl font-bold text-amber-600 mb-2">500+</h3>
              <p className="text-gray-600">Artisan Communities</p>
            </CardContent>
          </Card>
          <Card className="text-center border-amber-200 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-3xl font-bold text-amber-600 mb-2">50,000+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </CardContent>
          </Card>
          <Card className="text-center border-amber-200 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-3xl font-bold text-amber-600 mb-2">25</h3>
              <p className="text-gray-600">States Covered</p>
            </CardContent>
          </Card>
          <Card className="text-center border-amber-200 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-3xl font-bold text-amber-600 mb-2">28</h3>
              <p className="text-gray-600">Years of Impact</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-3 text-amber-600">Authenticity</h3>
              <p className="text-gray-700">
                Every product is genuinely handcrafted using traditional techniques.
                We verify the authenticity and origin of each item.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-amber-600">Fair Trade</h3>
              <p className="text-gray-700">
                Artisans receive fair compensation for their work, ensuring sustainable
                livelihoods and economic empowerment.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-amber-600">Sustainability</h3>
              <p className="text-gray-700">
                We promote eco-friendly practices and support traditional methods that
                are inherently sustainable.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative order-2 lg:order-1">
            <img
              src="https://images.pexels.com/photos/5650095/pexels-photo-5650095.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Artisan community"
              className="rounded-lg shadow-2xl w-full"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold mb-6">Our Impact</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold mb-2">Economic Empowerment</h3>
                  <p className="text-gray-700">
                    Provided sustainable income to over 10,000 artisan families, enabling
                    access to education and healthcare.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold mb-2">Skill Preservation</h3>
                  <p className="text-gray-700">
                    Documented and preserved 150+ traditional craft techniques through our
                    artisan training programs.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold mb-2">Community Development</h3>
                  <p className="text-gray-700">
                    Established craft centers in rural areas, creating local employment
                    opportunities and reducing migration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Every purchase makes a difference. Explore our collection and be part of preserving
            India&apos;s rich craft heritage.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" className="bg-white text-amber-600 hover:bg-amber-50">
              <Link href="/shop">Shop Handcrafted Items</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/contact-us">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
