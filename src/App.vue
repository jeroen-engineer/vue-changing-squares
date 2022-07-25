<script setup>
import { ref, reactive, computed } from "vue";

const containerSize = ref(500);
const childSize = ref(100);
const numberOfChildren = ref(25);
const littleSquareArray = ref([]);
const totalFittingSquares = ref("");

let bigSquareStyles = null;
let howManySquaresText = null;

const drawContainer = () => {
  let rows = containerSize.value / childSize.value;
  let cols = containerSize.value / childSize.value;

  let rowsFloor = Math.floor(rows);
  let colsFloor = Math.floor(cols);

  bigSquareStyles = reactive({
    maxWidth: `${containerSize.value}px`,
    height: `${containerSize.value}px`,
    marginTop: "1rem",
    border: "1px solid black",
    padding: 0,
    display: "grid",
    gridTemplateColumns: `repeat(${colsFloor}, ${childSize.value}px)`,
    gridTemplateRows: `repeat(${rowsFloor}, ${childSize.value}px )`,
  });

  totalFittingSquares.value = Math.floor(rows) * Math.floor(cols);

  if (totalFittingSquares.value > numberOfChildren.value) {
    totalFittingSquares.value = numberOfChildren.value;
  }

  const assignStyles = () => {
    for (let i = 0, len = totalFittingSquares.value; i < len; i++) {
      let littleSquareObject = {
        id: i,
        styles: {
          height: `${childSize}px`,
          width: `${childSize}px`,
          background: getRandomColor(),
          display: "grid",
          margin: 0,
          padding: 0,
          cursor: "pointer",
        },
      };
      littleSquareArray.value.push(littleSquareObject);
    }
  };
  assignStyles();

  let timer = null;

  howManySquaresText = computed(() => {
    return totalFittingSquares === 1
      ? `${totalFittingSquares.value} little square is in the BIG square.`
      : `${totalFittingSquares.value} little squares are in the BIG square.`;
  });
};

function getRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
}
let timer = null;
const handleMouseEnter = (id) => {
  littleSquareArray.value.map(
    (item) => (item.styles.background = getRandomColor())
  );
  timer = setTimeout(() => {
    const newArray = littleSquareArray.value.filter((item) => item.id != id);
    littleSquareArray.value = newArray;
  }, 2000);
};

const handleStopDelete = () => {
  clearTimeout(timer);
};

drawContainer(containerSize, childSize, numberOfChildren);
</script>

<template>
  <div class="container">
    <div class="squareContainer">
      <h1>{{ howManySquaresText }}</h1>
      <h2>Hover to change the background color!</h2>
      <h3>Hover for more than 2 seconds and delete a little square.</h3>
      <div :style="bigSquareStyles">
        <div
          v-for="child in littleSquareArray"
          :key="child.id"
          class="getRidOfUserAgent"
        >
          <div
            :style="child.styles"
            @mouseenter="handleMouseEnter(child.id)"
            @mouseout="handleStopDelete"
          >
            {{ child.id }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;

  justify-content: center;
}
.squareContainer {
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.getRidOfUserAgent {
  display: grid !important;
}
</style>
