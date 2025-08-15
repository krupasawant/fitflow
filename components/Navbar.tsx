'use client';

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { NAV_LINKS } from "@/constants/pages";
import AuthButtons from "./Logout";
import Logo from "./CustomLogo";
import Logout from "./Logout";


export default function Navbar() {
  

  return (
    <nav className="bg-white p-4 shadow-md flex items-center justify-between">
      {/* Logo */}
      
      <Logo></Logo>

      {/* Nav links */}
      <ul className="hidden md:flex items-center space-x-8">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </ul>

      <Logout></Logout>

      <div className="flex gap-3">
      <Link href="/login">
        <Button 
          type="button" 
          title="Login"
          icon="/login.png" 
          className="bg-green-400 text-white"
        />
      </Link>
      <Link href="/signup">
        <Button 
          type="button" 
          title="Sign Up"
          icon="" 
          className="bg-orange-400 text-white"
        />
      </Link>
      </div>

      

     
    </nav>
  );
}
