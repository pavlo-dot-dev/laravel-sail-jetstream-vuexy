<script setup>
import navItems from "@/navigation/horizontal"
import { useThemeConfig } from "@core/composable/useThemeConfig"
import { themeConfig } from "@themeConfig"
import { Link } from "@inertiajs/vue3"
import Footer from "@/layouts/components/Footer.vue"
import NavBarI18n from "@/layouts/components/NavBarI18n.vue"
import NavBarNotifications from "@/layouts/components/NavBarNotifications.vue"
import NavbarShortcuts from "@/layouts/components/NavbarShortcuts.vue"
import NavbarThemeSwitcher from "@/layouts/components/NavbarThemeSwitcher.vue"
import NavSearchBar from "@/layouts/components/NavSearchBar.vue"
import UserProfile from "@/layouts/components/UserProfile.vue"
import { HorizontalNavLayout } from "@layouts"
import { VNodeRenderer } from "@layouts/components/VNodeRenderer"

const { appRouteTransition } = useThemeConfig()
</script>

<template>
  <HorizontalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar>
      <Link
        href="/"
        class="app-logo d-flex align-center gap-x-3"
      >
        <VNodeRenderer :nodes="themeConfig.app.logo" />

        <h1 class="app-title font-weight-bold leading-normal text-xl text-capitalize">
          {{ themeConfig.app.title }}
        </h1>
      </Link>
      <VSpacer />

      <NavSearchBar trigger-btn-class="ms-lg-n3" />

      <NavBarI18n class="me-1" />
      <NavbarThemeSwitcher class="me-1" />
      <NavbarShortcuts class="me-1" />
      <NavBarNotifications class="me-2" />
      <UserProfile />
    </template>

    <!-- 👉 Pages -->
    <!--    <Transition -->
    <!--      :name="appRouteTransition" -->
    <!--      mode="out-in" -->
    <!--    > -->
    <slot />
    <!--    </Transition> -->

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
    <TheCustomizer />
  </HorizontalNavLayout>
</template>
