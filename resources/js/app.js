import './bootstrap';
import '../css/app.css';

import "@/@iconify/icons-bundle"
import vuetify from "@/plugins/vuetify"
import {loadFonts} from "@/plugins/webfontloader"
import "@styles/@core/template/index.scss"
import "@styles/styles.scss"
import {createPinia} from "pinia"
import {createApp, h} from "vue"
import {createInertiaApp} from "@inertiajs/vue3"
import {ZiggyVue} from 'ziggy';
import {resolvePageComponent} from "laravel-vite-plugin/inertia-helpers"
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"
import Default from "@/layouts/default.vue"
import layoutsPlugin from '@/plugins/layouts'

loadFonts().then()

const appName = window.document.getElementsByTagName("title")[0]?.innerText || "Laravel"

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const page = await resolvePageComponent(`./pages/${name}.vue`, import.meta.glob("./pages/**/*.vue"))
        if (!page.default.layout) {
            page.default.layout = Default
        }

        return page
    },
    setup({el, App, props, plugin}) {
        createApp({render: () => h(App, props)})
            .use(plugin)
            .use(vuetify)
            .use(createPinia())
            .use(ZiggyVue)
            .use(layoutsPlugin)
            .mount(el)
    },
    progress: {
        color: "#4B5563",
    },
}).then()

