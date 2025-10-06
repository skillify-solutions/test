"use client";

import { useState } from "react";
import Hero from "@/components/hero";
import Section from "@/components/section";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const categories = ["Category One", "Category Two", "Category Three", "Category Four"];

const blogPosts = [
  {
    id: 1,
    title: "From forest floor to future – Pine needles for material innovation and climate resilience",
    author: "Creative Dignity",
    date: "13 Mar 2025",
    excerpt: "Background Pine needles (grow as part of the pine trees) which are abundantly found on forest floors across India. These needles, often considered waste, hold immense potential for sustainable material innovation...",
    category: "Category One"
  },
  {
    id: 2,
    title: "Traditional pottery techniques in modern design",
    author: "Creative Dignity", 
    date: "10 Mar 2025",
    excerpt: "Exploring how ancient pottery methods are being adapted for contemporary applications while preserving cultural heritage...",
    category: "Category One"
  },
  {
    id: 3,
    title: "Sustainable textile practices in rural India",
    author: "Creative Dignity",
    date: "8 Mar 2025", 
    excerpt: "A deep dive into eco-friendly textile production methods being practiced by artisan communities across rural India...",
    category: "Category Two"
  },
  {
    id: 4,
    title: "Wood carving traditions and modern applications",
    author: "Creative Dignity",
    date: "5 Mar 2025",
    excerpt: "How traditional wood carving techniques are finding new relevance in contemporary furniture and art...",
    category: "Category Two"
  },
  {
    id: 5,
    title: "Digital platforms for artisan market access",
    author: "Creative Dignity",
    date: "3 Mar 2025",
    excerpt: "Exploring how technology is helping artisans reach global markets while maintaining traditional craftsmanship...",
    category: "Category Three"
  },
  {
    id: 6,
    title: "Preserving heritage through craft education",
    author: "Creative Dignity",
    date: "1 Mar 2025",
    excerpt: "The importance of passing down traditional skills to younger generations and innovative approaches to craft education...",
    category: "Category Three"
  },
  {
    id: 7,
    title: "Innovative weaving techniques in contemporary fashion",
    author: "Creative Dignity",
    date: "28 Feb 2025",
    excerpt: "Discovering how traditional weaving methods are being reinvented for modern fashion while maintaining cultural authenticity...",
    category: "Category One"
  },
  {
    id: 8,
    title: "The role of women in preserving traditional crafts",
    author: "Creative Dignity",
    date: "25 Feb 2025",
    excerpt: "Highlighting the crucial contributions of women artisans in keeping traditional crafts alive and thriving...",
    category: "Category Two"
  },
  {
    id: 9,
    title: "Sustainable materials in contemporary design",
    author: "Creative Dignity",
    date: "22 Feb 2025",
    excerpt: "Exploring eco-friendly materials and their applications in modern design practices...",
    category: "Category Three"
  },
  {
    id: 10,
    title: "Artisan cooperatives and collective growth",
    author: "Creative Dignity",
    date: "20 Feb 2025",
    excerpt: "How artisan cooperatives are transforming individual crafts into collective economic opportunities...",
    category: "Category Four"
  },
  {
    id: 11,
    title: "Traditional dyeing techniques and natural colors",
    author: "Creative Dignity",
    date: "18 Feb 2025",
    excerpt: "Reviving ancient dyeing methods using natural materials for sustainable textile production...",
    category: "Category Four"
  },
  {
    id: 12,
    title: "Craft tourism and cultural preservation",
    author: "Creative Dignity",
    date: "15 Feb 2025",
    excerpt: "How craft tourism is helping preserve traditional skills while providing economic opportunities...",
    category: "Category Four"
  },
  {
    id: 13,
    title: "Modern tools enhancing traditional craftsmanship",
    author: "Creative Dignity",
    date: "12 Feb 2025",
    excerpt: "The integration of modern technology with age-old crafting techniques for improved efficiency...",
    category: "Category One"
  },
  {
    id: 14,
    title: "Community-based craft development programs",
    author: "Creative Dignity",
    date: "10 Feb 2025",
    excerpt: "Successful community initiatives that are revitalizing local craft traditions and creating sustainable livelihoods...",
    category: "Category Two"
  },
  {
    id: 15,
    title: "The economics of handmade products",
    author: "Creative Dignity",
    date: "8 Feb 2025",
    excerpt: "Understanding the market dynamics and pricing strategies for handmade craft products...",
    category: "Category Three"
  }
];

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("Category One");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredPosts = blogPosts.filter(post => post.category === activeCategory);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <>
      <Hero title="BLOGS" subtitle="A searchable, authenticated database of artisans, maker groups and designers across India. Find profiles by craft, location, techniques, materials and certifications." />
      
      <Section>
        {/* Category Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1);
              }}
              className={`px-6 py-3 rounded text-sm font-medium transition-colors uppercase tracking-wider ${
                activeCategory === category
                  ? "bg-muted text-foreground border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {paginatedPosts.map((post, idx) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0 overflow-hidden">
                <img src={[
                  "https://images.pexels.com/photos/5650095/pexels-photo-5650095.jpeg?auto=compress&cs=tinysrgb&w=800",
                  "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=800",
                  "https://images.pexels.com/photos/5650003/pexels-photo-5650003.jpeg?auto=compress&cs=tinysrgb&w=800",
                  "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
                  "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=800",
                  "https://images.pexels.com/photos/6348119/pexels-photo-6348119.jpeg?auto=compress&cs=tinysrgb&w=800"
                ][idx % 6]} alt={post.title} className="aspect-[16/10] rounded-t w-full object-cover" />
              </CardContent>
              <CardHeader>
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors duration-200">{post.title}</CardTitle>
                <CardDescription className="text-sm">{post.author} | {post.date}</CardDescription>
                <CardDescription className="text-sm leading-relaxed">{post.excerpt}</CardDescription>
                <a href={`/blogs/${post.id}`} className="text-sm underline hover:no-underline transition-all inline-block">
                  Read Now →
                </a>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted rounded"
          >
            ←
          </button>
          
          {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-2 text-sm rounded ${
                  currentPage === pageNum
                    ? "bg-foreground text-background"
                    : "hover:bg-muted"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
          {totalPages > 3 && (
            <>
              <span className="px-2">...</span>
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="px-3 py-2 text-sm hover:bg-muted rounded"
              >
                {totalPages}
              </button>
            </>
          )}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted rounded"
          >
            →
          </button>
        </div>
      </Section>
    </>
  );
}



