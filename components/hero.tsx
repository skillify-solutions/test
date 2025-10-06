import { ReactNode } from "react";

export function Hero({ title, subtitle, actions, kickerTitle, kickerSubtitle }: { title: string; subtitle?: string; actions?: ReactNode; kickerTitle?: string; kickerSubtitle?: string }) {
  return (
    <div className="relative border-b overflow-hidden" style={{ backgroundImage: "url('https://images.pexels.com/photos/5650095/pexels-photo-5650095.jpeg?auto=compress&cs=tinysrgb&w=1920')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-amber-800/30 to-orange-900/40"></div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-12">
            {(kickerTitle || kickerSubtitle) && (
              <div className="mb-8 text-xs text-amber-100 animate-fade-in">
                <div className="opacity-80">hosted by</div>
                <div className="font-semibold text-white">{kickerSubtitle ?? kickerTitle}</div>
              </div>
            )}
            <h1 className="font-heading text-[28px] sm:text-[36px] md:text-[40px] lg:text-[44px] font-bold leading-tight tracking-[-0.01em] text-white drop-shadow-lg animate-slide-up">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-6 text-[15px] leading-7 text-amber-100 max-w-prose drop-shadow-md animate-fade-in-delay">{subtitle}</p>
            ) : null}
            {actions ? <div className="mt-8 flex gap-3 animate-fade-in-delay-2">{actions}</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

