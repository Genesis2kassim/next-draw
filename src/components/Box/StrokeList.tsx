import React from "react";
import styles from "./index.module.css";
import StrokeBox from "./StrokeBox";

const strokeWidths = [
  { value: 5, className: styles.strokeLight },
  { value: 10, className: styles.strokeBold },
  { value: 15, className: styles.strokeBolder },
];

type StrokeListProps = {
  strokeWidth: number;
  onSelectStrokeWidth: (value: number) => void;
};
export default function StrokeList({
  onSelectStrokeWidth,
  strokeWidth,
}: StrokeListProps) {
  return (
    <div className={styles.strokeBoxContainer}>
      {strokeWidths.map(({ value, className }, index) => (
        <StrokeBox
          key={index}
          active={strokeWidth === value}
          width={value}
          onClick={() => onSelectStrokeWidth(value)}
          className={className}
        />
      ))}
    </div>
  );
}
