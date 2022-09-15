import * as THREE from "three";
//GLTFLoader 需要额外引入
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "dat.gui";
import TWEEN from "@tweenjs/tween.js";
// import { number } from "vue-types";
// const pointsPng = require('/texture/dot.png')
// import mapImage from "/public/textures/map_inverted3.jpg";
import mapImage from "@/assets/map_inverted3.jpg";
console.log(mapImage)
interface coordinate {
  x: number;
  y: number;
  z: number;
}
export default class ThreeJs {
  scene?: THREE.Scene | null = null;
  camera?: THREE.PerspectiveCamera | null = null;
  camera1?: any = null;
  renderer?: THREE.WebGLRenderer | null = null;
  ambientLight?: THREE.AmbientLight | null = null;
  mesh?: THREE.Mesh | null = null;
  sphere?: THREE.Mesh | null = null;
  plane?: THREE.Mesh | null = null;
  cube1?: THREE.Mesh | null = null;
  cube2?: THREE.Mesh | null = null;
  cube3?: THREE.Mesh | null = null;
  cube4?: THREE.Mesh | null = null;
  cube5?: THREE.Mesh | null = null;
  cube6?: THREE.Mesh | null = null;
  cube7?: THREE.Mesh | null = null;
  texture?: THREE.Texture | null = null;
  texture1?: THREE.Texture | null = null;
  pipe?: THREE.Mesh | null = null;
  pipe1?: THREE.Mesh | null = null;
  // 容器
  container?: HTMLElement | null = null;
  // 轨道控制机器初始化
  controls?: OrbitControls | null = null;
  p1?: coordinate = { x: 50, y: 20, z: 100 }; //相机初始位置
  // p1?: coordinate = { x: -82.09419592553607, y: 212.26858635494548, z: 195.75110663407918 }
  // p2?: coordinate = { x: 0, y: 1, z: 10 }; // 相机目标位置点
  // p2?: coordinate = { x: -145, y: 145, z: 165 }; // 相机目标位置点
  p2?: coordinate = { x: -2105, y: 3210, z: 3823 }
  // p2?: coordinate = { x: -2370.4739989303457, y: 6129.266010480305, z: 5652.322960307941 }
  SpriteArray?: object[] = [
    { x: 200, y: 890, z: -1400 },//一次设备室
    { x: -1700, y: 890, z: -1400 },//控制室
    { x: 2300, y: 600, z: -2100 },//10KV 电容
    { x: 2400, y: 530, z: 800 },
    { x: 0, y: 930, z: 0 },
    { x: -1600, y: 930, z: 500 },//一次设备室
    { x: -2500, y: 1200, z: 1800 },
    { x: 0, y: 1200, z: 1800 },
    // { x: 150, y: 930, z: 500 },
  ];
  // 精灵存储
  spriteMesh?: THREE.Group | null = new THREE.Group();
  warningMesh?: THREE.Sprite | null = null;
  //点击选中精灵
  seletedSprite?: THREE.Sprite = null;
  // 模型存储
  group?: THREE.Group = new THREE.Group();
  clock?: THREE.Clock = new THREE.Clock();
  rafId: any = null;
  points: THREE.Points = null
  constructor(container) {
    this.init(container);
  }
  handleClick() {
    // 当前相机所在点位置
    this.p1 = {
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z
    };

    // 使用tween动画
    const tween = new TWEEN.Tween(this.p1);
    tween.to(this.p2, 6000);
    tween.onUpdate(() => {
      // 修改相机位置
      this.camera.position.set(this.p1.x, this.p1.y, this.p1.z);
      this.camera.lookAt(0, 0, 0);
      // console.log(this.p1, this.camera.position);
      // this.controls.target.set(0, 0, 0) // 确保镜头移动后，视觉中心还在圆点处
      // this.controls.update()
    });
    tween.easing(TWEEN.Easing.Quadratic.InOut);
    // 开始动画
    tween.start();
    // console.log("运行handleClick");
  }

