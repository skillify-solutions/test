import { ReactNode } from "react";

export function Section({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={"py-12 sm:py-16 md:py-20 " + (className ?? "") }>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

export default Section;



