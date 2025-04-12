
import { Bus, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Bus className="h-6 w-6 text-bustrackr-blue" />
              <span className="text-xl font-semibold">BusTrackr</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The ultimate bus tracking solution for educational institutions.
              Monitor buses in real-time, track attendance, and enhance safety.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="rounded-full p-2 hover:bg-muted"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-bustrackr-blue" />
              </a>
              <a
                href="#"
                className="rounded-full p-2 hover:bg-muted"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-bustrackr-blue" />
              </a>
              <a
                href="#"
                className="rounded-full p-2 hover:bg-muted"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-bustrackr-blue" />
              </a>
              <a
                href="#"
                className="rounded-full p-2 hover:bg-muted"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5 text-bustrackr-blue" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/help"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Help
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Data Protection
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                Email: info@bustrackr.edu
              </li>
              <li className="text-muted-foreground">Phone: +1 (555) 123-4567</li>
              <li className="text-muted-foreground">
                Address: 123 Education St, Campus Drive, 12345
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BusTrackr. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
