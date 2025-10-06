export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

// Manually derived from provided mockups. Slugs mirror page names.
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "Database", href: "/maker-database" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Community", href: "/community" },
];

export function humanize(path: string): string {
  return path
    .replace(/^\//, "")
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}



