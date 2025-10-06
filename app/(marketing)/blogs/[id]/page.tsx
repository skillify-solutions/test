import Hero from "@/components/hero";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

const blogPosts = {
  "1": {
    title: "From forest floor to future – Pine needles for material innovation and climate resilience",
    author: "Creative Dignity",
    date: "13 Mar 2025",
    excerpt: "Background Pine needles (grow as part of the pine trees) which are abundantly found on forest floors across India. These needles, often considered waste, hold immense potential for sustainable material innovation...",
    content: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`
  },
  "2": {
    title: "Traditional pottery techniques in modern design",
    author: "Creative Dignity",
    date: "10 Mar 2025",
    excerpt: "Exploring how ancient pottery methods are being adapted for contemporary applications while preserving cultural heritage...",
    content: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`
  },
  "3": {
    title: "Sustainable textile practices in rural India",
    author: "Creative Dignity",
    date: "8 Mar 2025",
    excerpt: "A deep dive into eco-friendly textile production methods being practiced by artisan communities across rural India...",
    content: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`
  },
  "4": {
    title: "Wood carving traditions and modern applications",
    author: "Creative Dignity",
    date: "5 Mar 2025",
    excerpt: "How traditional wood carving techniques are finding new relevance in contemporary furniture and art...",
    content: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`
  },
  "5": {
    title: "Digital platforms for artisan market access",
    author: "Creative Dignity",
    date: "3 Mar 2025",
    excerpt: "Exploring how technology is helping artisans reach global markets while maintaining traditional craftsmanship...",
    content: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`
  },
  "6": {
    title: "Preserving heritage through craft education",
    author: "Creative Dignity",
    date: "1 Mar 2025",
    excerpt: "The importance of passing down traditional skills to younger generations and innovative approaches to craft education...",
    content: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`
  },
  "7": {
    title: "Innovative weaving techniques in contemporary fashion",
    author: "Creative Dignity",
    date: "28 Feb 2025",
    excerpt: "Discovering how traditional weaving methods are being reinvented for modern fashion while maintaining cultural authenticity...",
    content: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`
  },
  "8": {
    title: "The role of women in preserving traditional crafts",
    author: "Creative Dignity",
    date: "25 Feb 2025",
    excerpt: "Highlighting the crucial contributions of women artisans in keeping traditional crafts alive and thriving...",
    content: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`
  },
  "9": {
    title: "Sustainable materials in contemporary design",
    author: "Creative Dignity",
    date: "22 Feb 2025",
    excerpt: "Exploring eco-friendly materials and their applications in modern design practices...",
    content: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`
  },
  "10": {
    title: "Artisan cooperatives and collective growth",
    author: "Creative Dignity",
    date: "20 Feb 2025",
    excerpt: "How artisan cooperatives are transforming individual crafts into collective economic opportunities...",
    content: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`
  },
  "11": {
    title: "Traditional dyeing techniques and natural colors",
    author: "Creative Dignity",
    date: "18 Feb 2025",
    excerpt: "Reviving ancient dyeing methods using natural materials for sustainable textile production...",
    content: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`
  },
  "12": {
    title: "Craft tourism and cultural preservation",
    author: "Creative Dignity",
    date: "15 Feb 2025",
    excerpt: "How craft tourism is helping preserve traditional skills while providing economic opportunities...",
    content: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`
  },
  "13": {
    title: "Modern tools enhancing traditional craftsmanship",
    author: "Creative Dignity",
    date: "12 Feb 2025",
    excerpt: "The integration of modern technology with age-old crafting techniques for improved efficiency...",
    content: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`
  },
  "14": {
    title: "Community-based craft development programs",
    author: "Creative Dignity",
    date: "10 Feb 2025",
    excerpt: "Successful community initiatives that are revitalizing local craft traditions and creating sustainable livelihoods...",
    content: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`
  },
  "15": {
    title: "The economics of handmade products",
    author: "Creative Dignity",
    date: "8 Feb 2025",
    excerpt: "Understanding the market dynamics and pricing strategies for handmade craft products...",
    content: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`
  }
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = blogPosts[id as keyof typeof blogPosts];
  
  if (!post) {
    return (
      <>
        <Hero title="Post Not Found" subtitle="The requested blog post could not be found." />
        <Section>
          <div className="text-center">
            <p className="text-muted-foreground">Please check the URL and try again.</p>
            <Button asChild className="mt-4">
              <Link href="/blogs">Back to Blogs</Link>
            </Button>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Sidebar */}
          <aside className="md:col-span-3">
            <div className="sticky top-24">
              {/* Metadata */}
              <div className="rounded-xl bg-muted p-6 mb-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Author:</span>
                    <p className="text-sm">{post.author}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Date:</span>
                    <p className="text-sm">{post.date}</p>
                  </div>
                </div>
              </div>
              
              {/* Share Button */}
              <Button className="w-full rounded-2xl h-12 px-6" withArrow>
                Share this article
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <article className="md:col-span-9">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-8">
              {post.title}
            </h1>
            
            {/* Featured Image */}
            <div className="aspect-[16/9] w-full rounded-xl bg-muted mb-8"></div>
            
            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground italic mb-8">
                At vero eos et accusamus et iusto odio dignissimos ducimus
              </p>
              
              <div className="space-y-6 text-muted-foreground leading-8">
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </article>
        </div>
      </Section>
    </>
  );
}
