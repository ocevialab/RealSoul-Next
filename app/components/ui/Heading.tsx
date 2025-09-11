import React from "react";

interface HeadingProps {
  HeaderText: string;
}

function Heading({ HeaderText }: HeadingProps) {
  return (
    <div>
      <h2
        data-reveal-text
        className="mb-4 font-freight py-4 text-2xl text-center font-bold tracking-[0.12em] sm:text-3xl md:text-4xl lg:text-5xl text-gold"
      >
        {HeaderText}
      </h2>
    </div>
  );
}

export default Heading;
