<template>
  <q-layout view="hHh lpR fFf">
    <!-- HEADER -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title> Camera Dashboard </q-toolbar-title>
        <q-btn flat dense round icon="settings" @click="goToSettings" />
      </q-toolbar>
    </q-header>

    <!-- SIDEBAR -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item clickable v-ripple @click="goTo('dashboard')">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goTo('camera')">
          <q-item-section avatar>
            <q-icon name="videocam" />
          </q-item-section>
          <q-item-section>Camera</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goTo('settings')">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>Settings</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- MAIN CONTENT -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const leftDrawerOpen = ref(true);
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
