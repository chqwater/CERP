<template>
	<div class="welcome-page">
		<h1>Welcome to CERP THESIS PROJECT</h1>
		<p>This is a thesis project developed by Chen Haoquan</p>
		<el-button type="primary" @click="handleClick">Try it now!</el-button>
	</div>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter()

const handleClick = () => {
	router.push('/routeSearch')
}
</script>

<style scoped lang="scss">
.welcome-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
}
</style>