import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   port: 3003,
  //   host: "tobi.dapp",
  //   https: true,
  // },
  plugins: [
    react(),
    // mkcert({
    //   hosts: ["telifi.local.org"],
    // }),
  ],
});
