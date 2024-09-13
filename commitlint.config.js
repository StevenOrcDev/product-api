module.exports = {
  extends: ["gitmoji"],
  rules: {
    // commit message max length is 140 characters
    "header-max-length": [2, "always", 140],

    // commit type enum
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "test", "chore", "revert"],
    ],
    "subject-full-stop": [0, "never"],
    "subject-case": [0, "never"],
  },
};
