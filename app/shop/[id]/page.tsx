"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Share2, ShoppingCart, Star, Truck, Shield, RotateCcw, Award } from "lucide-react";

const product = {
  id: 1,
  name: "Handwoven Silk Scarf",
  price: 2499,
  originalPrice: 3499,
  images: [
    "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/5706712/pexels-photo-5706712.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?auto=compress&cs=tinysrgb&w=800"
  ],
  category: "Textiles",
  artisan: {
    name: "Lakshmi Weaving Co.",
    location: "Varanasi, Uttar Pradesh",
    established: "1987",
    image: "https://images.pexels.com/photos/5650003/pexels-photo-5650003.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  rating: 4.8,
  reviews: 124,
  inStock: true,
  description: "This exquisite handwoven silk scarf is a masterpiece of traditional Indian craftsmanship. Each piece is meticulously crafted by skilled artisans using time-honored techniques passed down through generations. The rich colors and intricate patterns showcase the beauty of authentic handloom weaving.",
  features: [
    "100% Pure Mulberry Silk",
    "Hand-dyed with natural colors",
    "Traditional handloom weaving",
    "Dimensions: 200cm x 70cm",
    "Dry clean recommended"
  ],
  badge: "Bestseller"
};

const relatedProducts = [
  {
    id: 2,
    name: "Cotton Hand Block Print Stole",
    price: 1299,
    image: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.7
  },
  {
    id: 3,
    name: "Pashmina Wool Shawl",
    price: 4999,
    image: "https://images.pexels.com/photos/5706712/pexels-photo-5706712.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9
  },
  {
    id: 4,
    name: "Bandhani Dupatta",
    price: 1899,
    image: "https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6
  },
  {
    id: 5,
    name: "Ikat Silk Scarf",
    price: 2299,
    image: "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8
  }
];

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <Link href="/shop" className="text-amber-600 hover:text-amber-700 text-sm">
            ← Back to Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="mb-4 relative overflow-hidden rounded-lg">
              {product.badge && (
                <Badge className="absolute top-4 left-4 z-10 bg-amber-600 text-white">
                  {product.badge}
                </Badge>
              )}
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>
            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-1 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-amber-600' : 'border-gray-200 hover:border-amber-400'
                  }`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-24 object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4">
              <p className="text-sm text-amber-600 font-semibold mb-2">{product.category}</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </Badge>
                  </>
                )}
              </div>
              <p className={`text-sm font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
                >
                  -
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <Button className="flex-1 bg-amber-600 hover:bg-amber-700 h-12 text-lg">
                <ShoppingCart className="mr-2 w-5 h-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg">
                <Truck className="w-5 h-5 text-amber-600 mt-1" />
                <div>
                  <p className="font-semibold text-sm">Free Shipping</p>
                  <p className="text-xs text-gray-600">On orders over ₹999</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg">
                <Shield className="w-5 h-5 text-amber-600 mt-1" />
                <div>
                  <p className="font-semibold text-sm">Secure Payment</p>
                  <p className="text-xs text-gray-600">100% secure checkout</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg">
                <RotateCcw className="w-5 h-5 text-amber-600 mt-1" />
                <div>
                  <p className="font-semibold text-sm">Easy Returns</p>
                  <p className="text-xs text-gray-600">7 days return policy</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg">
                <Award className="w-5 h-5 text-amber-600 mt-1" />
                <div>
                  <p className="font-semibold text-sm">Authentic</p>
                  <p className="text-xs text-gray-600">100% handmade</p>
                </div>
              </div>
            </div>

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <img
                    src={product.artisan.image}
                    alt={product.artisan.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{product.artisan.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{product.artisan.location}</p>
                    <p className="text-xs text-gray-500">Established {product.artisan.established}</p>
                    <Button asChild variant="link" className="text-amber-600 px-0 mt-2">
                      <Link href="/artisan/1">View Artisan Profile →</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="details" className="mb-16">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Product Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="shipping" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                <div className="space-y-4 text-gray-700">
                  <p>We offer free shipping on all orders above ₹999. Orders are typically processed within 2-3 business days.</p>
                  <p><strong>Delivery Time:</strong> 5-7 business days for metro cities, 7-10 days for other locations.</p>
                  <p><strong>International Shipping:</strong> Available. Shipping costs calculated at checkout.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="font-semibold">Priya Sharma</span>
                      </div>
                      <p className="text-gray-700">Beautiful craftsmanship! The quality is outstanding and the colors are vibrant. Highly recommended!</p>
                      <p className="text-sm text-gray-500 mt-2">Verified Purchase</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div>
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Card key={item.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2 text-sm">{item.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs">{item.rating}</span>
                  </div>
                  <p className="text-lg font-bold">₹{item.price}</p>
                  <Button asChild size="sm" className="w-full mt-3 bg-amber-600 hover:bg-amber-700">
                    <Link href={`/shop/${item.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
