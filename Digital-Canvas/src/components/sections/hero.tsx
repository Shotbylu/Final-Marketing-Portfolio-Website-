import Image from 'next/image';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroBg = PlaceHolderImages.find((p) => p.id === 'hero-bg')!;
  const profilePic = PlaceHolderImages.find((p) => p.id === 'profile-pic')!;

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 opacity-60">
        <Image
          src={heroBg.imageUrl}
          alt="Abstract Data"
          fill
          className="object-cover"
          priority
          data-ai-hint={heroBg.imageHint}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black z-0"></div>

      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-2/3 text-center md:text-left">
            <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase animate-pulse">
              JHB • Digital Marketing Specialist
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mt-6 mb-8 leading-[1.1] tracking-tight">
              Converting Ad spend <br />
              into{' '}
              <span className="font-light italic text-gray-300">
                revenue
              </span>
              .
            </h1>
            <p className="text-white max-w-xl text-lg mb-10 font-light leading-relaxed">
              I specialize in SEO, paid social across Meta, Google, and LinkedIn Ads.
              With experience in Automotive, Energy, and Mining, I don&apos;t just
              run ads, I engineer ROI.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto bg-white text-black font-bold hover:bg-primary transition-colors">
                <a href="#work">
                  View Case Studies <ArrowRight size={18} />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white text-white font-semibold bg-white/5 hover:bg-white/15 transition-colors rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-sm"
              >
                <a href="#">
                  <Download size={18} /> Download CV
                </a>
              </Button>
            </div>
          </div>

          <div className="w-full md:w-1/3 relative flex justify-center md:justify-start">
            <div className="aspect-[3/4] w-64 sm:w-72 md:w-full max-w-xs sm:max-w-sm md:max-w-full bg-zinc-800 overflow-hidden border-2 border-zinc-700 grayscale hover:grayscale-0 transition-all duration-700">
              <Image
                src={profilePic.imageUrl}
                alt="Lungelo Sibisi"
                width={800}
                height={1067}
                className="w-full h-full object-cover"
                data-ai-hint={profilePic.imageHint}
                priority
              />
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-5 py-4 font-mono text-xs md:-bottom-6 md:-left-6 md:translate-x-0">
              <div className="text-center md:text-left">LUNGELO SIBISI</div>
              <div className="font-bold mt-1 text-center md:text-left">SEO, CRM-ARCHITECT</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
