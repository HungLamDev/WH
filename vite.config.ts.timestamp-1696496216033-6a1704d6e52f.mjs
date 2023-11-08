// vite.config.ts
import { defineConfig } from "file:///D:/DUY/web/vite-test-pwa2/node_modules/vite/dist/node/index.js";
import react from "file:///D:/DUY/web/vite-test-pwa2/node_modules/@vitejs/plugin-react-swc/index.mjs";
import mkcert from "file:///D:/DUY/web/vite-test-pwa2/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import { VitePWA } from "file:///D:/DUY/web/vite-test-pwa2/node_modules/vite-plugin-pwa/dist/index.mjs";
var vite_config_default = defineConfig({
  server: {
    host: true,
    https: true
  },
  base: "./",
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      // registerType: "prompt",
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,json}"]
      },
      includeAssets: ["test.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Warehouse App",
        short_name: "Warehouse App",
        description: "Website description(Could be same with index.html file)",
        theme_color: "#ffffff",
        start_url: "/",
        display: "fullscreen",
        orientation: "landscape",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
          // {
          //   src: "pwa-512x512.png",
          //   sizes: "512x512",
          //   type: "image/png",
          //   purpose: "any maskable",
          // },
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxEVVlcXFxcd2ViXFxcXHZpdGUtdGVzdC1wd2EyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxEVVlcXFxcd2ViXFxcXHZpdGUtdGVzdC1wd2EyXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9EVVkvd2ViL3ZpdGUtdGVzdC1wd2EyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IG1rY2VydCBmcm9tIFwidml0ZS1wbHVnaW4tbWtjZXJ0XCI7XHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogdHJ1ZSxcclxuICAgIGh0dHBzOiB0cnVlLFxyXG4gIH0sXHJcbiAgYmFzZTogXCIuL1wiLFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBta2NlcnQoKSxcclxuICAgIFZpdGVQV0Eoe1xyXG4gICAgICAvLyByZWdpc3RlclR5cGU6IFwicHJvbXB0XCIsXHJcbiAgICAgIHJlZ2lzdGVyVHlwZTogXCJhdXRvVXBkYXRlXCIsXHJcbiAgICAgIGluamVjdFJlZ2lzdGVyOiBcImF1dG9cIixcclxuICAgICAgd29ya2JveDoge1xyXG4gICAgICAgIGdsb2JQYXR0ZXJuczogW1wiKiovKi57anMsY3NzLGh0bWwsanNvbn1cIl0sXHJcbiAgICAgIH0sXHJcbiAgICAgIGluY2x1ZGVBc3NldHM6IFtcInRlc3QuaWNvXCIsIFwiYXBwbGUtdG91Y2gtaWNvbi5wbmdcIiwgXCJtYXNrZWQtaWNvbi5zdmdcIl0sXHJcbiAgICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgICAgbmFtZTogXCJXYXJlaG91c2UgQXBwXCIsXHJcbiAgICAgICAgc2hvcnRfbmFtZTogXCJXYXJlaG91c2UgQXBwXCIsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IFwiV2Vic2l0ZSBkZXNjcmlwdGlvbihDb3VsZCBiZSBzYW1lIHdpdGggaW5kZXguaHRtbCBmaWxlKVwiLFxyXG4gICAgICAgIHRoZW1lX2NvbG9yOiBcIiNmZmZmZmZcIixcclxuICAgICAgICBzdGFydF91cmw6IFwiL1wiLFxyXG4gICAgICAgIGRpc3BsYXk6IFwiZnVsbHNjcmVlblwiLFxyXG4gICAgICAgIG9yaWVudGF0aW9uOidsYW5kc2NhcGUnLFxyXG4gICAgICAgIGljb25zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogXCJwd2EtMTkyeDE5Mi5wbmdcIixcclxuICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiBcInB3YS01MTJ4NTEyLnBuZ1wiLFxyXG4gICAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgLy8gICBzcmM6IFwicHdhLTUxMng1MTIucG5nXCIsXHJcbiAgICAgICAgICAvLyAgIHNpemVzOiBcIjUxMng1MTJcIixcclxuICAgICAgICAgIC8vICAgdHlwZTogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgIC8vICAgcHVycG9zZTogXCJhbnkgbWFza2FibGVcIixcclxuICAgICAgICAgIC8vIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgICAgZGV2T3B0aW9uczoge1xyXG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxUSxTQUFTLG9CQUFvQjtBQUNsUyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsZUFBZTtBQUd4QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLElBQ1AsUUFBUTtBQUFBO0FBQUEsTUFFTixjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUNoQixTQUFTO0FBQUEsUUFDUCxjQUFjLENBQUMseUJBQXlCO0FBQUEsTUFDMUM7QUFBQSxNQUNBLGVBQWUsQ0FBQyxZQUFZLHdCQUF3QixpQkFBaUI7QUFBQSxNQUNyRSxVQUFVO0FBQUEsUUFDUixNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixXQUFXO0FBQUEsUUFDWCxTQUFTO0FBQUEsUUFDVCxhQUFZO0FBQUEsUUFDWixPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBT0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxZQUFZO0FBQUEsUUFDVixTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
