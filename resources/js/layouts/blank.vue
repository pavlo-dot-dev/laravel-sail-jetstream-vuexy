<script setup lang="ts">
import { useTheme } from "vuetify"
import ScrollToTop from "@core/components/ScrollToTop.vue"
import { useThemeConfig } from "@core/composable/useThemeConfig"
import { hexToRgb } from "@layouts/utils"
import { useSkins } from "@core/composable/useSkins"

const {
  syncInitialLoaderTheme,
  syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme,
  isAppRtl,
  handleSkinChanges,
} = useThemeConfig()

const { global } = useTheme()

// ℹ️ Sync current theme with initial loader theme
syncInitialLoaderTheme()
syncConfigThemeWithVuetifyTheme()
handleSkinChanges()

const { injectSkinClasses } = useSkins()

// ℹ️ This will inject classes in body tag for accurate styling
injectSkinClasses()
</script>

<template>
  <VLocaleProvider :rtl="isAppRtl.value">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <div class="layout-wrapper layout-blank">
        <slot />
      </div>
      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
</template>

<style>
.layout-wrapper.layout-blank {
  flex-direction: column;
}
</style>
