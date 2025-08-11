import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button"
import { NAV_LINKS } from "@/constants/pages";

export default function Navbar() {
  // A simple, inline SVG for a placeholder logo
  const logoSvg = (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 38C20 38 2 20.9167 2 12C2 5.37258 7.37258 0 14 0C17.6534 0 21.1118 1.63704 23.3607 4.31681L24 5L24.6393 4.31681C26.8882 1.63704 30.3466 0 34 0C40.6274 0 46 5.37258 46 12C46 20.9167 28 38 28 38" stroke="#34D399" strokeWidth="4"/>
    </svg>
  );
  return (
    <nav className="bg-white p-4 shadow-md flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-green-500">
          {logoSvg}
          <span>FitFlow</span>
        </Link>

         <ul className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
            <Link href={link.href} key={link.key} className="text-gray-600 hover:text-gray-900 transition-colors">
            {link.label}
            </Link>
            ))}
          </ul>
        <Button type="button" title="Login"
          icon="/login.png" className="bg-green-400"
        />
        
    </nav>
    
  );
}
