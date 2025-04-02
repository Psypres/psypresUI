<template>
  <div @click="handleClick">Hello from Vue!</div>
</template>

<script setup>
function handleClick() {
  alert('Vue says hello!');
}
</script>
