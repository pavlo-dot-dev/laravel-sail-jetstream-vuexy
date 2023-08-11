<script lang="ts" setup>
import { useLayouts } from "@layouts/composable/useLayouts"
import { config } from "@layouts/config"
import type { NavLink } from "@layouts/types"
import { getComputedNavLinkToProp, isNavLinkActive } from "@layouts/utils"

interface Props {
  item: NavLink

  // ℹ️ We haven't added this prop in vertical nav because we don't need such differentiation in vertical nav for styling
  isSubItem?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isSubItem: false,
})

const { dynamicI18nProps } = useLayouts()
</script>

<template>
  <li
    class="nav-link"
    :class="[{
      'sub-item': props.isSubItem,
      'disabled': item.disable,
    }]"
  >
    <Component
      :is="item.to ? 'Link' : 'a'"
      v-bind="getComputedNavLinkToProp(item)"
      :class="{ 'router-link-active router-link-exact-active': isNavLinkActive(item.to, $page.url) }"
    >
      <Component
        :is="config.app.iconRenderer || 'div'"
        class="nav-item-icon"
        v-bind="item.icon || config.verticalNav.defaultNavItemIconProps"
      />
      <Component
        :is="config.app.enableI18n ? 'i18n-t' : 'span'"
        class="nav-item-title"
        v-bind="dynamicI18nProps(item.title, 'span')"
      >
        {{ item.title }}
      </Component>
    </Component>
  </li>
</template>

<style lang="scss">
.layout-horizontal-nav {
  .nav-link a {
    display: flex;
    align-items: center;
  }
}
</style>
