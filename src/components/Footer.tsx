import { BrainIcon } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-sm">
      {/* Subtle top glow line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Branding & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-1 bg-primary/10 rounded">
                <BrainIcon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xl font-bold font-sans">
                Sereni<span className="text-primary">Tech</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} SereniTech. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="/resources" className="hover:text-primary transition-colors">
              Resources
            </Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* System status */}
          <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-md bg-background/50">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground">
              Calm & Connected
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
