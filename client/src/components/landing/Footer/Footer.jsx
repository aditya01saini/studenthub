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

        <div className="grid gap-12 border-b border-slate-800 py-16 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}

          <div>

            <div className="flex justify-center items-center gap-3">

              <FaGraduationCap className="text-3xl text-indigo-500" />

              <h2 className="text-2xl font-bold text-white">
                Student
                <span className="text-indigo-500">Hub</span>
              </h2>

            </div>

            <p className="mt-5 leading-7">
              StudentHub helps students share notes, showcase projects,
              discover internships and build professional portfolios.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-5 text-xl font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 inline-block">

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

            <h3 className="mb-5 text-xl font-semibold text-white">
              Resources
            </h3>

            <ul className="space-y-3 inline-block">

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

            <h3 className="mb-5 text-xl font-semibold text-white">
              Connect With Us
            </h3>

            <div className="flex justify-center gap-4">

              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 transition hover:bg-indigo-600">
                <FaGithub />
              </button>

              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 transition hover:bg-indigo-600">
                <FaLinkedin />
              </button>

              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 transition hover:bg-indigo-600">
                <FaInstagram />
              </button>

              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 transition hover:bg-indigo-600">
                <FaTwitter />
              </button>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="flex flex-col items-center justify-center gap-4 py-6 text-sm text-slate-400 md:flex-row">

          <p>
            © 2026 StudentHub. All Rights Reserved.
          </p>

          

        </div>

      </Container>

    </footer>
  );
};

export default Footer;