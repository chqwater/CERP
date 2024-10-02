<template>
  <div class="container" v-loading="loading" element-loading-text="Searching...">
    <div class="left-bar">
      <div class="left-head">
        <el-segmented
          v-model="inputMode"
          :options="inputOptions"
          style="position: absolute; left: 10px; top: 10px"
          @change="clearInputData"
        ></el-segmented>
        <div class="input-area select-map" v-if="inputMode === inputOptions[0]">
          <div class="single-input">
            <el-input
              disabled
              placeholder="Please select the Origin on map"
              :value="originCoordinates"
            />
            <el-button
              color="rgb(0, 72, 2)"
              style="margin-left: 10px"
              :icon="AddLocation"
              circle
              @click="handleOnStartBtn"
            />
          </div>
          <div class="single-input">
            <el-input
              disabled
              placeholder="Please select the Destination on map"
              :value="destinationCoordinates"
            />
            <el-button
              color="rgb(0, 72, 2)"
              style="margin-left: 10px"
              :icon="AddLocation"
              circle
              @click="handleOnEndBtn"
            />
          </div>
        </div>
        <div class="input-area input-data" v-else>
          <div class="single-input">
            <el-input
              style="margin-right: 5px"
              placeholder="Origin Longitude"
              v-model="inputProp.startLon"
            />
            <el-input
              style="margin-left: 5px"
              placeholder="Origin Latitude"
              v-model="inputProp.startLat"
            />
          </div>
          <div class="single-input">
            <el-input
              style="margin-right: 5px"
              placeholder="Destination Longitude"
              v-model="inputProp.endLon"
            />
            <el-input
              style="margin-left: 5px"
              placeholder="Destination Latitude"
              v-model="inputProp.endLat"
            />
          </div>
        </div>
        <div class="search-btn">
          <el-button
            color="rgb(0, 72, 2)"
            :icon="Search"
            round
            @click="handleCostEffectiveSearch"
            >Search</el-button
          >
        </div>
        <div class="switch-mode" v-show="showRouteResult">
          <el-segmented v-model="resultMode" :options="resultModeOptions" @change="handleResultModeChange"/>
        </div>
      </div>

      <div class="route-result">
        <div class="result" v-if="showRouteResult">
          <div
            class="result-item"
            v-for="(item, index) in routeResult.routePath"
            :key="index"
          >
            <div v-if="index === 0" class="result-item-content">
              <div class="result-point">
                <div
                  style="
                    background-color: white;
                    width: 100%;
                    border: 1px solid black;
                    height: 20px;
                    border-radius: 50px;
                  "
                ></div>
                <div
                  style="
                    background-color: gray;
                    width: 80%;
                    height: 80px;
                    border-radius: 50px;
                    margin-left: 10%;
                  "
                ></div>
              </div>
              <div>
                <div>Origin</div>
                <div style="margin: 30px 0 0 10px; font-size: 20px">
                  Walk => {{ Math.round(item.duration) }}min
                </div>
              </div>
            </div>
            <div
              v-else-if="index === routeResult.routePath.length - 1"
              class="result-item-content"
            >
              <div class="result-point">
                <div
                  style="
                    background-color: white;
                    width: 100%;
                    border: 1px solid black;
                    height: 20px;
                    border-radius: 50px;
                  "
                ></div>
                <div
                  style="
                    background-color: gray;
                    width: 80%;
                    height: 60px;
                    border-radius: 50px;
                    margin-left: 10%;
                  "
                ></div>
                <div
                  style="
                    background-color: white;
                    width: 100%;
                    border: 1px solid black;
                    height: 20px;
                    border-radius: 50px;
                  "
                ></div>
              </div>
              <div>
                <div>{{ item.fromStation.stationName }}</div>
                <div style="margin: 20px 0 20px 10px; font-size: 20px">
                  Walk => {{ Math.round(item.duration) }}min
                </div>
                <div>Destination</div>
              </div>
            </div>
            <div v-else-if="item.mode === 'WALK'" class="result-item-content">
              <div class="result-point">
                <div
                  style="
                    background-color: white;
                    width: 100%;
                    border: 1px solid black;
                    height: 20px;
                    border-radius: 50px;
                  "
                ></div>
                <div
                  style="
                    background-color: gray;
                    width: 80%;
                    height: 80px;
                    border-radius: 50px;
                    margin-left: 10%;
                  "
                ></div>
              </div>
              <div>
                <div>{{ item.fromStation.stationName }}</div>
                <div style="margin: 30px 0 0 10px; font-size: 20px">
                  Walk => {{ Math.round(item.duration) }}min
                </div>
              </div>
            </div>
            <div v-else-if="item.route.lineType === 'bus'" class="result-item-content">
              <div class="result-point">
                <div
                  style="
                    background-color: white;
                    width: 100%;
                    border: 1px solid black;
                    height: 20px;
                    border-radius: 50px;
                  "
                ></div>
                <div
                  style="
                    background-color: Blue;
                    width: 80%;
                    height: 80px;
                    border-radius: 50px;
                    margin-left: 10%;
                  "
                ></div>
              </div>
              <div>
                <div>{{ item.fromStation.stationName }}</div>
                <div style="margin: 30px 0 25px 10px; font-size: 20px">
                  Bus => {{ Math.round(item.duration) }}min
                </div>
              </div>
            </div>
            <div v-else class="result-item-content">
              <div class="result-point">
                <div
                  style="
                    background-color: white;
                    width: 100%;
                    border: 1px solid black;
                    height: 20px;
                    border-radius: 50px;
                  "
                ></div>
                <div
                  style="
                    background-color: red;
                    width: 80%;
                    height: 80px;
                    border-radius: 50px;
                    margin-left: 10%;
                  "
                ></div>
              </div>
              <div>
                <div>{{ item.fromStation.stationName }}</div>
                <div style="margin: 30px 0 25px 10px; font-size: 20px">
                  Metro => {{ Math.round(item.duration) }}min
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-empty description="WELCOME! TRY TO SEARCH A ROUTE!" v-else />
      </div>
    </div>
    <div class="map-container">
      <el-amap
        :center="center"
        :zoom="zoom"
        :showLabel="false"
        @click="handleMapClick"
        defaultCursor="Pointer"
        style="position: fixed"
      >
        <el-amap-polyline
          :path="routeResult.routeForMap"
          :visible="showRouteResult"
          :strokeWeight="5"
          :strokeOpacity="1"
        />
      </el-amap>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import { ElAmap, ElAmapPolyline } from "@vuemap/vue-amap";
