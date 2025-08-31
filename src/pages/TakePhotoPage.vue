<template>
  <q-page class="photobooth-page">
    <div class="column items-center q-gutter-lg">
      <!-- Title -->
      <div class="text-h4 text-weight-bold text-white q-mt-md">
        📸 PhotoBaldo
      </div>

      <!-- Main Card -->
      <q-card class="photobooth-main-card">
        <q-card-section
          class="q-pa-md row items-start justify-center content-center flex-wrap"
        >
          <!-- Camera Feed -->
          <div class="photobooth-media-box">
            <img :src="cameraFeed" alt="Camera Feed" class="media-img" />
          </div>

          <!-- Gallery Sidebar -->
          <div class="gallery-sidebar">
            <div class="section-title">📂 Captures</div>
            <div v-if="capturedPhotos.length" class="column q-gutter-sm">
              <q-img
                v-for="(photo, index) in capturedPhotos"
                :key="index"
                :src="photo"
                class="gallery-thumb"
                @click="openPreview(photo)"
              />
            </div>
            <div v-else class="text-grey-5 text-center q-mt-sm">
              No photos yet
            </div>
          </div>
        </q-card-section>

        <!-- Controls -->
        <q-card-section class="q-pa-md flex flex-center q-gutter-lg">
          <q-btn
            round
            color="primary"
            icon="photo_camera"
            size="xl"
            class="capture-btn"
            @click="capturePhoto"
          />
          <q-btn
            flat
            color="white"
            icon="arrow_back"
            label="Back"
            class="back-btn"
            @click="goBack"
          />
        </q-card-section>
      </q-card>

      <!-- Preview Dialog -->
      <q-dialog v-model="previewDialog">
        <q-card class="bg-dark text-white">
          <q-card-section>
            <img :src="previewPhoto" class="preview-img" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Close" color="white" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'TakePhotoPage',
  setup() {
    const cameraFeed = ref('http://localhost:5000/video_feed');
    const router = useRouter();

    const capturedPhotos = ref<string[]>([]);
    const previewDialog = ref(false);
    const previewPhoto = ref('');

    function goBack() {
      router.back();
    }

    function capturePhoto() {
      // Fake capture for demo - replace with real API
      const fakeCapture =
        'https://picsum.photos/seed/' +
        Math.floor(Math.random() * 5000) +
        '/600/600';

      capturedPhotos.value.unshift(fakeCapture);
    }

    function openPreview(photo: string) {
      previewPhoto.value = photo;
      previewDialog.value = true;
    }

    return {
      cameraFeed,
      goBack,
      capturePhoto,
      capturedPhotos,
      previewDialog,
      previewPhoto,
      openPreview,
    };
  },
});
</script>

<style scoped>
.photobooth-page {
  background: linear-gradient(135deg, #1a1f29, #232b36);
  min-height: 100vh;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Main Card */
.photobooth-main-card {
  background: rgba(44, 52, 64, 0.92);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
  width: 100%;
  max-width: 1100px;
  padding: 0;
  display: flex;
  flex-direction: column;
}

/* Camera Feed Square */
.photobooth-media-box {
  flex: 1;
  width: 100%;
  max-width: 450px;
  aspect-ratio: 1 / 1;
  background: #101418;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  border: 2px solid #3a4352;
  transition: transform 0.3s ease;
}
.photobooth-media-box:hover {
  transform: scale(1.01);
}
.media-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #000;
}

/* Gallery Sidebar */
.gallery-sidebar {
  flex: 0 0 220px;
  max-height: 70vh;
  overflow-y: auto;
  margin-left: 16px;
}
.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8px;
}
.gallery-thumb {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}
.gallery-thumb:hover {
  transform: scale(1.05);
  border: 2px solid #42a5f5;
  box-shadow: 0 0 12px rgba(66, 165, 245, 0.6);
}

/* Responsive: stack gallery below camera on small screens */
@media (max-width: 900px) {
  .photobooth-media-box {
    max-width: 100%;
  }
  .gallery-sidebar {
    flex: 1 1 100%;
    max-height: 200px;
    margin-left: 0;
    margin-top: 16px;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
  }
  .gallery-thumb {
    flex: 0 0 120px;
    margin-right: 8px;
  }
}

/* Buttons */
.capture-btn {
  width: 80px;
  height: 80px;
  font-size: 2rem;
  box-shadow: 0 4px 16px rgba(0, 150, 255, 0.5);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}
.capture-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 150, 255, 0.7);
}
.back-btn {
  font-weight: bold;
  color: #e0e0e0;
  transition: color 0.3s ease;
}
.back-btn:hover {
  color: #90caf9;
}

/* Preview Dialog */
.preview-img {
  max-width: 90vw;
  max-height: 70vh;
  border-radius: 12px;
}
</style>
