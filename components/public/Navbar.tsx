'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const links = [
  { href: '/', label: 'Home' },
  { href: '/rooms', label: 'Rooms' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link href="/" className="flex items-center gap-3">
            <Logo className="h-10 w-10" />
            <div>
              <p className="font-bold text-gray-900 leading-tight text-sm">Hotel Star City</p>
              <p className="text-xs text-[#5F8C3F] leading-tight">Lodging and Fooding</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-[#5F8C3F]'
                    : 'text-gray-600 hover:text-[#5F8C3F]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+918787430576" className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#5F8C3F]">
              <Phone className="h-4 w-4" />
              +91 8787430576
            </a>
            <Link href="/booking">
              <Button className="bg-[#5F8C3F] hover:bg-[#4a6e30] text-white text-sm">
                Book Now
              </Button>
            </Link>
          </div>

          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block text-sm font-medium py-2 ${
                pathname === link.href ? 'text-[#5F8C3F]' : 'text-gray-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/booking" onClick={() => setOpen(false)}>
            <Button className="w-full bg-[#5F8C3F] hover:bg-[#4a6e30] text-white mt-2">
              Book Now
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}