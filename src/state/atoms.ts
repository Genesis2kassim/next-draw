"use client";

import React, { useRef } from "react";
import { atom, DefaultValue } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const darkModeAtom = atom({
  key: "darkMode",
  default: undefined,
  effects: [persistAtom],
});

const selectedColorAtom = atom({
  key: "selectedColor",
  default: "#000" as string,
  effects: [persistAtom],
});

const selectedStrokeWidthAtom = atom({
  key: "selectedStrokeWidth",
  default: 5 as number,
});

export { darkModeAtom, selectedColorAtom, selectedStrokeWidthAtom };
