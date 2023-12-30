"use client";

import React from "react";
import styles from "./index.module.css";

type ColorBoxProps = {
  color: string;
  active: boolean;
  onClick: () => void;
};
export default function ColorBox({ color, active, onClick }: ColorBoxProps) {
  return (
    <div
      className={`${styles.colorBox} ${active && styles.active}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    />
  );
}
