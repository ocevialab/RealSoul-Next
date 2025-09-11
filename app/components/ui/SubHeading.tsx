import React from "react";

interface SubHeadingProps {
  text: string;
}

function SubHeading({ text }: SubHeadingProps) {
  return (
    <p
      className="mx-auto mt-6 max-w-7xl font-grotesk text-base leading-7 text-[#b0b0b0] sm:text-lg"
      data-reveal-text
    >
      {text}
    </p>
  );
}

export default SubHeading;
