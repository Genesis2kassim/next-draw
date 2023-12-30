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
  default: "#000",
  effects: [persistAtom],
});

const selectedStrokeWidthAtom = atom({
  key: "selectedStrokeWidth",
  default: 5,
});

export { darkModeAtom, selectedColorAtom, selectedStrokeWidthAtom };
