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
  default: undefined,
  effects: [persistAtom],
});

const selectedStrokeWidthAtom = atom({
  key: "selectedStrokeWidth",
  default: 1,
});

export { darkModeAtom, selectedColorAtom, selectedStrokeWidthAtom };
