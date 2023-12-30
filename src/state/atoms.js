import { atom, DefaultValue } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const darkModeAtom = atom({
  key: "darkMode",
  default: undefined,
  effects: [persistAtom],
});

export { darkModeAtom };
