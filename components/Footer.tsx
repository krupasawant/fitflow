import { FOOTERLINKS } from "@/constants/pages";
import Logo from "./CustomLogo";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Company Info */}
        <div className="space-y-4">
          <a href="/" className="flex items-center space-x-2 text-2xl font-bold text-green-500">
            <Logo></Logo>
            <span>FitFlow</span>
          </a>
          <p className="text-gray-400">
            Your journey to a healthier you starts here.
            <br/>
            © 2024 FitFlow, Inc. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        {FOOTERLINKS.map((section, index) => (
          <div key={index} className="space-y-4">
            <h4 className="text-lg font-semibold text-white">{section.title}</h4>
            <ul className="space-y-2 text-gray-400">
              {section.links.map((link, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-green-500 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>
    </footer>
  );
}