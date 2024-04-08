/* eslint-disable jsx-a11y/img-redundant-alt */

import Setter from "@/Components/Home/Setter";
import Hero from "@/Components/Home/Hero";
import About from "@/Components/Home/About";
import Rules from "@/Components/Home/Rules";
import Contact from "@/Components/Contact";
import FAQ from "@/Components/FAQ";

const Home = () => {
  return (
    <>
      <main className="flex container mx-auto flex-col items-center justify-center">
        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />
        <Hero />
        <About />
        <Rules />
        <Setter />
        <FAQ />
        <Contact />
      </main>
    </>
  );
};

export default Home;
