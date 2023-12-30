import React from "react";
import styles from "./index.module.css";

type StrokeBoxProps = {
  width: number;
  onClick: () => void;
  className: string;
  active: boolean;
};
export default function StrokeBox({
  width,
  onClick,
  className,
  active,
}: StrokeBoxProps) {
  return (
    <div
      onClick={onClick}
      className={`${styles.strokeBox} ${className} ${active && styles.active}`}
    >
      &#8212;
    </div>
  );
}
