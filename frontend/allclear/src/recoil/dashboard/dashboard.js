import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "persist-atom-key",
  storage: sessionStorage,
});

export const dashboardDataAtom = atom({
  key: "dashboardData",
  default: {
    detect: "",
    temperature: "",
    humidity: "",
    light: "",
    air: "",
    co: "",
    co2: "",
    alcohol: "",
    venzene: "",
    nh4: "",
    aceton: "",
  },
  effects_UNSTABLE: [persistAtom],
});
