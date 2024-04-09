/* eslint-disable jsx-a11y/img-redundant-alt */

import Setter from "@/Components/Home/Setter";
import Hero from "@/Components/Home/Hero";
import About from "@/Components/Home/About";
import Rules from "@/Components/Home/Rules";
import Contact from "@/Components/Contact";
import FAQ from "@/Components/FAQ";
import DeveloperLink from "@/Components/DeveloperLink";

const Home = () => {
  return (
    <>
      <main className="flex container mx-auto flex-col items-center justify-center">
        <Hero />
        <About />
        <Rules />
        <Setter />
        <FAQ />
        <Contact />
        <DeveloperLink />
      </main>
    </>
  );
};

export default Home;
