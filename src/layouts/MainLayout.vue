<template>
  <q-layout view="hHh lpR fFf" class="main-modern-layout">
    <!-- MAIN CONTENT -->
    <q-page-container class="modern-page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const leftDrawerOpen = ref(false);
    const router = useRouter();

    const goTo = (route: string) => {
      router.push(`/${route}`);
    };

    const goToSettings = () => {
      router.push('/settings');
    };

    return {
      leftDrawerOpen,
      goTo,
      goToSettings,
    };
  },
});
</script>

<style scoped>
/* Background */
.main-modern-layout {
  background: linear-gradient(135deg, #eef2f7 0%, #f9f9fb 100%);
  font-family: 'Inter', sans-serif;
}

/* HEADER */
.modern-header {
  backdrop-filter: blur(16px);
  background: rgba(25, 118, 210, 0.85) !important;
  box-shadow: 0 4px 24px rgba(25, 118, 210, 0.2);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.modern-toolbar {
  min-height: 64px;
  display: flex;
  align-items: center;
}
.modern-title {
  font-size: 1.4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
}

/* DRAWER */
.modern-drawer {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.05);
}

/* Drawer Items */
.modern-item {
  border-radius: 12px;
  margin: 4px 8px;
  transition: all 0.2s ease;
}
.modern-item:hover {
  background: rgba(25, 118, 210, 0.08);
  transform: translateX(4px);
}
.modern-item .q-icon {
  color: #1976d2;
}

/* PAGE */
.modern-page-container {
  padding: 20px;
  min-height: 100vh;
}
</style>
