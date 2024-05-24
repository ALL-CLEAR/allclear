import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "persist-atom-key",
  storage: sessionStorage,
});

export const isLoggedInAtom = atom({
  key: "isLoggedIn",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const loggedInUserAtom = atom({
  key: "loggedInUser",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
