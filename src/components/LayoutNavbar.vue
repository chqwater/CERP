<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()

const handleLogout = () => {
  userStore.logout()
}
</script>

<template>
  <div class="navbar">
    <a href="https://inf.unideb.hu">
      <img src="../asset/de_ik.png" height="70px">
    </a>
    <p style="font-size: 20px; font-weight: bold;">Cost-effective Route Planning System</p>
    <div class="right-menu">
      <el-dropdown class="dropdown" trigger="click">
        <div class="el-dropdown-link">
          {{ userStore.name }}
          <el-icon style="margin-left: 4px;">
            <ArrowDown />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-item @click="handleLogout">Logout</el-dropdown-item>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar {
  z-index: 1000;
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  background-color: rgb(255, 255, 255);
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  position: fixed;
  .right-menu{
    position: fixed;
    right: 10px;
  }
}
</style>