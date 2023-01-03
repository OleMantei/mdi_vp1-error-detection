import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import VisualizationLinks from "./VisualizationLinks.vue";
import VisualizationBars from "./VisualizationBars.vue";
import VisualizationBubbles from "./VisualizationBubbles.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "VisualizationLinks",
      component: VisualizationLinks,
    },
    {
      path: "/xQcR3",
      name: "VisualizationBars",
      component: VisualizationBars,
    },
    {
      path: "/c5sYf",
      name: "VisualizationBubbles",
      component: VisualizationBubbles,
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
