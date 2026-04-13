import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Spirit Song Book",
    short_name: "Spirit Songs",
    description:
      "Access your favourite hymn books — search, read, and share hymns anytime, anywhere.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2e3192",
    orientation: "portrait",
    icons: [
      {
        src: "/spirit_songs_logo_192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/spirit_songs_logo_512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
