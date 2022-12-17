import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import PageLinks from "./PageLinks.vue";
import FirstVisualization from "./VisualizationFirst.vue";
import SecondVisualization from "./VisualizationSecond.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "PageLinks",
      component: PageLinks,
    },
    {
      path: "/first",
      name: "FirstVisualization",
      component: FirstVisualization,
    },
    {
      path: "/second",
      name: "SecondVisualization",
      component: SecondVisualization,
    },
  ],
});

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(router).use(vuetify).mount("#app");
