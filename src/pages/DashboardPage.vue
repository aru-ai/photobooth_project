<template>
  <q-page class="photobooth-page">
    <div class="column items-center q-gutter-lg">
      <!-- Title -->
      <div class="text-h4 text-weight-bold text-white q-mt-md">PhotoBaldo</div>

      <!-- Main Card -->
      <q-card class="photobooth-main-card">
        <q-card-section class="q-pa-none">
          <div class="row no-wrap photobooth-row">
            <!-- Camera Feed -->
            <div class="col-6 flex flex-center">
              <div class="photobooth-media-box">
                <img :src="cameraFeed" alt="Camera Feed" class="media-img" />
              </div>
            </div>

            <!-- Chroma Key Panel -->
            <div class="col-6 flex flex-center">
              <div class="photobooth-media-box">
                <div
                  class="row items-center justify-between q-pa-sm q-mb-sm"
                  style="margin-left: 16px; margin-top: 16px"
                >
                  <span class="text-h6 text-weight-bold text-white"
                    >BACKGROUND</span
                  >
                  <q-toggle v-model="chromaKey" color="positive" keep-color />
                </div>
                <div class="flex flex-center" style="height: 100%">
                  <img
                    :src="selectedBackground"
                    alt="Chroma Background"
                    style="max-width: 90%; display: block; border-radius: 12px"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-md q-px-md justify-around">
            <div class="col">
              <q-btn
                class="photobooth-btn full-width"
                icon="photo_camera"
                label="TAKE PHOTO"
                unelevated
                @click="goTo('take-photo')"
              />
            </div>
            <div class="col">
              <q-btn
                class="photobooth-btn full-width"
                icon="videocam"
                label="RECORD VIDEO"
                unelevated
                @click="goTo('record-video')"
              />
            </div>
            <div class="col">
              <q-btn
                class="photobooth-btn full-width"
                icon="settings"
                label="SETTINGS"
                unelevated
                @click="goTo('settings')"
              />
            </div>
          </div>
        </q-card-section>

        <!-- <q-separator dark /> -->

        <!-- Action Buttons -->
        <!-- <q-card-section class="q-pa-none"> -->

        <!-- </q-card-section> -->
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

const BACKGROUND_KEY = 'selectedChromaBackground';

export default defineComponent({
  setup() {
    const cameraFeed = ref('http://localhost:5000/video_feed'); // Replace with your actual feed
    const chromaKey = ref(true);
    const router = useRouter();
    const selectedBackground = ref(
      localStorage.getItem(BACKGROUND_KEY) ||
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    );

    window.addEventListener('storage', () => {
      selectedBackground.value =
        localStorage.getItem(BACKGROUND_KEY) || selectedBackground.value;
    });

    function goTo(page: string) {
      router.push({ path: `/${page}` });
    }

    return { cameraFeed, chromaKey, goTo, selectedBackground };
  },
});
</script>

<style scoped>
.photobooth-page {
  background: #1e252f;
  min-height: 100vh;
  padding: 24px;
}

.photobooth-main-card {
  background: #2c3440;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
  width: 100%;
  height: 80vh;
  max-width: 1100px;
  padding: 0;
}

.photobooth-row {
  min-height: 320px;
}

.photobooth-media-box {
  width: 100%;
  height: 60vh;
  margin: 3%;
  aspect-ratio: 2/1;
  background: #232a36;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  border: 2px solid #3a4352;
}

.media-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0 0 12px 12px;
  background: #000;
  flex: 1 1 auto;
  border-top: 1px solid #3a4352;
}

.photobooth-btn {
  background: #232a36;
  height: 12vh;
  color: #fff;
  font-weight: bold;
  padding: 14px 20px;
  border-radius: 12px;
  min-width: 120px;
  font-size: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: background 0.2s;
  text-transform: uppercase;
}

.photobooth-btn:hover {
  background: #3a4352;
}

.full-width {
  width: 100%;
}
</style>