  init(container): void {
    //three容器
    this.container = container;
    // 第一步新建一个场景
    this.scene = new THREE.Scene();
    // this.scene.add(this.spriteMesh);
    // 坐标格辅助对象. 网格跟模型底部重合
    // const helper = new THREE.GridHelper(8000, 800);
    // helper.position.y = -3;
    // this.scene.add(helper);
    // this.skyBox()
    this.setCamera();
    // this.setLight();
    this.setRenderer();
    this.setLoader();
    // this.initTubeModel1();
    setTimeout(() => {
      this.handleClick();
      // this.setPlane()
    }, 500)
    this.animate();
    this.guiInit();

    container.addEventListener(
      "mousemove",
      this.onDocumentMouseMove.bind(this),
      false
    );
    container.addEventListener("click", this.onDocumentClick.bind(this), false);
  }
  spriteMeshShow(): void {
    this.spriteMesh.children.map(item => {
      if (item instanceof THREE.Sprite) {
        if (item.name == 'info') {
          item.visible = false
        } else {

          item.visible = true
        }

      }
    })
  }
  removeBox(): void {
    // this.scene.remove(this.sphere)
    // this.scene.remove(this.plane)
    this.scene.remove(this.cube7)
    this.spriteMesh.children.map(item => {
      if (item instanceof THREE.Sprite) {
        if (item.name == 'info') {
          item.visible = true
        } else {

          item.visible = false
        }

      }
    })
    this.initTubeModel()
    this.animate1()
    // setTimeout(()=>{

    //   this.render()
    // })
  }


  // 新建透视相机
  setCamera(): void {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      500000000
    );

    // // 设置相机位置
    this.camera.position.set(0, 0, 10);
    this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
    //摄像机辅助线
    // const helper = new THREE.CameraHelper(this.camera);
    // this.scene.add(helper);

