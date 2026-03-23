import Hero from "../components/Hero/Hero";
import Difference from "../components/Difference/Difference";
import ProblemSolution from "../components/ProblemSolution/ProblemSolution";
import Domains from "../components/Domains/Domains";
import Process from "../components/Process/Process";
import TechStack from "../components/TechStack/TechStack";
import Insight from "../components/Insight/Insight";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import { Toaster } from 'react-hot-toast';
import OurPartners from "../components/OurPartners/OurPartners";
import SubNavbar from "../components/SubNavbar/SubNavbar";

function Home() {
  return (
    <div className="home-container">
      <Toaster />
      <Hero  />
      <SubNavbar />
      <Difference  />
      <ProblemSolution />
      <Domains />
      <Process  />
      <TechStack/>
      <Insight />
      <OurPartners />
        <Contact/>
        <Footer />
    </div>
  );
}

export default Home;
