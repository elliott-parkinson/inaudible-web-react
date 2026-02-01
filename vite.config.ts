import { defineConfig, loadEnv } from "vite";
import fs from 'node:fs';

export default defineConfig(({ command, mode }) => {
  const isDev = command === "serve";
  const env = loadEnv(mode, process.cwd(), "");
  const httpsKeyPath = env.VITE_HTTPS_KEY_PATH ?? "./localhost-key.pem";
  const httpsCertPath = env.VITE_HTTPS_CERT_PATH ?? "./localhost-cert.pem";
  const hasHttps = fs.existsSync(httpsKeyPath) && fs.existsSync(httpsCertPath);
  const apiBaseUrl = env.INAUDIBLE_AUDIOBOOKSHELF_API_BASE_URL ?? "";
  const allowedHosts = env.VITE_ALLOWED_HOSTS
    ? env.VITE_ALLOWED_HOSTS.split(",").map((host) => host.trim()).filter(Boolean)
    : undefined;

  return {
    envPrefix: ["VITE_", "INAUDIBLE_"],
    define: {
      "import.meta.env.INAUDIBLE_AUDIOBOOKSHELF_API_BASE_URL": JSON.stringify(apiBaseUrl),
    },
    server: {
      host: "0.0.0.0",
      port: 5173,
      https: isDev && hasHttps ? {
        key: fs.readFileSync(httpsKeyPath),
        cert: fs.readFileSync(httpsCertPath),
      } : false,   // HTTPS only in dev when certs exist
    },
    preview: {
      allowedHosts,
      host: "0.0.0.0",
      port: 5173,
      https: false,   // Always HTTP in prod
    }
  };
});
