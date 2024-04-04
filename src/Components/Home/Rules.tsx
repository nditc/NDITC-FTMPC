import React from 'react';

const Rules = () => {
  return (
    <section id="rules" className="w-screen h-fit pt-16 pb-16 object-cover  text-center">
      <div className="container">
        <h1 className="mx-auto mb-5 md:mb-8 ">
          <span className="text-4xl md:text-5xl text-center">RULES & </span>{' '}
          <br className="inline md:hidden" />
          <span className="text-primary text-4xl md:text-5xl text-center">ELEGIBILITY </span>{' '}
        </h1>
        <p className="text-left">
          Participants eligible for the competition include all current students enrolled in
          schools, colleges, and corresponding institutions, including those from the HSC batch of
          2024. Individual participation is mandatory, and submissions must adhere to provided
          guidelines, ensuring originality and compliance with copyright laws. Fair play and
          respectful conduct are expected throughout the competition, with any form of cheating or
          inappropriate behavior resulting in disqualification. Participants must also comply with
          all applicable laws and regulations and respect judges&apos; decisions, while organizers
          reserve the right to disqualify any participant violating rules or failing to adhere to
          guidelines. Changes to rules may occur at organizers&apos;discretion, communicated through
          official channels, and participants&apos; agreement to abide by these rules and additional
          guidelines is implied upon participation.
        </p>
      </div>
    </section>
  );
};

export default Rules;
