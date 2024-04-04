/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Setter from '@/Components/Home/Setter';
import Hero from '@/Components/Home/Hero';
import About from '@/Components/Home/About';
import Rules from '@/Components/Home/Rules';

const Home = () => {
  return (
    <>
      <main className="flex container mx-auto flex-col items-center justify-center">
        <Hero />
        <About />
        <Rules />
        <Setter />
      </main>
    </>
  );
};

export default Home;
