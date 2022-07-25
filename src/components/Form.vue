<script setup></script>
<template>
  <form
    @submit.prevent="drawContainer(containerSize, childSize, numberOfChildren)"
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
</template>
