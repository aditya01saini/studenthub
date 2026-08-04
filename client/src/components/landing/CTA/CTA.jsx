import Container from "../../ui/Container";
import Button from "../../ui/Button";

const CTA = () => {
  return (
    <section className="bg-white py-20">
      <Container>

        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 px-8 py-16 text-center shadow-2xl lg:px-20">

          <h2 className="text-4xl font-bold text-white lg:text-5xl">
            Ready to Build Your Career?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-indigo-100">
            Join thousands of students who are sharing notes,
            showcasing projects, finding internships and building
            their professional portfolios with StudentHub.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <Button className="bg-white !text-indigo-700 hover:bg-slate-100">
              Get Started
            </Button>

            <Button
              variant="secondary"
              className="border border-white !bg-transparent !text-white hover:!bg-white hover:!text-indigo-700"
            >
              Explore Features
            </Button>

          </div>

        </div>

      </Container>
    </section>
  );
};

export default CTA;