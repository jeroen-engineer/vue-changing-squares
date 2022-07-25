<script setup>
import { ref, reactive, computed } from "vue";

const containerSize = ref(250);
const childSize = ref(50);
const numberOfChildren = ref(25);
const littleSquareArray = ref([]);
const totalFittingSquares = ref();

let rows = containerSize.value / childSize.value;
let cols = containerSize.value / childSize.value;

let rowsFloor = Math.floor(rows);
let colsFloor = Math.floor(cols);

totalFittingSquares.value = Math.floor(rows) * Math.floor(cols);

if (totalFittingSquares.value > numberOfChildren.value) {
  totalFittingSquares.value = numberOfChildren.value;
}

const bigSquareStyles = reactive({
  maxWidth: `${containerSize.value}px`,
  height: `${containerSize.value}px`,
  marginTop: "1rem",
  border: "1px solid black",
  padding: 0,
  display: "grid",
  gridTemplateColumns: `repeat(${colsFloor}, ${childSize.value}px)`,
  gridTemplateRows: `repeat(${rowsFloor}, ${childSize.value}px )`,
});

const assignStyles = () => {
  for (let i = 0, len = totalFittingSquares.value; i < len; i++) {
    let littleSquareObject = {
      id: i,
      styles: {
        height: `${childSize.value}px`,
        width: `${childSize.value}px`,
        background: getRandomColor(),
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

function getRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
}

const howManySquaresText = computed(() => {
  return totalFittingSquares.value === 1
    ? `${totalFittingSquares.value} little square is in the BIG square.`
    : `${totalFittingSquares.value} little squares are in the BIG square.`;
});
</script>

<template>
  <div class="container">
    <div>
      <form
        @submit.prevent="
          drawContainer(containerSize, childSize, numberOfChildren)
        "
      >
        <div>
          <div>
            <label>Square width and height</label>
            <input v-model="containerSize" type="text" />
            {{ containerSize }}
          </div>
          <div>
            <label>Square width and height</label>
            <input v-model="childSize" type="text" />
          </div>
          <div>
            <label>Square width and height</label>
            <input v-model="numberOfChildren" type="text" />
          </div>
        </div>
        <button type="submit">Draw Square</button>
      </form>
    </div>
    <div class="squareContainer">
      <h1>{{ howManySquaresText }}</h1>
      <div :style="bigSquareStyles">
        <div v-for="child in littleSquareArray" :key="child.id">
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
  flex-direction: column;
  justify-content: center;
}
.squareContainer {
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
