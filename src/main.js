import {
  createSSRApp
} from "vue";
import App from "./App.vue";
import uvUI from '@climblee/uv-ui'
import { setupStore } from './store'
export function createApp () {
  const app = createSSRApp(App);
  app.use(uvUI);
  setupStore(app)
  return {
    app,
  };
}
