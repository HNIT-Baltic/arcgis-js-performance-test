import SceneView from "@arcgis/core/views/SceneView";
import WebScene from "@arcgis/core/WebScene";
import IntegratedMeshLayer from "@arcgis/core/layers/IntegratedMeshLayer.js";

import Ground from "@arcgis/core/Ground.js";

import ElevationLayer from "@arcgis/core/layers/ElevationLayer.js";
import { createRotationButton, performanceTest, rotateView } from "./utils";

window.app = {
  rotating: true,
  result: {
    run_id: new Date().getTime(),
    library: "ArcGIS",
    load_time_ms: 0,
    fps: 0,
    memory_mb: 0,
  },
  startTime: performance.now(),
};

async function load() {
  const elevationLayer = new ElevationLayer({
    url: "https://tiles.arcgis.com/tiles/GVgbJbqm8hXASVYi/arcgis/rest/services/EGM2008/ImageServer",
    title: "Terrain",
  });

  // Create a VectorTileLayer from a style URL
  const webScene = new WebScene({
    basemap: "satellite",
    ground: new Ground({
      layers: [elevationLayer],
    }),
  });

  const sceneView = new SceneView({
    container: "sceneView",
    map: webScene,
    camera: {
      position: {
        longitude: 8.674300083583844,
        latitude: 50.10836507641185,
        z: 150,
      },
      tilt: 95,
      heading: 0,
      fov: 75,
    },
  });

  sceneView.ui.components = [];

  window.sceneView = sceneView; // Store the sceneView in the global window object

  sceneView.timeExtent = {
    start: new Date("2019-06-12T10:00:00Z"),
    end: new Date("2019-06-12T10:00:00Z"), // Single point in time
  };

  const i3sLayer = new IntegratedMeshLayer({
    url: "https://tiles.arcgis.com/tiles/cFEFS0EWrhfDeVw9/arcgis/rest/services/Buildings_Frankfurt_2021/SceneServer",
  });
  webScene.add(i3sLayer);

  await i3sLayer.when();

  rotateView(sceneView);

  createRotationButton(sceneView);

  return Promise.resolve();
}

load().then(() => {
  performanceTest(false);
});
