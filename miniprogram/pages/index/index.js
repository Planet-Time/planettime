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
                    canvas.requestAnimationFrame(animate);
                    mesh.rotation.x += 0.001;
                    mesh.rotation.y += 0.001;
                    renderer.render(scene, camera);
                }
            })
    }
})