const statistics = [
  {
    id: 1,
    number: "15K+",
    title: "Students",
  },
  {
    id: 2,
    number: "5K+",
    title: "Notes",
  },
  {
    id: 3,
    number: "1200+",
    title: "Projects",
  },
  {
    id: 4,
    number: "250+",
    title: "Internships",
  },
];

const Statistics = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
          Trusted by Students Across India
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {statistics.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition hover:shadow-lg"
            >
              <h3 className="text-4xl font-bold text-indigo-600">
                {item.number}
              </h3>

              <p className="mt-3 text-lg font-medium text-gray-600">
                {item.title}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Statistics;