import CountUp from "react-countup";
import Card from "../../ui/Card";
import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";

const statistics = [
  {
    id: 1,
    number: 15000,
    suffix: "+",
    title: "Students",
  },
  {
    id: 2,
    number: 5000,
    suffix: "+",
    title: "Notes",
  },
  {
    id: 3,
    number: 1200,
    suffix: "+",
    title: "Projects",
  },
  {
    id: 4,
    number: 250,
    suffix: "+",
    title: "Internships",
  },
];

const Statistics = () => {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionTitle
          title="Trusted by Students Across India"
          subtitle="Thousands of students use StudentHub to share notes, showcase projects, and discover internships."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statistics.map((item) => (
            <Card key={item.id} className="text-center">
              {/* <h3 className="text-4xl font-bold text-indigo-600">
                <CountUp
                  end={item.number}
                  duration={2}
                  separator=","
                />
                {item.suffix}
              </h3> */}
              <h3 className="text-4xl font-bold text-indigo-600">
                {item.number}
                {item.suffix}
              </h3>
              <p className="mt-3 text-lg font-medium text-slate-600">
                {item.title}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Statistics;
