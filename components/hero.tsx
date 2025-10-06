import { ReactNode } from "react";

export function Hero({ title, subtitle, actions, kickerTitle, kickerSubtitle }: { title: string; subtitle?: string; actions?: ReactNode; kickerTitle?: string; kickerSubtitle?: string }) {
  return (
    <div className="border-b bg-muted" style={{ backgroundImage: "url('/images/bg-new.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-24" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-12">
            {(kickerTitle || kickerSubtitle) && (
              <div className="mb-8 text-xs text-muted-foreground">
                <div>hosted by</div>
                <div className="font-medium text-foreground">{kickerSubtitle ?? kickerTitle}</div>
              </div>
            )}
            <h1 className="font-heading text-[28px] sm:text-[36px] md:text-[40px] lg:text-[44px] font-semibold leading-tight tracking-[-0.01em]">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-6 text-[15px] leading-7 text-muted-foreground max-w-prose">{subtitle}</p>
            ) : null}
            {actions ? <div className="mt-6 flex gap-3">{actions}</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

