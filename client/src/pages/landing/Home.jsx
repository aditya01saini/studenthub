import Navbar from "../../components/landing/Navbar/Navbar";
import Hero from "../../components/landing/Hero/Hero";
import Statistics from "../../components/landing/Statistics/Statistics";
import Features from "../../components/landing/Features/Features";
import WhyChooseUs from "../../components/landing/WhyChooseUs/WhyChooseUs";
import HowItWorks from "../../components/landing/HowItWorks/HowItWokks";
import TopStudents from "../../components/landing/TopStudents/TopStudents";
import LatestProjects from "../../components/landing/LatestProject/LatestProject";
import LatestInternships from "../../components/landing/LatestInternships/LatestInternships";
import Testimonials from "../../components/landing/Testimonials/Testimonials";
import FAQ from "../../components/landing/FAQ/FAQ";
import CTA from "../../components/landing/CTA/CTA";
import Footer from "../../components/landing/Footer/Footer";

// Resume Analyzer
// import ResumeAnalyzer from "../../components/landing/ResumeAnalyzer/ResumeAnalyzer";

const Home = () => {
  return (
    <>
      <Navbar />

      <Hero />

      <Statistics />

      <Features />

      <WhyChooseUs />

      <HowItWorks />

      <TopStudents />

      <LatestProjects />

      <LatestInternships />

      {/* AI Resume Analyzer
      <ResumeAnalyzer /> */}

      <Testimonials />

      <FAQ />

      <CTA />

      <Footer />
    </>
  );
};

export default Home;
