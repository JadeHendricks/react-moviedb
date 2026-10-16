/// <reference types="vite/client" />

// REACT_APP_ is an allowed env prefix (see vite.config.ts), so the deployed variable name stays the same.
interface ImportMetaEnv {
  readonly REACT_APP_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
