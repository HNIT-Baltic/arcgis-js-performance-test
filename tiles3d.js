import SceneView from "@arcgis/core/views/SceneView";
import WebScene from "@arcgis/core/WebScene";
import IntegratedMesh3DTilesLayer from "@arcgis/core/layers/IntegratedMesh3DTilesLayer.js";

import Ground from "@arcgis/core/Ground.js";
import Basemap from "@arcgis/core/Basemap.js";

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
    url: "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
    title: "Terrain",
  });

  const baseLayer = new IntegratedMesh3DTilesLayer({
    url: "https://tile.googleapis.com/v1/3dtiles/root.json",
    customParameters: {
      key: import.meta.env.VITE_GOOGLE_API_KEY,
    },
  });

  const basemap = new Basemap({
    baseLayers: [baseLayer],
  });

  const webScene = new WebScene({
    basemap,
    ground: new Ground({
      layers: [elevationLayer],
    }),
    initialViewProperties: {
      viewpoint: {
        camera: {
          position: {
            latitude: 54.69444811204887,
            longitude: 25.277940109421998,
            z: 140,
          },
          heading: 0,
          tilt: 95,
          fov: 75,
        },
        viewingMode: "global",
      },
    },
  });
  const sceneView = new SceneView({
    container: "sceneView",
    map: webScene,
  });

  sceneView.ui.components = [];

  window.sceneView = sceneView;

  const promise = await sceneView.when(() => {
    console.log("SceneView is ready");
  });
  createRotationButton(sceneView);

  rotateView(sceneView);

  return promise;
}

load().then(() => {
  performanceTest(false);
});
