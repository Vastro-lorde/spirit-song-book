import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import {
  Serwist,
  StaleWhileRevalidate,
  NetworkFirst,
  ExpirationPlugin,
} from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    // Individual hymn/song detail pages — cached aggressively for offline lyrics
    {
      matcher({ url }) {
        return /^\/(hymns|songs)\/\d+$/.test(url.pathname);
      },
      handler: new StaleWhileRevalidate({
        cacheName: "page-lyrics",
        plugins: [
          new ExpirationPlugin({
            maxEntries: 2000,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          }),
        ],
      }),
    },
    // Hymn/song list pages
    {
      matcher({ url }) {
        return /^\/(hymns|songs)\/?$/.test(url.pathname);
      },
      handler: new NetworkFirst({
        cacheName: "page-lists",
        plugins: [
          new ExpirationPlugin({
            maxEntries: 20,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
          }),
        ],
      }),
    },
    // API responses — cached for offline search & browsing
    {
      matcher({ url }) {
        return /^\/api\/(hymns|songs)/.test(url.pathname);
      },
      handler: new StaleWhileRevalidate({
        cacheName: "api-data",
        plugins: [
          new ExpirationPlugin({
            maxEntries: 500,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          }),
        ],
      }),
    },
    ...defaultCache,
  ],
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

serwist.addEventListeners();
