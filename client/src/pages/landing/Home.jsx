import Navbar from "../../components/landing/Navbar/Navbar";
import Hero from "../../components/landing/Hero/Hero";
import Statistics from "../../components/landing/Statistics/Statistics";
import Features from "../../components/landing/Features/Features";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Statistics />
      <Features/>
    </>
  );
};

export default Home;