    const axesHelper = new THREE.AxesHelper(5000);
    this.scene.add(axesHelper);
  }

  // 设置渲染器
  setRenderer(): void {
    /***
     * logarithmicDepthBuffer  解决闪面问题
     * 
     */
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, logarithmicDepthBuffer: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // 设置画布的大小
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    //设置背景颜色
    this.renderer.setClearColor(0x0974C6, 1);
    // 开启阴影渲染
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //轨道控制机器初始化
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    // controls.maxPolarAngle = 30
    controls.enableZoom = true;
    //加惯性
    // controls.enableDamping = true;

    // 垂直旋转的角度的上限
    // controls.maxPolarAngle = Math.PI / 4
    // // // 垂直旋转的角度的下限
    // controls.minPolarAngle = Math.PI / 4

    controls.addEventListener("change", (val) => {
      this.render();
      // console.log(this.scene)
    });
    // controls.minDistance =6000
    // controls.maxDistance = 8000
    this.controls = controls;
    // this.handleClick();
    //这里 其实就是canvas 画布  renderer.domElement
    this.container.appendChild(this.renderer.domElement);
    //渲染完成 监听窗口缩放
    window.addEventListener("resize", this.onWindowResize.bind(this), false);
  }

  // 设置光源
  setLight(): void {
    if (this.scene) {
      //点光源
      const point = new THREE.PointLight(0xffffff);
      point.position.set(4000, 2000, 3000); //点光源位置
      // point.position.set(400, 200, 300); //点光源位置
      point.castShadow = true;
      this.scene.add(point); //点光源添加到场景中
      //环境光
      const ambientLight = new THREE.AmbientLight(0xffffff); // 环境光
      this.scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(400, 200, 300);
      directionalLight.castShadow = true;
      this.scene.add(directionalLight);

    }
  }

  //导入模型
  setLoader(): void {
    if (this.scene) {
      //导入glb模型
      const loader = new GLTFLoader();
      loader.load(
        "/bianbdianzhan/bdz.gltf",
        function (object) {
          object.scene.traverse(gltf => {
            if (gltf.isMesh) {
              console.log(gltf);
              gltf.material.emissive =  gltf.material.color;
              gltf.material.emissiveMap = gltf.material.map ;
              // gltf.material.color.set(0xffffff * Math.random());
            }
          });
          object.scene.name = "gltf";
          object.scene.scale.set(100, 100, 100);
          this.group.add(object.scene);
          this.scene.add(this.group);
          // console.log('FBX', object)
          this.SpriteArray.map((item, index) => {
            // console.log(789798)
            this.createSpriteShape(item, index);
          });
          this.render();
        }.bind(this)
      );
      // const loader2 = new FBXLoader();
      // // console.log(loader2)
      // let textureLoader = new THREE.TextureLoader();
      // loader2.load(
      //   // "/bdz.FBX",
      //   "/biandianzhan.FBX",
      //   function (object) {
      //     object.traverse((child) => {
      //       if (child instanceof THREE.Mesh) {
      //         console.log(child)
      //         child.name = 'FBX'
      //         //贴图
      //         child.material.map = textureLoader.load('/tietu.jpg')
      //         //颜色
      //         child.material = new THREE.MeshPhongMaterial({ color: child.material.color, transparent: true, opacity: 1 })
      //         // child.material.color.set(0xFFFFFF * Math.random())
      //         child.castShadow = true; //开启渲染阴影，默认值为false
      //       }

      //     })
      //     object.name = 'fbx'
      //     // object.scale.set(0.05, 0.05, 0.05);
      //     object.castShadow = true; //开启渲染阴影，默认值为false
      //     this.group.add(object);
      //     this.scene.add(this.group);
      //     // console.log('FBX', object)
      //     this.SpriteArray.map((item, index) => {
      //       // console.log(789798)
      //       this.createSpriteShape(item, index);
      //     });
      //     //   this.render();
      //   }.bind(this)
      // );

    }
  }
  setBox(): void {
    const geometry1 = new THREE.BoxGeometry(800, 400, 200);
    const material1 = new THREE.MeshPhongMaterial({ color: 0x65A49A, transparent: true, opacity: 0.6 })
    this.cube1 = new THREE.Mesh(geometry1, material1);
    this.cube1.position.set(0, 0, -1200);
    this.scene.add(this.cube1);

    const geometry2 = new THREE.BoxGeometry(500, 400, 400);
    const material2 = new THREE.MeshPhongMaterial({ color: 0x65A49A, transparent: true, opacity: 0.6 })
    this.cube2 = new THREE.Mesh(geometry2, material2);
    this.cube2.position.set(-500, 0, -1800);
    this.scene.add(this.cube2);

    const geometry3 = new THREE.BoxGeometry(300, 200, 200);
    const material3 = new THREE.MeshPhongMaterial({ color: 0x65A49A, transparent: true, opacity: 0.6 })
    this.cube3 = new THREE.Mesh(geometry3, material3);
    this.cube3.position.set(500, 0, -1800);
    this.scene.add(this.cube3);

    const geometry4 = new THREE.BoxGeometry(800, 400, 200);
    const material4 = new THREE.MeshPhongMaterial({ color: 0x65A49A, transparent: true, opacity: 0.6 })
    this.cube4 = new THREE.Mesh(geometry4, material4);
    this.cube4.position.set(-1800, 0, -1200);
    this.scene.add(this.cube4);

    const geometry5 = new THREE.BoxGeometry(800, 400, 200);
    const material5 = new THREE.MeshPhongMaterial({ color: 0x65A49A, transparent: true, opacity: 0.6 })
    this.cube5 = new THREE.Mesh(geometry5, material5);
    this.cube5.position.set(-1800, 0, -1500);
    this.scene.add(this.cube5);

    const geometry6 = new THREE.BoxGeometry(800, 400, 200);
    const material6 = new THREE.MeshPhongMaterial({ color: 0x65A49A, transparent: true, opacity: 0.6 })
    this.cube6 = new THREE.Mesh(geometry6, material6);
    this.cube6.position.set(-1800, 0, -1800);
    this.scene.add(this.cube6);

    this.removeBox()
  }
  //
  show() {
    this.group.children[0].children.forEach(child => {
      let textureLoader = new THREE.TextureLoader();
      if (child instanceof THREE.Mesh) {
        child.material.map = textureLoader.load('/tietu.jpg')
        //颜色
        child.material = new THREE.MeshPhongMaterial({ color: child.material.color, transparent: true, opacity: 1 })
        // child.material.wireframe = false;
      }
    })
    this.scene.remove(this.cube1)
    this.scene.remove(this.cube2)
    this.scene.remove(this.cube3)
    this.scene.remove(this.cube4)
    this.scene.remove(this.cube5)
    this.scene.remove(this.cube6)
    this.scene.remove(this.pipe)
  }
  //
  hide() {
    this.group.children[0].children.forEach(child => {
      let textureLoader = new THREE.TextureLoader();
      if (child instanceof THREE.Mesh) {
        child.material.map = textureLoader.load('/tietu.jpg')
        child.material = new THREE.MeshPhongMaterial({ color: child.material.color, transparent: true, opacity: 0.5 })
      }
    })
  }
  initTubeModel() {
    var pointsArr = [
      [0, 0, 25],
      [0, 0, -4],
      [20, 0, -4],
      [20, 0, -15]
    ];
    var curve: any = this.createPath(pointsArr)
    var tubeGeometry = new THREE.TubeGeometry(curve, 500, 0.2, 100, false);
    var textureLoader = new THREE.TextureLoader();
    this.texture = textureLoader.load('/sky/left.png'); //./ZS箭头.svg  ./arrow.jpg
    // 设置阵列模式为 RepeatWrapping
    this.texture.wrapS = THREE.MirroredRepeatWrapping
    this.texture.wrapT = THREE.ClampToEdgeWrapping
    this.texture.repeat.x = 50;
    this.texture.repeat.y = 2;
    this.texture.offset.y = 0.5;

    var tubeMaterial = new THREE.MeshPhongMaterial({
      map: this.texture,
      transparent: true,
      // color: 0x47d8fa,
      color: 0xFACF43,
      side: THREE.DoubleSide,
      //opacity: 0.4,
    });

    // 设置数组材质对象作为网格模型材质参数
    this.pipe = new THREE.Mesh(tubeGeometry, tubeMaterial); //网格模型对象Mesh
    // mesh.position.y = 2;
    this.pipe.position.set(0, 500, 0)
    this.pipe.rotateZ(3.14);
    this.pipe.scale.set(80, 80, 80);
    this.scene.add(this.pipe); //网格模型添加到场景中
  }
  initTubeModel1() {
    const geometry1 = new THREE.BoxGeometry(1300, 600, 300);
    const material1 = new THREE.MeshPhongMaterial({ color: 0xf7b500, transparent: true, opacity: 0.7, depthTest: false })
    this.cube7 = new THREE.Mesh(geometry1, material1);
    this.cube7.position.set(2700, 0, 920);
    this.scene.add(this.cube7);
    this.animate1()
  }
  createPath(pointsArr) {
    pointsArr = pointsArr.map((point) => new THREE.Vector3(...point)); // 将参数数组转换成点数组的形式

    // 方法一：自定义三维路径 curvePath
    const path = new THREE.CurvePath();
    for (let i = 0; i < pointsArr.length - 1; i++) {
      const lineCurve = new THREE.LineCurve3(pointsArr[i], pointsArr[i + 1]); // 每两个点之间形成一条三维直线
      path.curves.push(lineCurve); // curvePath有一个curves属性，里面存放组成该三维路径的各个子路径
    }
    return path;
  }
  // 渲染
  render(): void {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
      // console.log(this.camera.position);
      // console.log(this.camera);
      //    this.controls.enabled = false
    }
  }

  // 动画
  animate(): void {
    // if (this.camera.position.x !== this.p2.x) {
    const time = this.clock.getDelta();
    // console.log("两帧时间间隔：" + time);
    // requestAnimationFrame(this.animate.bind(this));
    const rafId = requestAnimationFrame(this.animate.bind(this));
    // console.log(rafId);
    TWEEN.update();
    this.controls.update()
    // if(this.points) {

    //   this.points.rotation.y += -0.001
    // }
    this.render();
    // console.log('rafId', rafId)
    // if(this.texture1) {
    //   this.texture1.offset.x -= 0.04

    // }
    // if (rafId == 800 || rafId > 800) {
    //   // 停止动画
    //   cancelAnimationFrame(rafId)
    // }
    
    // }
  }
  // 动画
  animate1(): void {

    this.rafId = requestAnimationFrame(this.animate1.bind(this));
    // console.log(rafId);
    // TWEEN.update();
    // this.controls.update()
    this.render();
    if (this.texture) {
      this.texture.offset.x -= 0.04

    }

  }
  stopAnimate(): void {
    cancelAnimationFrame(this.rafId)
  }
  // 窗口大小变化
  onWindowResize() {
    this.camera.aspect = window.innerWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, this.container.clientHeight);
  }
  // GUI控制器
  guiInit() {
    this.camera.position.set(this.p1.x, this.p1.y, this.p1.z);
    const gui = new GUI();
    (function (gui, vector3, name) {
      const folder = gui.addFolder(name);
      folder
        .add(vector3, "x", -8000, 8000)
        .onChange(value => {
          this.camera.position.set(value, vector3.y, vector3.z);
          this.camera.lookAt(0, 0, 0);
          this.render();
        })
        .onFinishChange(val => {
          // console.log("Finish", val);
        });
      folder
        .add(vector3, "y", -8000, 8000)
        .onChange(value => {
          this.camera.position.set(vector3.x, value, vector3.z);
          this.camera.lookAt(0, 0, 0);
          this.render();
        })
        .onFinishChange(val => {
          // console.log("Finish", val);
        });
      folder
        .add(vector3, "z", -8000, 8000)
        .onChange(value => {
          this.camera.position.set(vector3.x, vector3.y, value);
          this.camera.lookAt(0, 0, 0);
          this.render();
        })
        .onFinishChange(val => {
          // console.log("Finish", val);
        });
      folder.open();
    }.bind(this)(gui, this.p2, "position"));
  }
  //绘制canvas 添加精灵
  createSpriteShape(position, index) {
    var textureArr = [
      {
        url: "/sprite/55525.png",
        name: '1'

      },
      {
        url: "/sprite/55526.png",
        name: '2'

      },
      {
        url: "/sprite/55527.png",
        name: '3'

      },
      {
        url: "/sprite/55528.png",
        name: '4'

      },
      {
        url: "/sprite/55529.png",
        name: '5'

      },
      {
        url: "/sprite/55530.png",
        name: '6'

      },
      {
        url: "/sprite/55531.png",
        name: '7'

      },
      {
        url: "/sprite/55533.png",
        name: '8'

      },
      {
        url: "/sprite/55534.png",
        name: 'info'

      }
    ]
    var textureLoader = new THREE.TextureLoader();
    var map = textureLoader.load(textureArr[index].url);
    var material = new THREE.SpriteMaterial({
      map: map,
      color: 0xffffff,
      fog: false,
      transparent: true

    });
    var mesh = new THREE.Sprite(material);
    mesh.position.set(position.x, position.y, position.z);
    mesh.name = textureArr[index].name;
    mesh.scale.set(600, 200, 0);
    if (textureArr[index].name == 'info') {
      mesh.scale.set(1000, 600, 0);
      mesh.visible = false

    }
    //   this.scene.add(mesh);
    this.spriteMesh.add(mesh)
    //   this.scene.add(mesh);
    this.scene.add(this.spriteMesh);
    // console.log(this.spriteMesh)
  }

  onDocumentMouseMove(event, type) {
    return new Promise<THREE.Sprite>((resolve, reject) => {


      const pointer = new THREE.Vector2();
      //精灵位置拾取不精确 大多数原因是没有用getBoundingClientRect 获取元素位置
      // rect.top：元素上边到视窗上边的距离;
      // rect.right：元素右边到视窗左边的距离;
      // rect.bottom：元素下边到视窗上边的距离;
      // rect.left：元素左边到视窗左边的距离;
      // rect.width：是元素自身的宽
      // rect.height是元素自身的高
      const rect = this.renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(pointer, this.camera);
      //精灵集合
      const intersects = raycaster.intersectObjects(this.spriteMesh.children);
      // console.log(intersects)
      // 模型集合
      const intersects1 = raycaster.intersectObjects(this.group.children, true);
      if (intersects.length > 0) {
        // 判断参数this.spriteMesh中模型对象是否与射线相交
        intersects.forEach(
          function (e, index) {
            const obj = e.object;
            // console.log(obj, index)
            obj.name = "";

            // 判断相交的是否是精灵对象并且是对应标签的名称，如果是鼠标变小手
            if (obj instanceof THREE.Sprite) {
              document.body.style.cursor = "pointer";
              if (type == "click") {
                console.log(obj)
                resolve(obj)
                let pos = obj.position;
                // 点击精灵 缓慢切换相机坐标
                this.p2 = pos;
                this.handleClick();
                this.animate();
              }
            }
          }.bind(this)
        );
      } else {
        document.body.style.cursor = "default";
      }

      if (intersects1.length > 0) {
        intersects1.forEach((item, index) => {
          const obj = item.object;
          if (type == "click") {

            if (obj instanceof THREE.Mesh) {
              // console.log(obj, index)
              if (index == 0) {
                //   obj.material.color.set(0xff0000)
                // obj.material.color.set(0xFFFFFF * Math.random())
                // this.render();
              }

            }
          }

        })
      }
    })


  }
  async onDocumentClick(event) {
    let seletedSprite = await this.onDocumentMouseMove(event, "click");
    this.seletedSprite = seletedSprite;
    // console.log(this.seletedSprite)
  }



}
