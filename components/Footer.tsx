import { FOOTERLINKS, SOCIALS } from "@/constants/pages";

export default function Footer() {
    const logoSvg = (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 38C20 38 2 20.9167 2 12C2 5.37258 7.37258 0 14 0C17.6534 0 21.1118 1.63704 23.3607 4.31681L24 5L24.6393 4.31681C26.8882 1.63704 30.3466 0 34 0C40.6274 0 46 5.37258 46 12C46 20.9167 28 38 28 38" stroke="#34D399" strokeWidth="4"/>
    </svg>
  );
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Company Info */}
        <div className="space-y-4">
          <a href="/" className="flex items-center space-x-2 text-2xl font-bold text-green-500">
            {logoSvg}
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
        
        {/* Social Media Icons 
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Follow Us</h4>
          <div className="flex space-x-4">
            {SOCIALS.map((icon, index) => (
              <a key={index} href="#" aria-label="Social media link">
                {icon}
              </a>
            ))}
          </div>
        </div>*/}

      </div>
    </footer>
  );
}