"use client";

import React from "react";
import styles from "./index.module.css";
import ColorBox from "../Box/ColorBox";
import { COLORS } from "@/constants";

type InlineColorPickerProps = {
  color: string;
  updateColor: (colorValue: string) => void;
};
export default function InlineColorPicker({
  color,
  updateColor,
}: InlineColorPickerProps) {
  return (
    <div className={styles.itemContainer}>
      {Object.values(COLORS).map((colorValue, index) => (
        <ColorBox
          key={index}
          color={colorValue}
          active={color === colorValue}
          onClick={() => updateColor(colorValue)}
        />
      ))}
    </div>
  );
}
