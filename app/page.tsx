"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, TrendingUp, Award, Users } from "lucide-react";

const featuredProducts = [
  {
    id: 1,
    name: "Handwoven Silk Scarf",
    price: 2499,
    originalPrice: 3499,
    image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Textiles",
    rating: 4.8,
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Blue Pottery Bowl",
    price: 1899,
    image: "https://images.pexels.com/photos/5706712/pexels-photo-5706712.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Pottery",
    rating: 4.9,
    badge: null
  },
  {
    id: 3,
    name: "Brass Wall Hanging",
    price: 3299,
    originalPrice: 4299,
    image: "https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Metal Craft",
    rating: 4.7,
    badge: "New"
  },
  {
    id: 4,
    name: "Embroidered Cushion",
    price: 899,
    originalPrice: 1299,
    image: "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Textiles",
    rating: 4.6,
    badge: "Sale"
  }
];

const categories = [
  {
    name: "Textiles & Fabrics",
    image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: "150+ Items"
  },
  {
    name: "Pottery & Ceramics",
    image: "https://images.pexels.com/photos/5706712/pexels-photo-5706712.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: "80+ Items"
  },
  {
    name: "Metal Crafts",
    image: "https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: "120+ Items"
  },
  {
    name: "Woodwork",
    image: "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=600",
    count: "95+ Items"
  }
];

export default function Home() {
  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5650095/pexels-photo-5650095.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-white text-amber-600 hover:bg-white">Authentic Handcrafted Products</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover the Beauty of Indian Handicrafts
            </h1>
            <p className="text-xl text-amber-100 mb-8 leading-relaxed">
              Shop directly from artisans across India. Every purchase preserves traditional crafts and supports sustainable livelihoods.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button asChild size="lg" className="bg-white text-amber-600 hover:bg-amber-50 h-12 px-8">
                <Link href="/shop">Shop Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-12 px-8">
                <Link href="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="text-center border-amber-200 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">100% Authentic</h3>
              <p className="text-gray-600">Verified handcrafted products from skilled artisans</p>
            </CardContent>
          </Card>
          <Card className="text-center border-amber-200 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Fair Trade</h3>
              <p className="text-gray-600">Direct support to artisan communities nationwide</p>
            </CardContent>
          </Card>
          <Card className="text-center border-amber-200 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">Premium craftsmanship with easy returns</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
              <p className="text-gray-600">Explore our curated collection of handcrafted treasures</p>
            </div>
            <Button asChild variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
              <Link href="/shop">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link href="/shop" key={index} className="group">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-bold mb-1">{category.name}</h3>
                      <p className="text-sm text-amber-200">{category.count}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray-600">Handpicked favorites from our artisan partners</p>
            </div>
            <Button asChild variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
              <Link href="/shop">View All Products</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.badge && (
                    <Badge className={`absolute top-4 left-4 ${
                      product.badge === 'Sale' ? 'bg-red-600' :
                      product.badge === 'New' ? 'bg-green-600' :
                      'bg-amber-600'
                    }`}>
                      {product.badge}
                    </Badge>
                  )}
                  <button className="absolute top-4 right-4 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-amber-600 hover:text-white">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <CardContent className="p-6">
                  <p className="text-xs text-amber-600 font-semibold mb-1">{product.category}</p>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-1 group-hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button asChild className="flex-1 bg-amber-600 hover:bg-amber-700">
                      <Link href={`/shop/${product.id}`}>View Details</Link>
                    </Button>
                    <Button variant="outline" size="icon" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                      <ShoppingCart className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-12 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Meet Our Artisans</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Every product tells a story. Behind each handcrafted item is a skilled artisan preserving centuries-old traditions. When you shop with us, you&apos;re directly supporting their craft and helping preserve India&apos;s cultural heritage.
              </p>
              <Button asChild className="bg-amber-600 hover:bg-amber-700">
                <Link href="/about">Learn More About Our Impact</Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/5650003/pexels-photo-5650003.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Artisan at work"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Latest Blog</CardTitle>
              <CardDescription>Insights from the world of handicrafts</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src="https://images.pexels.com/photos/5650095/pexels-photo-5650095.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Blog post"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold mb-2">The Art of Hand Block Printing</h3>
              <p className="text-sm text-gray-600 mb-4">Discover the centuries-old technique that creates stunning textile patterns...</p>
              <Button asChild variant="link" className="text-amber-600 px-0">
                <Link href="/blogs">Read More →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Join us at craft exhibitions</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src="https://images.pexels.com/photos/6348119/pexels-photo-6348119.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Event"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold mb-2">Jaipur Handicraft Fair 2025</h3>
              <p className="text-sm text-gray-600 mb-4">Meet artisans and explore exclusive collections at India&apos;s largest craft fair...</p>
              <Button asChild variant="link" className="text-amber-600 px-0">
                <Link href="/events-exhibitions">View Events →</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Newsletter</CardTitle>
              <CardDescription>Stay updated with new arrivals</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Subscribe to receive exclusive offers, artisan stories, and updates on new handcrafted collections.
              </p>
              <Button asChild className="w-full bg-amber-600 hover:bg-amber-700">
                <Link href="/contact-us">Subscribe Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
