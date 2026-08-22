import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import FAQItem from "../../ui/FAQItem";

const faqs = [
  {
    id: 1,
    question: "What is StudentHub?",
    answer:
      "StudentHub is an all-in-one platform where students can share notes, showcase projects, build portfolios and apply for internships.",
  },
  {
    id: 2,
    question: "Is StudentHub free to use?",
    answer:
      "Yes. Students can create an account and use the platform free of cost.",
  },
  {
    id: 3,
    question: "How can I apply for internships?",
    answer:
      "Simply create your profile, explore available internships and apply directly through StudentHub.",
  },
  {
    id: 4,
    question: "Can recruiters contact students?",
    answer:
      "Yes. Recruiters can explore student profiles and connect with suitable candidates.",
  },
  {
    id: 5,
    question: "Can I upload my own projects and notes?",
    answer:
      "Yes. Every student can upload projects, notes and build a professional portfolio.",
  },
];

const FAQ = () => {
  return (
    <section className="bg-white py-14">
      <Container>
        {/* Section Title */}

        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about StudentHub."
        />

        {/* FAQ List */}

        <div className="mx-auto max-w-4xl space-y-4">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} {...faq} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
