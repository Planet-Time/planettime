// index.js
// const app = getApp()
// const { envList } = require('../../envList.js');

// Page({

// });

import { createScopedThreejs } from 'threejs-miniprogram'
var canvas;
// 创建一个与 canvas 绑定的 three.js
var THREE;
var raycaster;
var pointer;
Page({
    onReady() {
        wx.createSelectorQuery()
            .select('#webgl')
            .node()
            .exec((res) => {
                canvas = res[0].node;
                THREE = createScopedThreejs(canvas);
                raycaster = new THREE.Raycaster();
                pointer = new THREE.Vector2();
                // 传递并使用 THREE 变量
                var camera, scene, renderer;
                var Planet;
                var Satellite = new Array();
                var r = 80;
                var angle = 0.0;
                let T0 = new Date();//上次时间
                init();
                animate();
                function init() {
                    scene = new THREE.Scene();
                    var PlanetMash = new THREE.SphereGeometry(40, 40, 40); //行星
                    var SatelliteMash = new THREE.SphereGeometry(10, 40, 40);
                    var PlanetMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff, });
                    var SatelliteMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff, });
                    Planet = new THREE.Mesh(PlanetMash, PlanetMaterial);
                    Satellite[0] = new THREE.Mesh(SatelliteMash, SatelliteMaterial);
                    scene.add(Planet);
                    scene.add(Satellite[0]);

                    var point = new THREE.PointLight(0xffffff);
                    point.position.set(300, 300, 300); //点光源位置
                    scene.add(point); //点光源添加到场景中

                    var width = canvas._width; //窗口宽度
                    var height = canvas._height; //窗口高度
                    var k = width / height; //窗口宽高比
                    var s = 250; //三维场景显示范围控制系数，系数越大，显示的范围越大
                    camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
                    camera.position.set(200, 0, 0); //设置相机位置
                    camera.lookAt(0, 0, 0); //设置相机方向(指向的场景对象)

                    var ambient = new THREE.AmbientLight(0x444444);
                    scene.add(ambient);

                    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                    renderer.setSize(canvas._width, canvas._height);
                    renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
                    pointer.x = -1;
                    pointer.y = -1;
                    // renderer.setClearColor('rgb(135,206,250)', 1.0);
                }

                function onWindowResize() {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(canvas.width, canvas.height);
                }
                function animate() {
                    let T1 = new Date();//本次时间
                    let t = T1 - T0;//时间差
                    T0 = T1;//把本次时间赋值给上次时间
                    canvas.requestAnimationFrame(animate);
                    Planet.rotateY(0.001 * t);
                    Planet.rotateX(0.001 * t);
                    angle = (angle + 0.1 * t) % 360;
                    var cos = Math.cos((angle / 360) * 2 * Math.PI);
                    var sin = Math.sin((angle / 360) * 2 * Math.PI);
                    Satellite[0].position.set(-r * (-1.26 * cos - 0.63 * sin), -r * (0.63 * sin), r * (-1.26 * cos + 0.63 * sin));

                    // 通过摄像机和鼠标位置更新射线
                    raycaster.setFromCamera(pointer, camera);
                    // 计算物体和射线的焦点
                    const intersects = raycaster.intersectObjects(scene.children);
                    for (let i = 0; i < intersects.length; i++) {
                        intersects[i].object.material.color.set(0xff0000);
                        //console.log(intersects);
                    }

                    renderer.render(scene, camera);
                    pointer.x = -1;
                    pointer.y = -1;
                    raycaster.setFromCamera(pointer, camera);
                }
            })
    },
    onPointerMove(event) {
        pointer.x = ((event.detail.x) / canvas._width) * 2.0 - 1;
        pointer.y = - ((event.detail.y - event.target.offsetTop) / canvas._height) * 2.0 + 1;
    }
})