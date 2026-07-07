import Navbar from "../../components/landing/Navbar/Navbar";
import Hero from "../../components/landing/Hero/Hero";
import Statistics from "../../components/landing/Statistics/Statistics";
import Features from "../../components/landing/Features/Features";
import WhyChooseUs from "../../components/landing/WhyChooseUs/WhyChooseUs";
import HowItWorks from "../../components/landing/HowItWorks/HowItWokks";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Statistics />
      <Features/>
      <WhyChooseUs/>
      <HowItWorks />
    </>
  );
};

export default Home;