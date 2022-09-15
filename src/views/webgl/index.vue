<template>
  <div :class="[activeTab==5?'bgimg':'','content1']">
    <header v-if="true" :class="[activeTab==5?'bgimg':'']">
      <img class="logo" src="@/assets/images/logo.png" alt="" srcset="">
      <div><span :disabled="item.disabled" :class="[activeTab == item.id && !item.disabled ? 'active' : '']" @click="handleclickTabs(item)" v-for="(item, index) in tabs" :key="index">
          {{ item.name=='异常数据'? '':item.name }}
          <el-dropdown v-if="item.name=='异常数据'" @command="handleCommand">
            <span class="el-dropdown-link">
              {{ item.name }}--{{command1}}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="0"> &nbsp;&nbsp;&nbsp;&nbsp; 0 &nbsp;&nbsp;&nbsp;&nbsp; </el-dropdown-item>
                <el-dropdown-item command="1"> &nbsp;&nbsp;&nbsp;&nbsp; 1 &nbsp;&nbsp;&nbsp;&nbsp; </el-dropdown-item>
                <el-dropdown-item command="2"> &nbsp;&nbsp;&nbsp;&nbsp; 2 &nbsp;&nbsp;&nbsp;&nbsp; </el-dropdown-item>
                <el-dropdown-item command="3"> &nbsp;&nbsp;&nbsp;&nbsp; 3 &nbsp;&nbsp;&nbsp;&nbsp; </el-dropdown-item>
                <el-dropdown-item command="4"> &nbsp;&nbsp;&nbsp;&nbsp; 4 &nbsp;&nbsp;&nbsp;&nbsp; </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
      </div>
      <div class="date">
        <p>{{time0}}</p>
        <p class="p2">{{time1}}</p>
      </div>
    </header>
    <div ref="three" id="three"></div>
    <!-- <div ref="cesiumContainer" id="cesiumContainer"></div> -->
    <div class="left" v-if="activeTab!==5 && activeTab!==4 && true">
      <img src="@/assets/images/left.png" alt="" srcset="">
      <div class="demo-date-picker">
        <el-date-picker @change="dateChange" v-model="value" type="date" placeholder="年/月/日" format="YYYY/MM/DD" value-format="YYYY-MM-DD">
          <template #default="cell">
            <div class="cell" :class="{ current: cell.isCurrent }">
              <span class="text">{{ cell.text }}</span>
              <span v-if="isHoliday(cell)" class="holiday" />
            </div>
          </template>
        </el-date-picker>
      </div>

      <div class="dianliangtongji">
        <div class="dltj1">
          <p>进线总电量</p>
          <p><span class="numbers">{{electricStatic[0]}}</span>&nbsp;<span>KWh</span> </p>
          <p class="borders"></p>
        </div>
        <div class="dltj2">
          <p>储能充电电量</p>
          <p><span class="numbers">{{electricStatic[1]}}</span>&nbsp;<span>KWh</span> </p>
          <p class="borders"></p>
        </div>
        <div class="dltj3">
          <p>出线总电量</p>
          <p><span class="numbers">{{electricStatic[2]}}</span>&nbsp;<span>KWh</span> </p>
          <p class="borders"></p>
        </div>

      </div>

      <div class="chunengzhan">
        <img v-if="command1<2 || command1==2" src="@/assets/images/55724.png" alt="" srcset="">
        <img v-if="command1>2" src="@/assets/images/46452.png" alt="" srcset="">
        <span class="numbers numbers1111">{{'3.73'}}</span>
        <span v-if="command1<2 || command1==2" class="numbers numbers2222">{{'良好'}}</span>
        <span v-if="command1>2" class="numbers numbers2222" style="color:red">{{'异常'}}</span>

      </div>
    </div>
    <div class="left" v-if="activeTab==5">
      <img src="@/assets/images/46327.png" alt="" srcset="" />
      <div class="baojinglist">
        <div @click="handledialogVisible(item)" :style="{'color':item.color,backgroundColor:item.type=='温度浮动'?'rgba(48,48,48,0.5)':''}" v-for="(item,index) in baojinglist" :key="index">
          <p class="p1" :style="{width:'75%', 'text-align': 'left',backgroundColor:item.type=='火灾危险'?'rgba(254,52,24,0.3)':''}">
            <span>{{item.name}}</span>
            <span>{{item.time}}</span>
          </p>
          <p class="p2" :style="{width:'25%',backgroundColor:item.type=='火灾危险'?'#FF483D':''}">{{item.type}}</p>
        </div>
      </div>
    </div>
    <div class="right" v-if="activeTab!==5 && activeTab!==4 && true">
      <img src="@/assets/images/right.png" alt="" srcset="">
      <div class="baojinglist">
        <div :class="[item.warning==true ? 'warning':'']" @click="handledialogVisible(item)" :style="{'color':item.color,backgroundColor:item.type=='温度浮动'?'rgba(48,48,48,0.5)':''}" v-for="(item,index) in baojinglist"
          :key="index">
          <p class="p1" :style="{width:'75%', 'text-align': 'left',backgroundColor:item.type=='火灾危险'?'rgba(254,52,24,0.3)':''}">
            <span>{{item.name}}</span>
            <span>{{item.time}}</span>
          </p>
          <p class="p2" :style="{width:'25%',backgroundColor:item.type=='火灾危险'?'#FF483D':''}">{{item.type}}</p>
        </div>
      </div>
      <!-- 实时监控 -->
      <div class="jiankong">
        <div class="left1">
          <p>监控位置</p>
          <el-scrollbar height="120px" width="95px">
            <p :class="[videoSeleted==0?'active':'','scrollbar-demo-item']" @click="videoSeleted = 0">站内#01号</p>
            <p :class="[videoSeleted==1?'active':'','scrollbar-demo-item']" @click="videoSeleted = 1">站内#02号</p>
            <p :class="[videoSeleted==2?'active':'','scrollbar-demo-item']" @click="videoSeleted = 2">站内#03号</p>
            <p :class="[videoSeleted==3?'active':'','scrollbar-demo-item']" @click="videoSeleted = 3">站内#04号</p>
            <p :class="[videoSeleted==4?'active':'','scrollbar-demo-item']" @click="videoSeleted = 4">站内#05号</p>
            <p :class="[videoSeleted==5?'active':'','scrollbar-demo-item']" @click="videoSeleted = 5">站内#06号</p>
            <p :class="[videoSeleted==6?'active':'','scrollbar-demo-item']" @click="videoSeleted = 6">站内#07号</p>
          </el-scrollbar>

        </div>
        <div class="right1">
          <!-- <div class="video"> -->
          <video ref="videoPlayer" class="video-js video" style="margin: auto auto"></video>
          <!-- </div> -->

        </div>

      </div>
    </div>
    <div class="right right4" v-if="activeTab==4">
      <div class="title">
        <img src="@/assets/images/46439.png" alt="" srcset="">
        <p>监控视频列表</p>

      </div>
      <div class="videolist">
        <div :class="[active11==index?'active':'']" @click="handleselecetVideo(item,index)" v-for="(item,index) in videoArr" :key="index">
          <!-- <video :ref="item.id" class="video-js video" style="margin: auto auto"></video> -->
          <video muted @click="handleselecetVideo(item,index)" :src="item.src" controls preload="auto"></video>
        </div>

      </div>

    </div>
    <div class="mingis" v-if="activeTab!==5 && activeTab!==4 && false">
      <img src="@/assets/images/55677.png" alt="" srcset="">
    </div>
    <el-dialog custom-class="customClass" close-on-click-modal="false" show-close="false" destroy-on-close="true" v-model="dialogVisible" fullscreen="true">
      <div class="bodys">
        <div class="videobody">
          <img style="width:100%;height:100%" src="@/assets/images/376.png" alt="">
        </div>
        <img class="img1" src="@/assets/images/55732.png" alt="" srcset="">
        <img @click="close" class="close" src="@/assets/images/55723.png" alt="" srcset="">
      </div>
    </el-dialog>
    <el-dialog custom-class="customClass" close-on-click-modal="false" show-close="false" destroy-on-close="true" v-model="dialogVisible1" fullscreen="true">
      <div class="bodys">
        <video :src="videoArr[index11].src" controls preload="auto"></video>
        <img @click="close1" class="close" src="@/assets/images/55723.png" alt="" srcset="" />
      </div>
    </el-dialog>
    <el-dialog modal="false" custom-class="customClass customClass1" show-close="false" destroy-on-close="true" v-model="dialogVisible2" fullscreen="true">
      <div class="bodys">
        <div class="videobody videobody1">
          <img v-if="!isnext" style="width:100%;height:100%" src="@/assets/images/46070.png" alt="">
          <img v-else style="width:100%;height:100%" src="@/assets/images/55529.png" alt="">
          <div class="btn" v-if="!isnext">
            <div @click="close2"></div>
            <div @click="isnext = true"></div>
          </div>
          <img v-if="isnext" @click="close2" class="close" src="@/assets/images/55723.png" alt="" srcset="" />
        </div>
        <!-- <img class="img1" src="@/assets/images/55732.png" alt="" srcset=""> -->
        <!-- <img @click="close2" class="close" src="@/assets/images/55723.png" alt="" srcset=""> -->
      </div>
    </el-dialog>

  </div>
