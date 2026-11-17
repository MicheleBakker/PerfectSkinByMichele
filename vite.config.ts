// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// Never set ssr.external or resolve.external: the Worker has no runtime module resolution, so
// the build fails. Never add compression (compressPublicAssets, vite-plugin-compression):
// hosting already compresses at the edge.
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    optimizeDeps: {
      // Optimize the initial UI together, before navigation mounts any Radix slots.
      // Reject stale graph requests instead of mixing two React module identities.
      include: [
        '@radix-ui/react-slot',
        '@radix-ui/react-dialog',
        '@tanstack/react-query',
        'lucide-react',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
      ],
      ignoreOutdatedRequests: false,
    },
  },
  // Node is used only to prerender during an external build, never by the hosted website.
  nitro: {
    preset: 'node-server',
    output: { dir: '.output', publicDir: '.output/public', serverDir: '.output/server' },
  },
  tanstackStart: {
    pages: [{ path: '/' }],
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
