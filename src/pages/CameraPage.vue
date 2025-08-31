<template>
  <q-page class="camera-live-feed-page">
    <div class="camera-live-feed-container">
      <img :src="frame" alt="Camera Feed" class="camera-live-feed-img" />
      <div class="camera-live-feed-controls">
        <q-btn color="primary" label="Start Camera" @click="startCamera" />
        <q-btn color="secondary" label="Capture" @click="captureFrame" />
        <q-btn color="negative" label="Stop" @click="stopCamera" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { ipcRenderer } from 'electron';

const frame = ref<string>('');
let frameListener: ((event: unknown, data: string) => void) | null = null;

function startCamera() {
  ipcRenderer.send('camera:start');
  if (!frameListener) {
    frameListener = (_event: unknown, data: string) => {
      frame.value = `data:image/jpeg;base64,${data}`;
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
.camera-live-feed-img {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  border-radius: 0;
  box-shadow: 0 4px 24px 0 rgba(60, 72, 88, 0.12);
  background: #e3eafc;
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
}
</style>
