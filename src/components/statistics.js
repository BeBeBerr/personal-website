import React from 'react';
import * as THREE from 'three';
import '../styles/statistics.css';

class ContributionGraph extends React.Component {

    componentDidMount() {
        fetch('https://api.luyuan.wang/statistics/github').then(response => response.json()).then((json) => {
            this.build3DScene(json.data);
        });
    }

    build3DScene(data) {
        const canvas = document.getElementById("contribution-graph");
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setClearColor(0xffffff);

        const fov = 75;
        const aspect = 2;  // the canvas default
        const near = 10;
        const far = 1000;

        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        camera.position.x = 0;
        camera.position.y = -400;
        camera.position.z = 200;
        camera.up.x = 0;
        camera.up.y = 0;
        camera.up.z = 100;
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        const scene = new THREE.Scene();

        const light = new THREE.DirectionalLight(0xFFFFFF, 0.8);
        light.position.set(-500, -500, 500);

        const light2 = new THREE.DirectionalLight(0xFFFFFF, 0.8);
        light2.position.set(500, -500, 500);

        scene.add(light);
        scene.add(light2);

        var group = new THREE.Group();

        const textPlane = this.makeTextLabel("3D GitHub Contributions Graph", {});
        textPlane.position.set(0, 0, 80);
        textPlane.rotateX(Math.PI / 2);
        group.add(textPlane);

        var geom = new THREE.Geometry();
        var v1 = new THREE.Vector3(0, 0, 0);
        var v2 = new THREE.Vector3(0, 10, 0);
        var v3 = new THREE.Vector3(6, 5, 0);
        var triangle = new THREE.Triangle(v1, v2, v3);
        var normal = triangle.getNormal();
        geom.vertices.push(triangle.a);
        geom.vertices.push(triangle.b);
        geom.vertices.push(triangle.c);
        geom.faces.push(new THREE.Face3(0, 1, 2, normal));
        var start_triangle = new THREE.Mesh(geom, new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }));
        start_triangle.position.x = -280;
        group.add(start_triangle);

        var end_triangle = new THREE.Mesh(geom, new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }));
        end_triangle.position.x = 265;
        group.add(end_triangle);


        var currentX = -265;
        var currentY = 35;
        var index = 0;
        for (var week = 0; week < 53; week++) {
            for (var day = 0; day < 7; day++) {
                var depth = 3;
                var color = 0xebedf0; // background color

                if (index < data.length) {
                    const one_data = data[index];
                    depth = 3 + 8 * one_data.count;

                    // GitHub API 变动 下发的所有颜色都是黑色
                    // color = parseInt(one_data.color.substr(1), 16); // remove first '#'
                    
                    if (one_data.count <= 0) {
                        color = 0xebedf0; // background color
                    } else if (one_data.count <= 1) {
                        color = 0x9be9a8;
                    } else if (one_data.count <= 3) {
                        color = 0x40c463;
                    } else {
                        color = 0x216e39;
                    }
                }

                let geometry = new THREE.BoxGeometry(9.5, 9.5, depth);
                let material = new THREE.MeshPhongMaterial({ color: color });
                let cube = new THREE.Mesh(geometry, material);

                cube.position.x = currentX;
                cube.position.y = currentY;
                cube.position.z = (depth / 2);

                currentY -= 10;
                index++;

                group.add(cube);

            }
            currentX += 10;
            currentY = 35;
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

    makeTextLabel(message, parameters) {
        if (parameters === undefined) parameters = {};
        var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
        var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 30;
        var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
        var borderColor = parameters.hasOwnProperty("borderColor") ? parameters["borderColor"] : { r: 0, g: 0, b: 0, a: 0.8 };
        var backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : { r: 255, g: 255, b: 255, a: 1.0 };
        var textColor = parameters.hasOwnProperty("textColor") ? parameters["textColor"] : { r: 0, g: 0, b: 0, a: 1.0 };

        var canvas = document.createElement('canvas');
        canvas.width = 500;
        canvas.height = 200;
        var context = canvas.getContext('2d');
        context.font = "Bold " + fontsize + "px " + fontface;
        var metrics = context.measureText(message);
        var textWidth = metrics.width;

        context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
        context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";

        context.lineWidth = borderThickness;
        this.roundRect(context, borderThickness / 2, borderThickness / 2, (textWidth + borderThickness), fontsize * 1.4 + borderThickness, 8);

        context.fillStyle = "rgba(" + textColor.r + ", " + textColor.g + ", " + textColor.b + ", 1.0)";
        context.fillText(message, borderThickness, fontsize + borderThickness);

        var texture = new THREE.Texture(canvas)
        texture.needsUpdate = true;


        const geometry = new THREE.PlaneBufferGeometry(250, 100);
        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        material.map.minFilter = THREE.LinearFilter;
        material.transparent = true;

        const mesh = new THREE.Mesh(geometry, material);

        return mesh;

    }

    // function for drawing rounded rectangles
    roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    render() {
        return (
            <canvas id="contribution-graph" className="contribution-graph" width="640" height="320"></canvas>
        );
    }
}

export default ContributionGraph;