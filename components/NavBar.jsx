import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function NavBar() {
  return (
    <div className="flex justify-between items-center p-4 flex-col  md:flex-row bg-[#0e065c]">
      <Image
        src="/logo.png"
        alt="logo"
        width={150}
        height={150}
        className="md:mr-30 "
      />

      <div className="text-white flex justify-between items-center gap-2 mt-4 md:mt-0">
        <ul className="flex items-center gap-4">
          <li>الدعم والاستفسارات:</li>
          <li>
            <Link href="tel:01553841793" className="flex items-center gap-1">
              <Phone className="w-4 h-4" /> 01553841793
            </Link>
          </li>
          <li>
            <Link href="tel:971566027954" className="flex items-center gap-1">
              <Phone className="w-4 h-4" /> 971566027954
            </Link>
          </li>
          <li>
            <Link href="mailto:info@ens.eg" className="flex items-center gap-1">
              <Mail className="w-4 h-4" /> info@ens.eg
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
