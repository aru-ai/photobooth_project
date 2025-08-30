<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6">Live Camera Feed</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <img
              :src="cameraFeed"
              class="full-width rounded-borders"
              alt="Camera Feed"
            />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6">System Status</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-list>
              <q-item>
                <q-item-section>Camera Connected</q-item-section>
                <q-item-section side>
                  <q-icon
                    :name="cameraConnected ? 'check_circle' : 'cancel'"
                    :color="cameraConnected ? 'green' : 'red'"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>Frames / Second</q-item-section>
                <q-item-section side>{{ fps }}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const cameraFeed = ref('http://localhost:5000/video_feed'); // Flask endpoint
    const cameraConnected = ref(true);
    const fps = ref(30);

    onMounted(() => {
      // later: fetch status from Python API
    });

    return { cameraFeed, cameraConnected, fps };
  },
});
</script>
