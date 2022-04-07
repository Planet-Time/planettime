// index.js
// const app = getApp()
// const { envList } = require('../../envList.js');

// Page({

// });

import { createScopedThreejs } from 'threejs-miniprogram'

Page({
    onReady() {
        wx.createSelectorQuery()
            .select('#webgl')
            .node()
            .exec((res) => {
                const canvas = res[0].node
                // 创建一个与 canvas 绑定的 three.js
                const THREE = createScopedThreejs(canvas)
                // 传递并使用 THREE 变量
                var camera, scene, renderer;
                var mesh;
                let T0 = new Date();//上次时间
                init();
                animate();
                function init() {
                    camera = new THREE.PerspectiveCamera(70, canvas.width / canvas.height, 1, 1000);
                    camera.position.z = 400;
                    scene = new THREE.Scene();
                    var geometry = new THREE.BoxBufferGeometry(100, 100, 100);
                    var material = new THREE.MeshBasicMaterial({ color: 0x0000ff, });
                    mesh = new THREE.Mesh(geometry, material);
                    scene.add(mesh);
                    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                    renderer.setSize(canvas._width, canvas._height);
                    renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
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
                    mesh.rotateY(0.001 * t);
                    mesh.rotateX(0.001 * t);
                    renderer.render(scene, camera);
                }
            })
    }
})