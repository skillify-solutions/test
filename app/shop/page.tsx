"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ShoppingCart, Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Handwoven Silk Scarf",
    price: 2499,
    originalPrice: 3499,
    image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Textiles",
    artisan: "Lakshmi Weaving Co.",
    rating: 4.8,
    reviews: 124,
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Blue Pottery Bowl",
    price: 1899,
    originalPrice: null,
    image: "https://images.pexels.com/photos/5706712/pexels-photo-5706712.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Pottery",
    artisan: "Jaipur Pottery Guild",
    rating: 4.9,
    reviews: 89,
    badge: null
  },
  {
    id: 3,
    name: "Brass Wall Hanging",
    price: 3299,
    originalPrice: 4299,
    image: "https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Metal Craft",
    artisan: "Moradabad Metal Works",
    rating: 4.7,
    reviews: 56,
    badge: "New Arrival"
  },
  {
    id: 4,
    name: "Embroidered Cushion Cover",
    price: 899,
    originalPrice: 1299,
    image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Textiles",
    artisan: "Kashmir Embroidery Co.",
    rating: 4.6,
    reviews: 203,
    badge: "Sale"
  },
  {
    id: 5,
    name: "Wooden Carved Box",
    price: 1599,
    originalPrice: null,
    image: "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Woodwork",
    artisan: "Saharanpur Carvers",
    rating: 4.8,
    reviews: 78,
    badge: null
  },
  {
    id: 6,
    name: "Hand-painted Terracotta Vase",
    price: 2199,
    originalPrice: 2899,
    image: "https://images.pexels.com/photos/5706712/pexels-photo-5706712.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Pottery",
    artisan: "Tribal Art Collective",
    rating: 4.9,
    reviews: 145,
    badge: "Bestseller"
  },
  {
    id: 7,
    name: "Handloom Cotton Stole",
    price: 1299,
    originalPrice: null,
    image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Textiles",
    artisan: "Maheshwar Handloom",
    rating: 4.7,
    reviews: 167,
    badge: null
  },
  {
    id: 8,
    name: "Dhokra Art Figurine",
    price: 4599,
    originalPrice: null,
    image: "https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Metal Craft",
    artisan: "Bastar Tribal Art",
    rating: 5.0,
    reviews: 42,
    badge: "New Arrival"
  }
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Handcrafted Treasures</h1>
          <p className="text-lg text-amber-100 max-w-2xl">
            Discover authentic handmade products crafted by skilled artisans from across India
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="textiles">Textiles</SelectItem>
                <SelectItem value="pottery">Pottery</SelectItem>
                <SelectItem value="metal">Metal Craft</SelectItem>
                <SelectItem value="woodwork">Woodwork</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
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
                    product.badge === 'New Arrival' ? 'bg-green-600' :
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
                <p className="text-sm text-gray-600 mb-3">{product.artisan}</p>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex gap-2">
                <Button asChild className="flex-1 bg-amber-600 hover:bg-amber-700">
                  <Link href={`/shop/${product.id}`}>View Details</Link>
                </Button>
                <Button variant="outline" size="icon" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                  <ShoppingCart className="w-5 h-5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex gap-2">
            <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
              Previous
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700">1</Button>
            <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">2</Button>
            <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">3</Button>
            <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
