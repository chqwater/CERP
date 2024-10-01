<template>
	<div class="container">
		<div class="left-bar">
			<div class="left-head">
				<el-segmented v-model="inputMode" :options="inputOptions" style="position: absolute; left:10px; top: 10px;"
					@change="clearInputData"></el-segmented>
				<div class="input-area select-map" v-if="inputMode === inputOptions[0]">
					<div class="single-input">
						<el-input disabled placeholder="Please select the Origin on map" :value="originCoordinates" />
						<el-button color="rgb(0, 72, 2)" style="margin-left: 10px;" :icon="AddLocation" circle
							@click="handleOnStartBtn" />
					</div>
					<div class="single-input">
						<el-input disabled placeholder="Please select the Destination on map" :value="destinationCoordinates" />
						<el-button color="rgb(0, 72, 2)" style="margin-left: 10px;" :icon="AddLocation" circle
							@click="handleOnEndBtn" />
					</div>
				</div>
				<div class="input-area input-data" v-else>
					<div class="single-input">
						<el-input style="margin-right: 5px;" placeholder="Origin Latitude" v-model="inputProp.startLat" />
						<el-input style="margin-left: 5px;" placeholder="Origin Longitude" v-model="inputProp.startLon" />
					</div>
					<div class="single-input">
						<el-input style="margin-right: 5px;" placeholder="Destination Latitude" v-model="inputProp.endLat" />
						<el-input style="margin-left: 5px;" placeholder="Destination Longitude" v-model="inputProp.endLon" />
					</div>
				</div>
				<div class="search-btn">
					<el-button color="rgb(0, 72, 2)" :icon="Search" round @click="handleSearch" >Search</el-button>
				</div>
				<div class="switch-mode" v-show="showRouteResult">
					<div class="mode-btn">Cost effective</div>
					<div class="mode-btn">Fastest</div>
				</div>
			</div>

			<div class="route-result">
				<div class="result" v-if="showRouteResult">{{ routeResult.routePath }}</div>
				<el-empty description="WELCOME! TRY TO SEARCH A ROUTE!" v-else/>
			</div>
		</div>
		<div class="map-container">
			<el-amap :center="center" :zoom="zoom" :showLabel="false" @click="handleMapClick" defaultCursor="Pointer" style="position: fixed;"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { ElAmap } from "@vuemap/vue-amap";
import { AddLocation, Pointer, Search } from '@element-plus/icons-vue';
import { getFatestRoute, getCostEffectiveRoute } from '@/api/route';
import { ElLoading } from 'element-plus';

const center = ref([112.578781, 37.813948]);
const zoom = ref(12);
const inputMode = ref('select on map');
const inputOptions = ['select on map', 'input a coordinates'];

const showRouteResult = ref(false);
const inputProp = reactive({
	onEnd: false,
	onStart: false,
	startLat: null,
	startLon: null,
	endLat: null,
	endLon: null
})
const fullscreenLoading = ref(false)
const openFullScreen1 = () => {
  fullscreenLoading.value = true
  setTimeout(() => {
    fullscreenLoading.value = false
  }, 2000)
}
const routeResult = reactive({
	routePath: [],
	totalCost: 0
})
const handleOnStartBtn = () => {
	inputProp.onStart = true;
	inputProp.onEnd = false;
}
const handleOnEndBtn = () => {
	inputProp.onEnd = true;
	inputProp.onStart = false;
}


const clearInputData = () => {
	inputProp.startLat = null;
	inputProp.startLon = null;
	inputProp.endLat = null;
	inputProp.endLon = null;
	inputProp.onEnd = false;
	inputProp.onStart = false
}

const originCoordinates = computed(() => {
	if (inputProp.startLat && inputProp.startLon) {
		return `${inputProp.startLon}, ${inputProp.startLat}`;
	}
	return '';
});

const destinationCoordinates = computed(() => {
	if (inputProp.endLat && inputProp.endLon) {
		return `${inputProp.endLon}, ${inputProp.endLat}`;
	}
	return '';
});

const handleMapClick = (e: any) => {
	if (inputProp.onStart) {
		inputProp.startLat = e.lnglat.lat;
		inputProp.startLon = e.lnglat.lng;
		inputProp.onStart = false;
	}
	if (inputProp.onEnd) {
		inputProp.endLat = e.lnglat.lat;
		inputProp.endLon = e.lnglat.lng;
		inputProp.onEnd = false;
	}
	console.log("click on " + e.lnglat.lat + ", " + e.lnglat.lng)
}

const handleSearch = async () => {
	if (inputMode.value === 'select on map') {
		if (inputProp.startLat && inputProp.startLon && inputProp.endLat && inputProp.endLon) {
			const res = await getCostEffectiveRoute({
				startLat: inputProp.startLat,
				startLon: inputProp.startLon,
				endLat: inputProp.endLat,
				endLon: inputProp.endLon
			}).then(res => {
				routeResult.routePath = res.data.path;
				routeResult.totalCost = res.data.totalCost;
			})
			showRouteResult.value = true;
			center.value = [112.578781, 37.813948];
		}
	}
	
}

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
			height: 230px;
			background-color: white;
			width: 380px;
			border-radius: 15px;
			margin: 75px 10px 0 10px;
			position: relative;

			.input-area {
				margin-top: 50px;
				display: flex;
				flex-direction: column;
				display: flex;
				flex-direction: column;


				.single-input {
					display: flex;
					flex-direction: row;
					margin-left: 40px;
					margin-right: 30px;
					margin-top: 10px;
				}
			}

			.search-btn {
				justify-content: end;
				display: flex;
				margin-right: 30px;
				margin-top: 10px;
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
		.route-result{
			display: flex;
			flex-direction: column;
			overflow-y: scroll;
			height: 100%;
			max-height: calc(100vh - 380px);
			width: 100%;
		}
	}

	.map-container {
		width: 100%;
		// height: calc(100vh - 130px);
		height: 100%;
		z-index: 0;
		margin-top: 70px;
	}
}

.left-head .el-segmented {
	--el-segmented-item-selected-color: white;
	--el-segmented-item-selected-bg-color: rgb(0, 72, 2);
	--el-border-radius-base: 16px;
}
</style>