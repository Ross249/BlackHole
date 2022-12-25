// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import "./main.css";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import * as dat from "dat.gui";

// init
let scene, camera, renderer;
let composer, effectBloom;
let observer, camControl;

// Scene drawing
let material, mesh, uniforms;
let loader, textureLoader;
let textures;

// dat.gui
let camconf, effectconf, perfconf, bloomconf, etcconf;
let stats;

// update
let delta, lastframe;
let time;

window.onload = () => {
  lastframe = Date.now();

  init();
  addGUI();
  addMonitor();
  update();
};

const init = () => {
  let container = document.getElementById("root");
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    100
  );
  camera.position.set(0, -4, -1.5);
};

const addGUI = () => {
  perfconf = {
    resolution: 1.0,
    quality: "medium",
  };

  let gui = new dat.GUI();
  let perFolder = gui.addFolder("Performance");
  perFolder.add(perfconf, "resolution", [0.25, 0.5, 1.0, 2.0, 4.0]);
};

const update = () => {
  delta = (Date.now() - lastframe) / 1000;
  time += delta;
  stats.update();
  renderer.setPixelRatio(window.devicePixelRatio * perfconf.resolution);
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(
    window.innerWidth * perfconf.resolution,
    window.innerHeight * perfconf.resolution
  );
  requestAnimationFrame(update);
  lastframe = Date.now();
};

// window.onbeforeunload = () => {
//   for (let index = 0; index < textures.length; index++) {
//     textures[index].dispose();
//   }
// };

const loadTexture = (
  name,
  image,
  interpolation,
  wrap = THREE.ClampToEdgeWrapping
) => {
  textures[name] = null;
  loader.load(image, (texture) => {
    texture.magFilter = interpolation;
    texture.minFilter = interpolation;
    texture.wrapT = wrap;
    texture.wrapS = wrap;
    textures[name] = texture;
  });
};

const addMonitor = () => {
  stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = "absolute";
  stats.domElement.style.left = "0px";
  stats.domElement.style.top = "0px";
  document.body.appendChild(stats.domElement);
};
