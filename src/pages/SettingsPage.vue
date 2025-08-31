<template>
  <q-page class="settings-page">
    <div class="column items-center q-gutter-lg">
      <!-- Title -->
      <div class="text-h4 text-weight-bold text-white q-mt-md">⚙️ Settings</div>

      <!-- Main Card -->
      <q-card class="settings-main-card">
        <!-- Back button -->
        <q-btn
          flat
          round
          color="primary"
          icon="arrow_back"
          class="back-btn"
          @click="goBack"
        />

        <q-card-section class="q-pa-lg">
          <!-- Background Section -->
          <div class="section-title" style="margin-top: 48px">
            Chroma Key Background
          </div>
          <div class="row q-col-gutter-md q-mb-lg justify-center">
            <q-img
              v-for="img in backgroundImages"
              :key="img"
              :src="img"
              :class="['bg-thumb', { selected: selectedBackground === img }]"
              @click="selectBackground(img)"
            />
          </div>

          <q-separator spaced />

          <!-- Sensitivity Section -->
          <div class="section-title">Chroma Key Sensitivity</div>
          <div class="row items-center justify-center q-mb-lg">
            <q-icon name="colorize" size="24px" color="green" class="q-mr-sm" />
            <q-slider
              v-model="chromaSensitivity"
              :min="10"
              :max="100"
              :step="1"
              label
              snap
              color="green"
              class="sensitivity-slider"
              @update:model-value="updateChromaSensitivity"
            />
            <span class="q-ml-md text-bold text-white">
              {{ chromaSensitivity }}
            </span>
          </div>

          <q-separator spaced />

          <!-- Other settings -->
          <div class="section-title">Other Settings</div>
          <div class="text-body2 text-grey-5">More settings coming soon...</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

const BACKGROUND_KEY = 'selectedChromaBackground';
const CHROMA_SENS_KEY = 'chromaSensitivity';

export default defineComponent({
  name: 'SettingsPage',
  setup() {
    const router = useRouter();
    const backgroundImages = [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    ];
    const selectedBackground = ref(
      localStorage.getItem(BACKGROUND_KEY) || backgroundImages[0]
    );
    const chromaSensitivity = ref(
      Number(localStorage.getItem(CHROMA_SENS_KEY)) || 60
    );

    function goBack() {
      router.back();
    }
    function selectBackground(img: string) {
      selectedBackground.value = img;
      localStorage.setItem(BACKGROUND_KEY, img);
    }
    function updateChromaSensitivity(val: number | null) {
      if (val !== null) {
        chromaSensitivity.value = val;
        localStorage.setItem(CHROMA_SENS_KEY, String(val));
      }
    }
    return {
      goBack,
      backgroundImages,
      selectedBackground,
      selectBackground,
      chromaSensitivity,
      updateChromaSensitivity,
    };
  },
});
</script>

<style scoped>
.settings-page {
  background: linear-gradient(135deg, #1a1f29, #232b36);
  min-height: 100vh;
  padding: 24px;
}

.settings-main-card {
  background: rgba(44, 52, 64, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
  width: 100%;
  max-width: 720px;
  overflow: hidden;
  position: relative;
}

.back-btn {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 10;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 12px;
}

.bg-thumb {
  width: 140px;
  height: 90px;
  border-radius: 12px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  object-fit: cover;
}
.bg-thumb:hover {
  transform: scale(1.05);
  border: 2px solid #90caf9;
}
.bg-thumb.selected {
  border: 2px solid #42a5f5 !important;
  box-shadow: 0 0 12px rgba(66, 165, 245, 0.8);
}

.sensitivity-slider {
  width: 220px;
}
</style>