import { AddLocation, Pointer, Search } from "@element-plus/icons-vue";
import { getFatestRoute, getCostEffectiveRoute } from "@/api/route";

const loading = ref(false);
const center = ref([112.578781, 37.813948]);
const zoom = ref(12);
const inputMode = ref("select on map");
const inputOptions = ["select on map", "input a coordinates"];

const showRouteResult = ref(false);
const inputProp = reactive({
  onEnd: false,
  onStart: false,
  startLat: null,
  startLon: null,
  endLat: null,
  endLon: null,
});
const resultMode = ref("Cost-effective");
const resultModeOptions = ["Cost-effective", "Fastest"];

const fullscreenLoading = ref(false);
const openFullScreen1 = () => {
  fullscreenLoading.value = true;
  setTimeout(() => {
    fullscreenLoading.value = false;
  }, 2000);
};
const routeResult = reactive({
  routePath: [] as any[],
  totalCost: 0,
  routeForMap: [] as number[][],
});
const handleOnStartBtn = () => {
  inputProp.onStart = true;
  inputProp.onEnd = false;
};
const handleOnEndBtn = () => {
  inputProp.onEnd = true;
  inputProp.onStart = false;
};

const clearInputData = () => {
  inputProp.startLat = null;
  inputProp.startLon = null;
  inputProp.endLat = null;
  inputProp.endLon = null;
  inputProp.onEnd = false;
  inputProp.onStart = false;
};

const originCoordinates = computed(() => {
  if (inputProp.startLat && inputProp.startLon) {
    return `${inputProp.startLon}, ${inputProp.startLat}`;
  }
  return "";
});

const destinationCoordinates = computed(() => {
  if (inputProp.endLat && inputProp.endLon) {
    return `${inputProp.endLon}, ${inputProp.endLat}`;
  }
  return "";
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
  console.log("click on " + e.lnglat.lat + ", " + e.lnglat.lng);
};

const processResult = () => {
  routeResult.routeForMap = routeResult.routePath.map((point) => [
    point.startLon,
    point.startLat,
  ]);
  const lastPoint = routeResult.routePath[routeResult.routePath.length - 1];
  routeResult.routeForMap.push([lastPoint.endLon, lastPoint.endLat]);
};

const handleCostEffectiveSearch = async () => {
  if (inputProp.startLat && inputProp.startLon && inputProp.endLat && inputProp.endLon) {
    loading.value = true;
    const res = await getCostEffectiveRoute({
      startLat: inputProp.startLat,
      startLon: inputProp.startLon,
      endLat: inputProp.endLat,
      endLon: inputProp.endLon,
    }).then((res) => {
      routeResult.routePath = res.data.path;
      routeResult.totalCost = res.data.totalCost;
      processResult();
    });
    showRouteResult.value = true;
    loading.value = false;
    center.value = [112.578781, 37.813948];
  }
};

const handleFatsetSearch = async () => {
  if (inputProp.startLat && inputProp.startLon && inputProp.endLat && inputProp.endLon) {
    loading.value = true;
    const res = await getFatestRoute({
      startLat: inputProp.startLat,
      startLon: inputProp.startLon,
      endLat: inputProp.endLat,
      endLon: inputProp.endLon,
    }).then((res) => {
      routeResult.routePath = res.data.path;
      routeResult.totalCost = res.data.totalCost;
      processResult();
    });
    showRouteResult.value = true;
    loading.value = false;
    center.value = [112.578781, 37.813948];
  }
};

const handleResultModeChange = (e:any)=>{
	if (e === "Cost-effective"){
		handleCostEffectiveSearch();
		return;
	}
	handleFatsetSearch();
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
      }
    }
    .route-result {
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      height: 100%;
      max-height: calc(100vh - 380px);
      width: 100%;
      .result {
        display: flex;
        flex-direction: column;
        .result-item {
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 100px;
          margin: 0 10px 0 50px;
          border-radius: 15px;
          .result-item-content {
            display: flex;
            flex-direction: row;
          }
        }
      }
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
.result-point {
  display: flex;
  flex-direction: column;
  width: 20px;
  margin-right: 10px;
}

.left-head .el-segmented {
  --el-segmented-item-selected-color: white;
  --el-segmented-item-selected-bg-color: rgb(0, 72, 2);
  --el-border-radius-base: 16px;
}
</style>
