import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
export default defineConfig([...nextVitals,...nextTs,globalIgnores([".next/**",".data/**",".sites-runtime/**","drizzle/meta/**","next-env.d.ts"]),{rules:{"react-hooks/set-state-in-effect":"off","@typescript-eslint/no-unused-vars":["warn",{argsIgnorePattern:"^_",varsIgnorePattern:"^_"}]}}]);
