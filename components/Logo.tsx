import Image from 'next/image';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/hotel_star_city_logo_v1.png"
      alt="Hotel Star City Logo"
      width={48}
      height={48}
      className={className}
    />
  );
}