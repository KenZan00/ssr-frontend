import { defineConfig } from "cypress";

// {on, config} as inputs temporarily removed due not in use with application-tests
export default defineConfig({
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});
