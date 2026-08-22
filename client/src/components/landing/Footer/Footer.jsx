import {
  FaGraduationCap,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

import Container from "../../ui/Container";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <Container>
        {/* Main Footer */}
        <div className="grid gap-8 border-b border-slate-800 py-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <FaGraduationCap className="text-2xl text-indigo-500" />

              <h2 className="text-xl font-bold text-white">
                Student
                <span className="text-indigo-500">Hub</span>
              </h2>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              StudentHub helps students share notes, showcase projects, discover
              internships and build professional portfolios.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-base font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm">
              <li className="cursor-pointer transition hover:text-indigo-400">
                Home
              </li>

              <li className="cursor-pointer transition hover:text-indigo-400">
                Features
              </li>

              <li className="cursor-pointer transition hover:text-indigo-400">
                Projects
              </li>

              <li className="cursor-pointer transition hover:text-indigo-400">
                Internships
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-base font-semibold text-white">
              Resources
            </h3>

            <ul className="space-y-2 text-sm">
              <li className="cursor-pointer transition hover:text-indigo-400">
                Community
              </li>

              <li className="cursor-pointer transition hover:text-indigo-400">
                FAQ
              </li>

              <li className="cursor-pointer transition hover:text-indigo-400">
                Privacy Policy
              </li>

              <li className="cursor-pointer transition hover:text-indigo-400">
                Terms & Conditions
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-base font-semibold text-white">
              Connect With Us
            </h3>

            <div className="flex gap-3 justify-center">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-lg transition hover:bg-indigo-600 hover:text-white"
              >
                <FaGithub />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-lg transition hover:bg-indigo-600 hover:text-white"
              >
                <FaLinkedin />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-lg transition hover:bg-indigo-600 hover:text-white"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-lg transition hover:bg-indigo-600 hover:text-white"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-5 text-center text-xs text-slate-500">
          © 2026 StudentHub. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
