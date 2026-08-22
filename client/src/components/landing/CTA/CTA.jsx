import { Link } from "react-router-dom";

import Container from "../../ui/Container";
import Button from "../../ui/Button";

const CTA = () => {
  return (
    <section className="bg-white py-12">
      <Container>
        <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 px-6 py-10 text-center shadow-xl sm:px-10 lg:px-14">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Build Your Career?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-6 text-indigo-100 sm:text-lg">
            Join thousands of students who are sharing notes, showcasing
            projects, finding internships and building their professional
            portfolios with StudentHub.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button className="bg-white !text-indigo-700 hover:bg-slate-100">
                Get Started
              </Button>
            </Link>

            <a href="#features">
              <Button
                variant="secondary"
                className="border border-white !bg-transparent !text-white hover:!bg-white hover:!text-indigo-700"
              >
                Explore Features
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTA;
