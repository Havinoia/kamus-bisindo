import Link from "next/link";

const navItems = [
  { label: "Daftar Isyarat", href: "/" },
  { label: "Tutorial Dasar", href: "#tutorials" },
  { label: "Peta Wilayah", href: "#regions" },
  { label: "Tentang Kami", href: "#about" },
];

const supportItems = [
  { label: "Accessibility Statement", href: "#" },
  { label: "Contribution Guide", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Contact Us", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 px-6 lg:px-8 max-w-screen-2xl mx-auto">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="text-lg font-bold text-primary mb-4 font-headline">
            Kamus BISINDO
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
            Inisiatif digital untuk memperluas akses komunikasi inklusif bagi
            seluruh masyarakat Indonesia.
          </p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-primary cursor-pointer hover:scale-110 transition-transform">
              language
            </span>
            <span className="material-symbols-outlined text-primary cursor-pointer hover:scale-110 transition-transform">
              share
            </span>
            <span className="material-symbols-outlined text-primary cursor-pointer hover:scale-110 transition-transform">
              mail
            </span>
          </div>
        </div>

        {/* Navigasi */}
        <div>
          <h4 className="font-headline font-bold text-on-surface mb-6">
            Navigasi
          </h4>
          <ul className="space-y-3 text-sm text-on-surface-variant">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Dukungan */}
        <div>
          <h4 className="font-headline font-bold text-on-surface mb-6">
            Dukungan
          </h4>
          <ul className="space-y-3 text-sm text-on-surface-variant">
            {supportItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Berlangganan */}
        <div>
          <h4 className="font-headline font-bold text-on-surface mb-6">
            Berlangganan
          </h4>
          <p className="text-sm text-on-surface-variant mb-4">
            Dapatkan update kosa kata terbaru langsung di email Anda.
          </p>
          <div className="flex">
            <input
              className="bg-surface-container-lowest border-none rounded-l-lg px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-primary text-sm shadow-sm"
              placeholder="Email Anda"
              type="email"
            />
            <button className="bg-primary text-on-primary px-5 py-2.5 rounded-r-lg font-bold text-sm hover:shadow-lg transition-all active:scale-95 whitespace-nowrap">
              Kirim
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-6 px-6 lg:px-8 max-w-screen-2xl mx-auto border-t border-outline-variant/20 text-center">
        <p className="text-sm text-on-surface-variant">
          © {new Date().getFullYear()} Kamus BISINDO. Bridging movement and
          meaning.
        </p>
      </div>
    </footer>
  );
}
