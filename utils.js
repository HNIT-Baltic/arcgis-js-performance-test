export const createRotationButton = (view) => {
  const div = document.createElement("button");
  div.style.position = "absolute";
  div.style.top = "10px";
  div.style.left = "10px";
  div.style.backgroundColor = "white";
  div.style.padding = "10px";
  div.style.borderRadius = "5px";
  div.style.cursor = "pointer";
  div.innerText = window.app.rotating ? "Stop Rotation" : "Start Rotation";
  div.style.zIndex = 1000;
  div.style.fontSize = "16px";
  div.style.fontWeight = "bold";
  div.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.5)";
  div.style.transition = "background-color 0.3s, transform 0.3s";
  div.addEventListener("mouseover", () => {
    div.style.backgroundColor = "#f0f0f0";
    div.style.transform = "scale(1.05)";
  });
  div.addEventListener("mouseout", () => {
    div.style.backgroundColor = "white";
    div.style.transform = "scale(1)";
  });
  div.addEventListener("click", () => {
    window.app.rotating = !window.app.rotating;

    if (view) {
      if (window.app.rotating) {
        div.innerText = "Stop Rotation";
        rotateView(view);
      } else {
        div.innerText = "Start Rotation";
      }
    }
  });

  document.body.appendChild(div);
};

export function rotateView(viewer) {
  if (!window.app.rotating) {
    return; // Stop rotation if not rotating
  }
  if (viewer.camera) {
    const camera = viewer.camera.clone();
    camera.heading += 0.25;
    viewer.camera = camera;
    requestAnimationFrame(() => rotateView(viewer));
  }
}

export async function performanceTest(postResults = true) {
  // Record load time
  window.app.result.load_time_ms = performance.now() - window.app.startTime;

  let frameCount = 0;
  const fpsStart = performance.now();
  const fpsDuration = 30000;
  function measureFPS() {
    frameCount++;
    if (performance.now() - fpsStart < fpsDuration) {
      requestAnimationFrame(measureFPS);
    } else {
      window.app.result.fps = frameCount / (fpsDuration / 1000); // Average FPS
      if (performance.memory) {
        window.app.result.memory_mb =
          performance.memory.usedJSHeapSize / (1024 * 1024);
      }

      const urlParams = new URLSearchParams(window.location.search);
      window.app.result.testId = urlParams.get("testId");
      window.app.result.timestamp = new Date().toISOString();

      console.log("Performance Test Results:", window.app.result);
      if (postResults) {
        fetch("http://192.168.1.121:3000/save-results", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(window.app.result),
        })
          .then((response) => response.text())
          .then((results) => {
            console.log("Results saved successfully", results);
            window.location.reload();
          })
          .catch(console.error);
      }
    }
  }
  measureFPS();
}
