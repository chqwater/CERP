<template>
	<div class="container">
		<div class="left-bar">
			<div class="left-head">
				<div class="input-area">

				</div>
				<div class="switch-mode" v-show="showRouteResult">
					<div class="mode-btn">Cost effective</div>
					<div class="mode-btn">Fastest</div>
					<div class="mode-btn">Least walking</div>
				</div>
			</div>

			<div class="route-result">

			</div>
		</div>
		<div class="map-container">
			<el-amap
      :center="center"
      :zoom="zoom"
      @init="init"
			:showLabel="false"
    />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {ElAmap} from "@vuemap/vue-amap";

const center = ref([112.578781, 37.813948]);
const zoom = ref(12);

const showRouteResult = ref(false);

</script>

<style scoped lang="scss">
.container {
	display: flex;
	flex-direction: row;
	height: 100%;
	width: 100%;

	.left-bar {
		width: 400px;
		height: 100%;
		border-right: 1px solid #e6e6e6;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
		background-color: azure;
		display: flex;
		flex-direction: column;

		.left-head {
			display: flex;
			flex-direction: column;
			height: 250px;
			justify-content: center;
			align-items: center;
			background-color: white;
			width: 380px;
			border-radius: 15px;
			margin: 5px 10px 0 10px;

			.input-area {
				display: flex;
				flex-direction: column;
				height: 200px;
			}

			.switch-mode {
				display: flex;
				flex-direction: row;
				height: 60px;
				width: 100%;
				justify-content: center;
				align-items: center;

				.mode-btn {
					height: 40px;
					width: 100px;
					display: flex;
					cursor: pointer;
					margin: 10px;
					justify-content: center;
					align-items: center;
					color: rgb(0, 72, 2);
				}

				.mode-btn:hover {
					background-color: #e6e6e6;
					border-radius: 5px;
				}
			}

		}
	}
	.map-container {
		width: 100%;
		// height: calc(100vh - 130px);
		height: 100%;
		z-index: 0;
	}
}
</style>