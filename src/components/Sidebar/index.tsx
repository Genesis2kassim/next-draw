"use client";

import React, { useEffect } from "react";
import styles from "./index.module.css";
import Heading from "../Typography/Heading";
import InlineColorPicker from "../ColorPicker/InlineColorPicker";
import { COLORS } from "@/constants";
import { useRecoilState } from "recoil";
import {
  selectedColorAtom,
  selectedStrokeWidthAtom,
  strokeOpacityAtom,
} from "@/state/atoms";
import StrokeList from "../Box/StrokeList";

export default function Sidebar() {
  // Global state
  const [selectedColor, setSelectedColor] = useRecoilState(selectedColorAtom);
  const [selectedStrokeWidth, setSelectedStrokeWidth] = useRecoilState(
    selectedStrokeWidthAtom
  );
  const [strokeOpacity, setStrokeOpacity] = useRecoilState(strokeOpacityAtom);

  const handleColorChange = (colorValue: string) => {
    setSelectedColor(colorValue);
  };

  const handleOpacityChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const opacityValue = parseFloat(e.currentTarget.value);
    setStrokeOpacity(opacityValue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Heading text="Stroke color" />
        <InlineColorPicker
          color={selectedColor}
          updateColor={handleColorChange}
        />
      </div>
      <div className={styles.item}>
        <Heading text="Stroke width" />
        <StrokeList
          strokeWidth={selectedStrokeWidth}
          onSelectStrokeWidth={setSelectedStrokeWidth}
        />
      </div>
      <div className={styles.item}>
        <Heading text="Opacity" />
        <input
          type="range"
          id="opacity"
          name="opacity"
          min={0}
          max={1}
          step={0.1}
          onChange={handleOpacityChange}
        />
      </div>
    </div>
  );
}
