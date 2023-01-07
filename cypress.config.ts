import { defineConfig } from "cypress";

import { resetDB } from "@/__tests__/__mocks__/db/utils/reset-db";
import { addBand } from "@/lib/features/bands/queries";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        "db:reset": () => resetDB().then(() => null),
        addBand: (newBand) => addBand(newBand).then(() => null),
      });
    },
  },
});