</template>

<script lang="ts" setup>
import videojs from "video.js";
import "video.js/dist/video-js.css";
import * as THREE from "three";
import ThreeJs from "./index";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { ElMessageBox } from "element-plus";
// import { Viewer } from 'cesium';
import * as Cesium from "cesium";
// Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNzU2NTdlOS00ODUzLTRiOGQtYmIxZi02OGE0NDkzNzViYmIiLCJpZCI6MTAzMTU5LCJpYXQiOjE2NTkzMTg3OTR9.WszZb_zTVRhyUwHcbV60dqLKQYDgSOIAFCxsnD2sFPk"
import {
  reactive,
  ref,
  computed,
  nextTick,
  Ref,
  onMounted,
  onUnmounted,
} from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

import { toRaw } from "@vue/reactivity";
/**
 * 报警数据
 */
let command1: Ref<string | number | object> = ref(0);
const handleCommand = (command: string | number | object) => {
  command1.value = command;
  if (command <= 2) {
    three.scene.remove(three.cube7);
    setTimeout(() => {
      three.render();
    });
  }
  if (command > 2 && activeTab.value !== 5) {
    if (activeTab.value !== 5) {
      var ceshi = null;
      for (var i = 0; i < baojinglist.length; i++) {
        if (baojinglist[i].name == "储能报警") {
          ceshi = baojinglist[i]; //声明一个对象保存符合要求的数据
          baojinglist.splice(i, 1); //先把符合条件的数据从当前数组中删除
          break;
        }
      }
      ceshi.warning = true;
      ceshi.type = "较高";
      baojinglist.unshift(ceshi); //通过unshift函数把符合要求的数据放到第一位
      three.chunengzhan();
      three.initTubeModel1();
      dialogVisible2.value = true;
    } else {
      three.scene.remove(three.cube7);
      setTimeout(() => {
        three.render();
      });
    }
  }
};

