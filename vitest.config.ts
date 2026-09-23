import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
export default defineConfig({resolve:{alias:{"@":fileURLToPath(new URL("./src",import.meta.url))}},test:{projects:[{extends:true,test:{name:"unit",include:["tests/unit/**/*.test.ts"],environment:"node"}},{extends:true,test:{name:"integration",include:["tests/integration/**/*.test.ts"],fileParallelism:false,testTimeout:30000,hookTimeout:60000,environment:"node"}}]}});
