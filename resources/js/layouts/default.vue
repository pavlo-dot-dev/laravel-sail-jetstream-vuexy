<script lang="ts" setup>
import { useTheme } from "vuetify"
import ScrollToTop from "@core/components/ScrollToTop.vue"
import { useThemeConfig } from "@core/composable/useThemeConfig"
import { hexToRgb } from "@layouts/utils"
import { useSkins } from "@core/composable/useSkins"
import { AppContentLayoutNav } from "@layouts/enums"
import { defineAsyncComponent } from 'vue'
import { useWindowSize } from '@vueuse/core'

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

const DefaultLayoutWithHorizontalNav = defineAsyncComponent(() => import("./components/DefaultLayoutWithHorizontalNav.vue"))
const DefaultLayoutWithVerticalNav = defineAsyncComponent(() => import("./components/DefaultLayoutWithVerticalNav.vue"))

const { width: windowWidth } = useWindowSize()
const { appContentLayoutNav, switchToVerticalNavOnLtOverlayNavBreakpoint } = useThemeConfig()

// ℹ️ This will switch to vertical nav when define breakpoint is reached when in horizontal nav layout
// Remove below composable usage if you are not using horizontal nav layout in your app
switchToVerticalNavOnLtOverlayNavBreakpoint(windowWidth)

const { layoutAttrs, injectSkinClasses } = useSkins()

injectSkinClasses()
</script>

<template>
  <VLocaleProvider :rtl="isAppRtl.value">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <DefaultLayoutWithVerticalNav v-if="appContentLayoutNav === AppContentLayoutNav.Vertical" v-bind="layoutAttrs">
        <slot />
      </DefaultLayoutWithVerticalNav>
      <DefaultLayoutWithHorizontalNav v-else v-bind="layoutAttrs">
        <slot />
      </DefaultLayoutWithHorizontalNav>
      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use "@layouts/styles/default-layout";
</style>
