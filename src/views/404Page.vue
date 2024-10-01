<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
  <div class="page-container">
    <div>The page you are looking for does not exist.</div>
    <el-button type="primary" @click="router.push('/')">Back to Home</el-button>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  line-height: 2;
  text-align: center;
  margin-top: 100px;
}
</style>