const dialogVisible = ref(false);
const handledialogVisible = (data) => {
  if (data.type == "火灾危险") {
    dialogVisible.value = true;
  }
};
const close = () => {
  dialogVisible.value = false;
};
let activeTab: Ref<number> = ref(1);
let time0: Ref<string> = ref("00:00:00");
let time1: Ref<string> = ref("");
let tiemEq = null;
let tabs = ref([
  { name: "变电站总览", id: 1, disabled: false },
  { name: "设备状态", id: 2, disabled: false },
  { name: "线路管廊", id: 3, disabled: false },
  { name: "安防监控", id: 4, disabled: false },
  { name: "能流信息流", id: 5, disabled: false },
  { name: "虚拟漫游", id: 6, disabled: false },
  { name: "安全预案", id: 7, disabled: false },
  { name: "异常数据", id: 8, disabled: true },
]);
// 点击tabs
const handleclickTabs = (data) => {
  if (data.disabled) return;
  activeTab.value = data.id;
  console.log(three);
  if (data.id == 5) {
    three.hide();
    three.setBox();
    three.scene.remove(three.cube7);
    // three.removeBox();
    setTimeout(() => {
      three.render();
    });
  } else {
    three.spriteMeshShow();
    three.stopAnimate();
    three.show();
    if (command1.value > 2) {
      three.initTubeModel1();
    } else {
      three.scene.remove(three.cube7);
    }
    setTimeout(() => {
      three.render();
      myPlayerInit();
    });
  }
};
const timeNow = () => {
  let vWeek, vWeek_s, year, month, day, hours, minutes, seconds;
  vWeek = [
    "星期天",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  let date = new Date();
  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();
  hours = date.getHours();
  hours = hours > 9 ? hours : "0" + hours;
  minutes = date.getMinutes();
  minutes = minutes > 9 ? minutes : "0" + minutes;
  seconds = date.getSeconds();
  seconds = seconds > 9 ? seconds : "0" + seconds;
  vWeek_s = date.getDay();
  let time =
    year +
    "/" +
    month +
    "/" +
    day +
    "|" +
    "\t" +
    hours +
    ":" +
    minutes +
    ":" +
    seconds +
    "\t" +
    vWeek[vWeek_s];
  time1.value = year + "/" + month + "/" + day + " | " + vWeek[vWeek_s];
  time0.value = hours + ":" + minutes + ":" + seconds;
  // return time
};
const getAll = () => {
  tiemEq = setInterval(() => {
    /* 时间 */
    timeNow();
  }, 1000);
};
/**
 * left 内容
 */
const value = ref("");
const holidays = [
  "2021-10-01",
  "2021-10-02",
  "2021-10-03",
  "2021-10-04",
  "2021-10-05",
  "2021-10-06",
];

const isHoliday = ({ dayjs }) => {
  return holidays.includes(dayjs.format("YYYY-MM-DD"));
};
let electricStatic = reactive([526, 2581, 2581]);
const dateChange = (date) => {
  electricStatic[0] = Math.floor(300 + Math.random() * 300);
  electricStatic[0] = Math.floor(2000 + Math.random() * 1000);
  electricStatic[0] = Math.floor(2000 + Math.random() * 1000);
};
/**
 * right 内容
 */
type obj = {
  name: string;
  time: string;
  type: string;
  color?: string;
  warning?: boolean;
};
let baojinglist = reactive<obj[]>([
  {
    name: "10kV开关柜告警",
    time: "14:12:52",
    type: "异常",
    color: "#FFFFFF",
    warning: false,
  },
  {
    name: "火灾报警装置告警",
    time: "14:12:52",
    type: "火灾危险",
    color: "#FFFFFF",
    warning: false,
  },
  {
    name: "非法访客闯入 - 南门",
    time: "14:12:52",
    type: "非法访客",
    color: "#FFFFFF",
    warning: false,
  },
  {
    name: "主变本体油温高告警",
    time: "14:12:52",
    type: "温度浮动",
    color: "#FFFFFF",
    warning: false,
  },
  {
    name: "储能报警",
    time: "14:12:52",
    type: "较低",
    color: "#FFFFFF",
    warning: false,
  },
]);

/**
 * 视频
 */
let videoSeleted = ref(0);
const videoPlayer = ref(null);

const myPlayer = ref(null);
const myPlayerInit = () => {
  myPlayer.value = videojs(
    videoPlayer.value,
    {
      poster: "/1/v1.jpg",
      controls: true,
      //自动播放属性,muted:静音播放
      autoplay: "muted",
      //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
      preload: "auto",
      sources: [
        {
          // src: "/v1.mp4",
          src: "/1/IMG_5890.MOV",
          type: "video/mp4",
        },
      ],
      controlBar: {
        fullscreenToggle: false,
        remainingTimeDisplay: {
          displayNegative: false,
        },
      },
      // playbackRates: [0.5, 1, 1.5, 2],
    },
    () => {
      myPlayer.value.log("play.....");
    }
  );
};
const videoArr = reactive([
  {
    poster: "/1/v1.jpg",
    src: "/1/IMG_5890.MOV",
    id: ref(null),
  },
  {
    poster: "/1/v1.jpg",
    src: "/1/IMG_5945.MOV",
    id: ref(null),
  },
  {
    poster: "/1/v1.jpg",
    src: "/1/IMG_5945.MOV",
    id: ref(null),
  },
  {
    poster: "/1/v1.jpg",
    src: "/1/IMG_5945.MOV",
    id: ref(null),
  },
  {
    poster: "/1/v1.jpg",
    src: "/1/IMG_5953.MOV",
    id: ref(null),
  },
  {
    poster: "/1/v1.jpg",
    src: "/1/IMG_6102.MOV",
    id: ref(null),
  },
  {
    poster: "/1/v1.jpg",
    src: "/1/IMG_6102.MOV",
    id: ref(null),
  },
  {
    poster: "/1/v1.jpg",
    src: "/1/IMG_6102.MOV",
    id: ref(null),
  },
  {
    poster: "/1/v1.jpg",
    src: "/1/IMG_6102.MOV",
    id: ref(null),
  },
]);
let active11 = ref(0);
const dialogVisible1 = ref(false);
const close1 = () => {
  dialogVisible1.value = false;
};
const dialogVisible2 = ref(false);
const isnext = ref(false);
const close2 = () => {
  dialogVisible2.value = false;
  isnext.value = false;
};
const nextdialong = () => {
  // dialogVisible2.value = false;
};
let index11 = ref(0);
const handleselecetVideo = (item, index) => {
  active11.value = index;
  index11.value = index;
  dialogVisible1.value = true;
};
// -------------------------------------------------------------------------------------------------------
let three: ThreeJs = reactive(null);
onMounted(() => {
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
    75.0, // 东
    0.0, // 南
    140.0, // 西
    60.0 // 北
  );
  // const viewer = new Cesium.Viewer("cesiumContainer", {
  //   terrainProvider: Cesium.createWorldTerrain(), //使用Cesium在线Ion地形
  //   infoBox: false, //去掉信息框
  //   homeButton: false, //不显示home按钮
  //   geocoder: false, //不显示查询按钮
  //   sceneModePicker: false, //控制查看器的显示模式
  //   baseLayerPicker: false, //不显示图层选择
  //   navigationHelpButton: false, //不显示帮助按钮
  //   animation: false, //是否播放动画
  //   timeline: false, //不显示时间轴
  //   fullscreenButton: false, //不显示全屏按钮
  //   // imageryProvider: new Cesium.UrlTemplateImageryProvider({
  //   //     url: 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
  //   //   }),
  //   // 天地图底图
  //   // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
  //   //   url: "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=0f7d53d7ede523500b3ee4773dc92acd",
  //   //   layer: "tdtBasicLayer",
  //   //   style: "default",
  //   //   format: "image/jpeg",
  //   //   tileMatrixSetID: "GoogleMapsCompatible",
  //   // }),
  //   // 设置地形
  //   terrainProvider: Cesium.createWorldTerrain({
  //     requestVertexNormals: true,
  //     requestWaterMask: true,
  //   }),
  // });
  // // 去除logo 类型声明为HTMLElement
  // let creditContainer = viewer.cesiumWidget.creditContainer as HTMLElement;
  // creditContainer.style.display = "none";

  // //调用影响中文注记服务
  //   viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({ 
  //       url: "http://{s}.tianditu.gov.cn/cia_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
  //       "&LAYER=cia&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
  //       "&style=default&format=tiles&tk=0f7d53d7ede523500b3ee4773dc92acd",
  //       layer: "tdtImg_c",
  //       style: "default",
  //       format: "tiles",
  //       tileMatrixSetID: "c",
  //       subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
  //       tilingScheme: new Cesium.GeographicTilingScheme(),
  //       tileMatrixLabels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],
  //       maximumLevel: 50,
  //       show: false
  //   }))
  //   var position = Cesium.Cartesian3.fromDegrees(118.660906, 30.967973, 100);
  // // viewer.camera.setView({
  // //   // 指定相机位置
  // //   destination: position,
  // //   // 指定相机视角
  // //   orientation: {
  // //     // 指定相机的朝向,偏航角
  // //     heading: Cesium.Math.toRadians(0),
  // //     // 指定相机的俯仰角,0度是竖直向上,-90度是向下
  // //     pitch: Cesium.Math.toRadians(-20),
  // //     // 指定相机的滚转角,翻滚角
  // //     roll: 0,
  // //   },
  // // });

  // // flyto,让相机飞往宣城电站
  // viewer.camera.flyTo({
  //   destination: position,
  //   orientation: {
  //     heading: Cesium.Math.toRadians(0),
  //     pitch: Cesium.Math.toRadians(-20),
  //     roll: 0,
  //   },
  // });
  // // new ThreeJs(document.getElementById("three"));
  // AMapLoader.load({
  //   key: "4f1ad1b6f5e6cec9ad527923798e1047", // 申请好的Web端开发者Key，首次调用 load 时必填
  //   version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  //   plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等

  // })
  //   .then((AMap) => {
  //     let map = new AMap.Map("three", {
  //       viewMode: "3D",
  //       zoom: 30, //初始化地图级别
  //       showIndoorMap: true,
  //       center: [118.660906, 30.967973], //初始化地图中心点位置
  //       zooms:[2,30],
  //       // layers: [new AMap.TileLayer.Satellite()],
  //       // mapStyle: "amap://styles/darkblue"
  //     });
  //     map.on("click", function (ev) {
  //       var lnglat = ev.lnglat;
  //       console.log(lnglat);
  //     });
  //     let camera = three.camera;
  //     let renderer;
  //     let scene = three.scene;
  //     // 数据转换工具
  //     let customCoords = map.customCoords;
  //     let data = customCoords.lngLatsToCoords([118.660906, 30.967973]);

  //     // 创建 GL 图层
  //     let gllayer = new AMap.GLCustomLayer({
  //       // 图层的层级
  //       zIndex: 10,
  //       // 初始化的操作，创建图层过程中执行一次。
  //       init: (gl) => {
  //         renderer = new THREE.WebGLRenderer({
  //           context: gl, // 地图的 gl 上下文
  //           // alpha: true,
  //           // antialias: true,
  //           // canvas: gl.canvas,
  //         });
  //         console.log(renderer);

  //         // 自动清空画布这里必须设置为 false，否则地图底图将无法显示

  //         // 自动清空画布这里必须设置为 false，否则地图底图将无法显示
  //         renderer.autoClear = false;
  //         const controls = new OrbitControls(camera, renderer.domElement);
  //         // controls.maxPolarAngle = 30
  //         controls.enableZoom = true;
  //         //加惯性
  //         // controls.enableDamping = true;

  //         // 垂直旋转的角度的上限
  //         controls.maxPolarAngle = Math.PI / 4;
  //         // // 垂直旋转的角度的下限
  //         controls.minPolarAngle = Math.PI / 4;

  //         controls.addEventListener("change", (val) => {
  //           three.p1 = camera.position;
  //           three.render();
  //         });
  //         // controls.minDistance =6000
  //         controls.maxDistance = 8000;
  //         three.controls = controls;
  //         // this.handleClick();
  //         //这里 其实就是canvas 画布  renderer.domElement
  //         three.container.appendChild(renderer.domElement);
  //         //渲染完成 监听窗口缩放
  //         window.addEventListener(
  //           "resize",
  //           three.onWindowResize.bind(this),
  //           false
  //         );
  //         scene.position.set(data[0][0], data[0][1], 0);
  //         scene.rotation.x = Math.PI / 2;
  //         scene.scale.set(0.008, 0.008, 0.008);
  //       },
  //       render: () => {
  //         // 这里必须执行！！重新设置 three 的 gl 上下文状态。
  //         renderer.resetState();
  //         // 重新设置图层的渲染中心点，将模型等物体的渲染中心点重置
  //         // 否则和 LOCA 可视化等多个图层能力使用的时候会出现物体位置偏移的问题
  //         customCoords.setCenter([118.660906, 30.967973]);
  //         var { near, far, fov, up, lookAt, position } =
  //           customCoords.getCameraParams();
  //         console.log({ near, far, fov, up, lookAt, position });

  //         // 2D 地图下使用的正交相机
  //         // var { near, far, top, bottom, left, right, position, rotation } = customCoords.getCameraParams();

  //         // 这里的顺序不能颠倒，否则可能会出现绘制卡顿的效果。
  //         camera.near = near;
  //         camera.far = far;
  //         camera.fov = fov;
  //         camera.position.set(position[0],position[1],position[2]);
  //         camera.up.set(up[0],up[1],up[2]);
  //         camera.lookAt(lookAt[0],lookAt[1],lookAt[2]);
  //         camera.updateProjectionMatrix();

  //         // 2D 地图使用的正交相机参数赋值
  //         // camera.top = top;
  //         // camera.bottom = bottom;
  //         // camera.left = left;
  //         // camera.right = right;
  //         // camera.position.set(...position);
  //         // camera.updateProjectionMatrix();

  //         renderer.render(three.scene, camera);

  //         // 这里必须执行！！重新设置 three 的 gl 上下文状态。
  //         renderer.resetState();
  //       },
  //     });
  //     map.add(gllayer);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
  // getAll();
  three = new ThreeJs(document.getElementById("three"));
  console.log(three);
  // myPlayerInit();
});
onUnmounted(() => {
  if (myPlayer.value) {
    myPlayer.value.dispose();
  }
});
let widths = ref(1 / window.devicePixelRatio);
console.log(widths.value);
</script>
<style lang="scss" scoped>
.content1 {
  // background-color: #0861a5;
  width: 100%;
  min-height: 100%;
  position: relative;
  // background: url("@/assets/images/ski.png") no-repeat center center;
  // background-size: cover;
  &.bgimg {
    background-color: #2b2b29;
  }
}
header {
  height: 97px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: inherit;
  z-index: 1;
  background: url("@/assets/images/58901.png") no-repeat center center;
  background-size: 100% 100%;
  &.bgimg {
    background: url("@/assets/images/58901.png") no-repeat center center;
    background-size: 100% 100%;
  }
  .logo {
    // position: ;
    padding-left: 20px;
  }
  span {
    display: inline-block;
    width: 136px;
    height: 39px;
    opacity: 1;
    font-size: 18px;
    font-family: Open Sans;
    font-weight: 400;
    line-height: 39px;
    color: #ffffff;
    text-shadow: 0px 0px 4px rgba(31, 55, 96, 0.5);
    opacity: 1;
    cursor: pointer;
  }
  .active {
    color: #ffffff;
    text-shadow: 0px 0px 4px rgba(31, 55, 96, 0.5);
    opacity: 1;
    background: url("@/assets/images/Frame\ 175.png") no-repeat center center;
    background-size: contain;
  }
  .date {
    p {
      color: #ffffff;
      min-width: 125px;
      font-size: 22px;
      font-family: DIN Alternate;
      font-weight: bold;
      color: #ffffff;
      opacity: 1;
      line-height: 0;
      letter-spacing: 8px;
    }
    .p2 {
      letter-spacing: 0px;
      font-size: 18px;
    }
  }
}
.mingis {
  position: absolute;
  right: 397px;
  top: 747px;
  zoom: v-bind("widths");
}
#three {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.left {
  width: 350px;
  height: 800px;
  background: rgba(0, 16, 28, 0.45);
  position: absolute;
  left: 20px;
  top: 116px;
  zoom: v-bind("widths");
  img {
    width: 100%;
    height: 100%;
  }
  .demo-date-picker {
    position: absolute;
    right: 0;
    top: 237px;
    background-color: transparent !important;
  }
  :deep(.el-date-editor.el-input) {
    width: auto;
  }
  :deep(.el-input__inner) {
    background-color: transparent;
    width: 140px;
    border-radius: 0;
    box-shadow: none;
    color: #ffffff;
  }
  .cell {
    height: 30px;
    padding: 3px 0;
    box-sizing: border-box;
    background-color: transparent !important;
  }
  .cell .text {
    width: 24px;
    height: 24px;
    display: block;
    margin: 0 auto;
    line-height: 24px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    background-color: transparent !important;
  }
  .cell.current .text {
    // background: #626aef;
    color: #fff;
    background-color: transparent !important;
  }
  .cell .holiday {
    position: absolute;
    width: 6px;
    height: 6px;
    // background: var(--el-color-danger);
    border-radius: 50%;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    background-color: transparent !important;
  }
  // 电量统计
  .dianliangtongji {
    position: absolute;
    right: 0;
    top: 257px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    > div {
      width: 30%;
      height: 94px;
      font-size: 14px;
      font-family: Open Sans;
      font-weight: 400;
      line-height: 16px;
      color: #ffffff;
      .numbers {
        font-size: 24px;
        font-family: DIN Alternate;
        font-weight: bold;
      }
      .borders {
        width: 80%;
        height: 0px;
        border: 2px solid #ff9900;
        box-shadow: 0px 2px 6px #ff9900;
        text-align: center;
        margin: 0 auto;
      }
    }
    .dltj2 {
      background: rgba(6, 247, 161, 0.1);
      opacity: 1;
      .borders {
        border: 2px solid #06f7a1;
        box-shadow: 0px 2px 6px #06f7a1;
      }
    }
    .dltj3 {
      background: rgba(0, 255, 255, 0.1);
      opacity: 1;
      .borders {
        border: 2px solid #00ffff;
        box-shadow: 0px 2px 6px #00ffff;
      }
    }
    .dltj1 {
      background: rgba(0, 255, 255, 0.1);
      opacity: 1;
    }
  }
  .chunengzhan {
    width: 300px;
    height: 170px;
    opacity: 1;
    position: absolute;
    right: 29px;
    top: 421px;
    .numbers {
      font-size: 24px;
      font-family: DIN Alternate;
      font-weight: bold;
      color: #fff;
    }
    .numbers1111 {
      position: absolute;
      right: 45px;
      top: 50px;
    }
    .numbers2222 {
      position: absolute;
      right: 45px;
      top: 140px;
      color: #00ffff;
    }
  }
  .baojinglist {
    position: absolute;
    left: 20px;
    top: 246px;
    width: 311px;
    height: 160px;
    box-sizing: border-box;
    > div {
      height: 20%;
      // line-height: 20%;
      display: flex;
      font-size: 14px;
      font-family: Open Sans;
      font-weight: 400;
      cursor: pointer;
      &.warning {
        color: rgb(247, 181, 0) !important;
        font-size: 20px;
        font-weight: 600;
      }
    }
    p {
      padding: 0;
      margin: 0;
    }
    .p1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }
    .p2 {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      margin-left: 10px;
    }
  }
}
.right {
  width: 350px;
  height: 800px;
  background: rgba(0, 16, 28, 0.45);
  position: absolute;
  right: 20px;
  top: 116px;
  zoom: v-bind("widths");
  img {
    width: 100%;
    height: 100%;
    // filter:alpha(opacity=50);
    //  -moz-opacity:0.5;
    //  -khtml-opacity: 0.5;
    fill-opacity: 0.5;
  }
  .baojinglist {
    position: absolute;
    left: 20px;
    top: 406px;
    width: 311px;
    height: 160px;
    box-sizing: border-box;
    > div {
      height: 20%;
      // line-height: 20%;
      display: flex;
      font-size: 14px;
      font-family: Open Sans;
      font-weight: 400;
      cursor: pointer;
      &.warning {
        // color: rgb(247, 181, 0) !important;
        font-size: 20px;
        font-weight: 600;
        background: linear-gradient(
          to right,
          rgb(247, 181, 0),
          rgb(247, 181, 0),
          rgb(247, 181, 0),
          rgb(247, 181, 0),
          rgb(247, 181, 0),
          rgb(247, 181, 0),
          rgb(247, 181, 0)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: hue 3s linear infinite;
        animation-iteration-count: 1;
      }
      @keyframes hue {
        0% {
          filter: hue-rotate(0deg);
        }
        100% {
          filter: hue-rotate(360deg);
        }
      }
    }
    p {
      padding: 0;
      margin: 0;
    }
    .p1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }
    .p2 {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      margin-left: 10px;
    }
  }
  .jiankong {
    position: absolute;
    left: 20px;
    top: 615px;
    width: 311px;
    height: 160px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-content: center;
    .left1 {
      width: 30%;
      height: 160px;
      // overflow-y: auto;
      p {
        width: 83px;
        height: 26px;
        // border: 1px solid #00ffff;
        // background: linear-gradient(180deg, #00ffff 0%, #005acb 100%);
        opacity: 1;
        margin: 0;
        padding: 0;
      }
      :deep(.el-scrollbar__view) {
        padding-top: 10px;
      }
      .scrollbar-demo-item {
        width: 83px;
        height: 26px;
        // line-height: 0px;
        color: rgba(255, 255, 255, 0.8);
        margin: 0;
        padding: 0;
        cursor: pointer;
        &.active {
          border: 1px solid #00ffff;
          background: linear-gradient(180deg, #00ffff 0%, #005acb 100%);
          opacity: 1;
          color: #00ffff;
        }
      }
      .el-scrollbar {
        --el-scrollbar-opacity: 0.3;
        --el-scrollbar-bg-color: #093ca2;
        --el-scrollbar-hover-opacity: 0.5;
        --el-scrollbar-hover-bg-color: #1e54c1;
      }
    }
    .right1 {
      width: 70%;
      background: url("@/assets/images/55704.png") no-repeat center center;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      .video {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.customClass {
  position: relative;
  .bodys {
    position: relative;
    width: 847px;
    height: 404px;
    text-align: center;
    .videobody {
      width: 432px;
      height: 253px;
      position: absolute;
      left: 0;
      top: 50px;
      &.videobody1 {
        width: 261px;
        height: 164px;
        position: absolute;
        left: 45%;
        top: 50%;
      }
    }
    .btn {
      position: absolute;
      left: 0;
      bottom: 18%;
      height: 25%;
      width: 100%;
      display: flex;
      justify-content: space-around;
      > div {
        height: 100%;
        width: 45%;
        cursor: pointer;
      }
    }
    .img1 {
      width: 100%;
      height: 100%;
    }
    .close {
      position: absolute;
      right: -48px;
      top: -48px;
    }
    video {
      width: 100%;
      height: 100%;
    }
  }
}
:deep(.el-dialog__body) {
  padding: calc(var(--el-dialog-padding-primary) + 170px)
    var(--el-dialog-padding-primary);
  display: flex;
  justify-content: center;
}
:deep(.customClass.el-dialog) {
  background-color: rgb(160, 207, 255);
  background: url("@/assets/images/55722.png") no-repeat center center;
  background-size: cover;
}
:deep(.customClass1.el-dialog) {
  background-color: transparent !important;
  background-image: none !important;
}

/* 隐藏video 进度条 */ /* 隐藏video 播放按钮 */
.video::-webkit-media-controls-play-button {
  display: none;
}
/* 隐藏video 进度条 */
.video::-webkit-media-controls-timeline {
  display: none;
}
/* 隐藏video 观看的当前时间 */
.video::-webkit-media-controls-current-time-display {
  display: none;
}
/* 隐藏video 剩余时间 */
.video::-webkit-media-controls-time-remaining-display {
  display: none;
}
/* 隐藏video 音量按钮 */
.video::-webkit-media-controls-mute-button {
  display: none;
}
.video::-webkit-media-controls-toggle-closed-captions-button {
  display: none;
}
/* 隐藏video 音量的控制条 */
.video::-webkit-media-controls-volume-slider {
  display: none;
}
.right4 {
  padding: 20px;
  .title {
    width: 100%;
    height: 42px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 20px;
      height: 20px;
    }
    p {
      padding-left: 10px;
      font-size: 16px;
      font-family: Open Sans;
      font-weight: bold;
      color: #ffffff;
    }
  }
  .videolist {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    > div {
      width: 45%;
      height: 135px;
      padding: 5px;
      display: flex;
      justify-content: center;
      align-content: center;
      border: solid 1px;
      margin-bottom: 10px;
      &.active {
        background: linear-gradient(180deg, #00ffff 0%, #005acb 100%);
      }
      .video-js {
        width: 100%;
        height: 100%;
      }
    }
  }
}
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>