import React from 'react';
import * as THREE from 'three';
import '../styles/statistics.css';

class ContributionGraph extends React.Component {

    componentDidMount() {
        fetch('http://api.wangluyuan.cc/statistics/github').then(response => response.json()).then((json) => {
            this.build3DScene(json.data);
        });
    }

    build3DScene(data) {
        const canvas = document.getElementById("contribution-graph");
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setClearColor(0xffffff);

        const fov = 75;
        const aspect = 2;  // the canvas default
        const near = 0.1;
        const far = 10;

        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        camera.position.x = 0;
        camera.position.y = -4;
        camera.position.z = 1.8;
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        const scene = new THREE.Scene();

        const light = new THREE.DirectionalLight(0xFFFFFF, 1);
        light.position.set(0, -5, 5);

        scene.add(light);

        var group = new THREE.Group();

        var geom = new THREE.Geometry();
        var v1 = new THREE.Vector3(0, 0, 0);
        var v2 = new THREE.Vector3(0, 0.1, 0);
        var v3 = new THREE.Vector3(0.06, 0.05, 0);
        var triangle = new THREE.Triangle(v1, v2, v3);
        var normal = triangle.getNormal();
        geom.vertices.push(triangle.a);
        geom.vertices.push(triangle.b);
        geom.vertices.push(triangle.c);
        geom.faces.push(new THREE.Face3(0, 1, 2, normal));
        var start_triangle = new THREE.Mesh(geom, new THREE.MeshNormalMaterial({side: THREE.DoubleSide}));
        start_triangle.position.x = -2.8;
        group.add(start_triangle);

        var end_triangle = new THREE.Mesh(geom, new THREE.MeshNormalMaterial({side: THREE.DoubleSide}));
        end_triangle.position.x = 2.65;
        group.add(end_triangle);


        var currentX = -2.65;
        var currentY = 0.35;
        var index = 0;
        for (var week = 0; week < 53; week++) {
            for (var day = 0; day < 7; day++) {
                var depth = 0.03;
                var color = 0xebedf0;

                if (index < data.length) {
                    const one_data = data[index];
                    depth = 0.03 + 0.05 * one_data.count;
                    color = parseInt(one_data.color.substr(1), 16); // remove first '#'
                }

                let geometry = new THREE.BoxGeometry(0.095, 0.095, depth);
                let material = new THREE.MeshPhongMaterial({ color: color });
                let cube = new THREE.Mesh(geometry, material);

                cube.position.x = currentX;
                cube.position.y = currentY;
                cube.position.z = (depth / 2);

                currentY -= 0.1;
                index++;

                group.add(cube);

            }
            currentX += 0.1;
            currentY = 0.35;
        }

        scene.add(group);

        renderer.render(scene, camera);

        function resizeRendererToDisplaySize(renderer) {
            const canvas = renderer.domElement;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            const needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
                renderer.setSize(width, height, false);
            }
            return needResize;
        }


        function renderWithTime(time) {
            if (resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }

            group.rotateZ(0.003);


            renderer.render(scene, camera);

            requestAnimationFrame(renderWithTime);
        }
        requestAnimationFrame(renderWithTime);
    }



    render() {
        return (
            <canvas id="contribution-graph" className="contribution-graph" width="640" height="320"></canvas>
        );
    }
}

export default ContributionGraph;