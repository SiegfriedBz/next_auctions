/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  catalogs: [
    {
      exclude: ["**/.next/**", "**/*.d.ts", "**/node_modules/**"],
      include: ["<rootDir>"],
      path: "<rootDir>/src/i18n/catalogs/{locale}",
    },
  ],
  catalogsMergePath: "<rootDir>/src/i18n/messages/{locale}",
  compileNamespace: "ts",
  fallbackLocales: {
    default: "en",
  },
  format: "po",
  formatOptions: {
    lineNumbers: false,
    origins: false,
  },
  locales: ["en", "de", "fr", "pseudo"],
  pseudoLocale: "pseudo",
  sourceLocale: "en",
};
