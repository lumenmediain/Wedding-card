import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No external cache store is needed for this invitation's pre-rendered content.
export default defineCloudflareConfig();
