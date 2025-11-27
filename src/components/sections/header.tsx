'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Work', 'Expertise', 'Background'];

  return (
    <>
      <nav
        className={cn(
          'fixed w-full z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm border-b border-gray-100'
            : 'bg-transparent py-8'
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className={cn(
              'text-2xl font-bold tracking-tighter flex items-center gap-2',
              scrolled ? 'text-black' : 'text-white'
            )}>
            LUNGELO<span className="text-primary">.</span>
          </Link>

          <div
            className={cn(
              'hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide',
              scrolled ? 'text-black' : 'text-white'
            )}
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
            <Button asChild variant={scrolled ? 'default' : 'outline'} className={cn(
                'font-semibold px-6 py-2',
                 scrolled ? 'border-black hover:bg-black hover:text-white' : 'border-white text-white hover:bg-white hover:text-black',
                 !scrolled && 'text-white'
            )}>
              <a href="#contact">Let&apos;s Talk</a>
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="text-black" />
            ) : (
              <Menu className={scrolled ? 'text-black' : 'text-white'} />
            )}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-200 md:hidden">
          {[...navItems, 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-4xl font-light tracking-tighter hover:text-primary"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
