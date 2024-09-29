<script setup lang="ts">
import LayoutNavbar from './LayoutNavbar.vue';
import LayoutMain from './LayoutMain.vue';
</script>

<template>
  <div class="app-wrapper">
    <div class="main-container">
      <LayoutNavbar />
      <LayoutMain />
      <div class="footer">
        <p style="color: white;">Copyright © 2024 Chen Haoquan, University of Debrecen</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .footer {
    z-index: 1000;
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    background-color: rgb(0, 72, 2);
    border-top: 1px solid #e6e6e6;
  }
}
</style>