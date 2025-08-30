<template>
  <q-page class="flex flex-center column">
    <h2>Live Camera Feed</h2>
    <img
      :src="videoUrl"
      alt="Camera Stream"
      class="q-mt-md"
      style="max-width: 600px"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const videoUrl = ref('http://127.0.0.1:5000/video');
    return { videoUrl };
  },
});
</script>
