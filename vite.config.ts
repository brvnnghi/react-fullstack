import path from "path"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [react(), tailwindcss(), cloudflare()],
	resolve: {
		// Install @types/node and update vite.config.ts so Vite can resolve the @ alias
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
