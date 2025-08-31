<template>
  <q-page class="camera-live-feed-page">
    <div class="camera-live-feed-container">
      <canvas ref="outputCanvas" class="camera-canvas"></canvas>
      <div class="camera-live-feed-controls">
        <!-- chroma slider moved to settings -->
        <q-btn color="primary" label="Start Camera" @click="startCamera" />
        <q-btn color="secondary" label="Capture" @click="captureFrame" />
        <q-btn color="negative" label="Stop" @click="stopCamera" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { ipcRenderer } from 'electron';

const BACKGROUND_KEY = 'selectedChromaBackground';
const defaultBg =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
const selectedBackground = ref<string>(
  localStorage.getItem(BACKGROUND_KEY) || defaultBg
);

window.addEventListener('storage', () => {
  selectedBackground.value = localStorage.getItem(BACKGROUND_KEY) || defaultBg;
});

const frame = ref<string>('');
let frameListener: ((event: unknown, data: string) => void) | null = null;
const outputCanvas = ref<HTMLCanvasElement | null>(null);
const bgImg = new window.Image();
bgImg.crossOrigin = 'anonymous';
bgImg.src = selectedBackground.value;

const CHROMA_SENS_KEY = 'chromaSensitivity';
const chromaSensitivity = ref(
  Number(localStorage.getItem(CHROMA_SENS_KEY)) || 60
);
window.addEventListener('storage', () => {
  chromaSensitivity.value = Number(localStorage.getItem(CHROMA_SENS_KEY)) || 60;
});

watch(selectedBackground, (val) => {
  bgImg.src = val;
});

function chromaKeyProcess(
  cameraImg: HTMLImageElement,
  bgImg: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const w = (canvas.width = cameraImg.width);
  const h = (canvas.height = cameraImg.height);
  // Draw background first
  ctx.drawImage(bgImg, 0, 0, w, h);
  // Draw camera frame to temp canvas
  const temp = document.createElement('canvas');
  temp.width = w;
  temp.height = h;
  const tctx = temp.getContext('2d');
  if (!tctx) return;
  tctx.drawImage(cameraImg, 0, 0, w, h);
  const frameData = tctx.getImageData(0, 0, w, h);
  const data = frameData.data;
  // Use chromaSensitivity for green detection
  const sens = chromaSensitivity.value;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2];
    // More robust green detection with tolerance
    if (
      g > sens &&
      g > r + sens * 0.3 &&
      g > b + sens * 0.3 &&
      g > r * 1.1 &&
      g > b * 1.1
    ) {
      data[i + 3] = 0;
    }
  }
  frameData.data.set(data);
  ctx.putImageData(frameData, 0, 0);
}

function renderChromaKey() {
  if (!outputCanvas.value || !frame.value) return;
  const cameraImg = new window.Image();
  cameraImg.onload = () => {
    if (bgImg.complete) {
      chromaKeyProcess(cameraImg, bgImg, outputCanvas.value!);
    }
  };
  cameraImg.src = frame.value;
}

function startCamera() {
  ipcRenderer.send('camera:start');
  if (!frameListener) {
    frameListener = (_event: unknown, data: string) => {
      frame.value = `data:image/jpeg;base64,${data}`;
      renderChromaKey();
    };
    ipcRenderer.on('camera:frame', frameListener);
  }
}

function captureFrame() {
  ipcRenderer.send('camera:capture');
}

function stopCamera() {
  ipcRenderer.send('camera:stop');
  if (frameListener) {
    ipcRenderer.removeListener('camera:frame', frameListener);
    frameListener = null;
  }
}

onMounted(() => {
  startCamera();
});

onBeforeUnmount(() => {
  stopCamera();
});

watch([frame, selectedBackground], () => {
  renderChromaKey();
});
</script>

<style scoped>
.camera-live-feed-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.camera-live-feed-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.camera-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  border-radius: 0;
  z-index: 1;
  background: #e3eafc;
  box-shadow: 0 4px 24px 0 rgba(60, 72, 88, 0.12);
}
.camera-live-feed-controls {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 24px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(60, 72, 88, 0.1);
  padding: 16px 32px;
  z-index: 2;
  align-items: center;
}
.chroma-slider {
  display: flex;
  align-items: center;
  margin-right: 24px;
}
</style>
