import React from "react";

type HeadingProps = {
  text: string;
};
export default function Heading({ text }: HeadingProps) {
  return <h3 className="text-xs text-black dark:text-white mb-3">{text}</h3>;
}
