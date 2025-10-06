"use client";

import { useState } from "react";
import Hero from "@/components/hero";
import Section from "@/components/section";
import { Card } from "@/components/ui/card";

const communityPosts = [
  {
    id: 1,
    title: "Handcrafted Wooden Peacock",
    role: "Maker",
    author: "Dayalal Kudecha",
    date: "22 Aug 2025",
    description: "Data is used to enable discovery, events and training. Personal contact info is shared only with consent. Data is used to enable discovery, events and training. Personal contact info is shared only with consent.",
    likes: 12,
    hasLiked: false
  },
  {
    id: 2,
    title: "Handcrafted Wooden Peacock",
    role: "Buyer",
    author: "Dayalal Kudecha",
    date: "22 Aug 2025",
    description: "Data is used to enable discovery, events and training. Personal contact info is shared only with consent. Data is used to enable discovery, events and training. Personal contact info is shared only with consent.",
    likes: 8,
    hasLiked: true
  },
  {
    id: 3,
    title: "Handcrafted Wooden Peacock",
    role: "Design Consultant",
    author: "Dayalal Kudecha",
    date: "22 Aug 2025",
    description: "Data is used to enable discovery, events and training. Personal contact info is shared only with consent. Data is used to enable discovery, events and training. Personal contact info is shared only with consent.",
    likes: 15,
    hasLiked: false
  },
  {
    id: 4,
    title: "Traditional Pottery Workshop",
    role: "Maker",
    author: "Priya Sharma",
    date: "20 Aug 2025",
    description: "Data is used to enable discovery, events and training. Personal contact info is shared only with consent. Data is used to enable discovery, events and training. Personal contact info is shared only with consent.",
    likes: 23,
    hasLiked: true
  },
  {
    id: 5,
    title: "Sustainable Textile Collection",
    role: "Buyer",
    author: "Rajesh Kumar",
    date: "18 Aug 2025",
    description: "Data is used to enable discovery, events and training. Personal contact info is shared only with consent. Data is used to enable discovery, events and training. Personal contact info is shared only with consent.",
    likes: 7,
    hasLiked: false
  },
  {
    id: 6,
    title: "Wood Carving Techniques",
    role: "Design Consultant",
    author: "Anita Patel",
    date: "16 Aug 2025",
    description: "Data is used to enable discovery, events and training. Personal contact info is shared only with consent. Data is used to enable discovery, events and training. Personal contact info is shared only with consent.",
    likes: 19,
    hasLiked: false
  }
];

export default function CommunityPage() {
  const [posts, setPosts] = useState(communityPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            hasLiked: !post.hasLiked, 
            likes: post.hasLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  return (
    <>
      <Hero title="COMMUNITY" subtitle="A searchable, authenticated database of artisans, maker groups and designers across India. Find profiles by craft, location, techniques, materials and certifications." />
      
      <Section>
        {/* Community Posts */}
        <div className="space-y-8 mb-12">
          {paginatedPosts.map((post) => (
            <Card key={post.id} className="flex gap-6 p-6">
              {/* Left Section - Image placeholder (40% width) */}
              <div className="w-2/5 aspect-[4/3] rounded bg-muted flex-shrink-0 overflow-hidden">
                <img src={[
                  "https://images.pexels.com/photos/5650095/pexels-photo-5650095.jpeg?auto=compress&cs=tinysrgb&w=800",
                  "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=800",
                  "https://images.pexels.com/photos/5650003/pexels-photo-5650003.jpeg?auto=compress&cs=tinysrgb&w=800",
                  "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
                  "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=800",
                  "https://images.pexels.com/photos/6348119/pexels-photo-6348119.jpeg?auto=compress&cs=tinysrgb&w=800"
                ][(post.id - 1) % 6]} alt={post.title} className="w-full h-full object-cover" />
              </div>
              
              {/* Right Section - Content (60% width) */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground italic mb-3">{post.role}</p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    {post.author} | {post.date}
                  </div>
                </div>
                
                {/* Interactive Buttons - Bottom Right */}
                <div className="flex items-center justify-end gap-3 mt-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                      post.hasLiked 
                        ? 'border-red-500 bg-red-50 text-red-500' 
                        : 'border-muted-foreground/30 bg-background hover:border-red-500 hover:text-red-500'
                    }`}
                  >
                    <span className="text-lg">{post.hasLiked ? '❤️' : '🤍'}</span>
                  </button>
                  <button className="w-10 h-10 rounded-full border border-muted-foreground/30 bg-background hover:border-foreground hover:text-foreground transition-colors flex items-center justify-center">
                    <span className="text-lg">📤</span>
                  </button>
                </div>
              </div>
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
