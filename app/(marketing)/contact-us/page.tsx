"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const disabled = !form.name || !form.email;

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-amber-100 max-w-2xl">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-amber-200 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-bold mb-2">Email Us</h3>
              <p className="text-sm text-gray-600 mb-2">Get in touch via email</p>
              <a href="mailto:contact@artisan.com" className="text-amber-600 hover:text-amber-700 font-medium">
                contact@artisan.com
              </a>
            </CardContent>
          </Card>

          <Card className="border-amber-200 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-bold mb-2">Call Us</h3>
              <p className="text-sm text-gray-600 mb-2">Mon-Sat, 10AM-6PM IST</p>
              <a href="tel:+918723092393" className="text-amber-600 hover:text-amber-700 font-medium">
                +91 87230 92393
              </a>
            </CardContent>
          </Card>

          <Card className="border-amber-200 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-bold mb-2">Visit Us</h3>
              <p className="text-sm text-gray-600">
                123 Craft Street, Artisan District<br />New Delhi, India - 110001
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e)=>setForm({...form, name:e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={(e)=>setForm({...form, phone:e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address *</label>
                <input
                  className="w-full h-12 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter your email"
                  type="email"
                  value={form.email}
                  onChange={(e)=>setForm({...form, email:e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  className="w-full min-h-32 rounded-lg border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Tell us how we can help you..."
                  value={form.message}
                  onChange={(e)=>setForm({...form, message:e.target.value})}
                />
              </div>
              <Button
                className="bg-amber-600 hover:bg-amber-700 h-12 px-8"
                disabled={disabled}
              >
                Send Message
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">What are your shipping times?</h3>
                <p className="text-gray-600">We typically ship orders within 2-3 business days. Delivery takes 5-7 days for metro cities and 7-10 days for other locations.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Do you ship internationally?</h3>
                <p className="text-gray-600">Yes, we ship to most countries worldwide. International shipping costs are calculated at checkout based on destination.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What is your return policy?</h3>
                <p className="text-gray-600">We offer a 7-day return policy for most items. Products must be in original condition with tags attached.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How can I become an artisan partner?</h3>
                <p className="text-gray-600">We&apos;re always looking to collaborate with skilled artisans. Please email us with your portfolio and craft details at partners@artisan.com</p>
              </div>
            </div>

            <Card className="mt-8 bg-amber-50 border-amber-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Business Hours</h3>
                    <p className="text-sm text-gray-700">
                      Monday - Saturday: 10:00 AM - 6:00 PM IST<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}



