import { defineStore, acceptHMRUpdate } from "pinia";

export const useSquareStore = defineStore("square", {
  state: () => {
    return {
      containerSize: 250,
      childSize: 50,
      numberOfChildren: 25,
    };
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSquareStore, import.meta.hot));
}
