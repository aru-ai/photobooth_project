<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <q-card class="q-pa-md" style="width: 800px; max-width: 100%">
        <q-card-section>
          <div class="text-h6">Camera Preview</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="flex flex-center">
          <!-- Canvas or Video preview -->
          <img
            :src="frame"
            alt="Camera Feed"
            class="rounded-borders"
            style="width: 100%; max-height: 500px"
          />
        </q-card-section>

        <q-separator />

        <q-card-actions align="around">
          <q-btn color="primary" label="Start Camera" @click="startCamera" />
          <q-btn color="secondary" label="Capture" @click="captureFrame" />
          <q-btn color="negative" label="Stop" @click="stopCamera" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ipcRenderer } from 'electron';

const frame = ref<string>('');

function startCamera() {
  ipcRenderer.send('camera:start');
  ipcRenderer.on('camera:frame', (_, data) => {
    frame.value = `data:image/jpeg;base64,${data}`;
  });
}

function captureFrame() {
  ipcRenderer.send('camera:capture');
}

function stopCamera() {
  ipcRenderer.send('camera:stop');
}
</script>
