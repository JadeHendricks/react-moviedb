// Enforces the Phase 5 styling rules on every Sass partial: strict BEM, one class per selector,
// no ids, no !important, no combinators, so every rule stays at specificity 0,1,0.
const BEM = String.raw`^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$`;

export default {
  customSyntax: 'postcss-scss',
  rules: {
    // A class is 0,1,0. States and pseudo-elements (:hover, ::after, ...) describe the same element and
    // never compete with another class, so they are not counted. Everything else must be one class.
    'selector-max-specificity': ['0,1,0', { ignoreSelectors: [/^::?[a-z-]+$/] }],
    'selector-max-id': 0,
    'declaration-no-important': true,
    // No descendant, child or sibling chains: use a modifier on the element instead.
    'selector-max-combinators': 0,
    'selector-max-compound-selectors': 1,
    'selector-max-attribute': 0,
    'selector-no-qualifying-type': true,
    'selector-class-pattern': [
      BEM,
      {
        resolveNestedSelectors: true,
        message: (selector) => `Expected "${selector}" to be strict BEM (block__element--modifier, lowercase kebab-case)`,
      },
    ],
  },
};
