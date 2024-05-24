import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "persist-atom-key",
  storage: sessionStorage,
});

export const selectedLineAtom = atom({
  key: "selectedLine",
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

