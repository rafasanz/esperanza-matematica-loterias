/** @type {import('stylelint').Config} */

module.exports = {
  extends: ['stylelint-config-standard'],
  defaultSeverity: 'warning',
  rules: {
    'selector-class-pattern': null,
    'color-hex-length': 'long',
    'declaration-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment', 'inside-single-line-block', 'after-declaration'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'selector-pseudo-element-no-unknown': true,
    'shorthand-property-no-redundant-values': null,
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['stylelint-commands', 'after-comment'],
      },
    ],
    'declaration-block-no-redundant-longhand-properties': null,
    'custom-property-empty-line-before': null,
    'alpha-value-notation': [
      'percentage',
      {
        exceptProperties: ['opacity', 'fill-opacity', 'flood-opacity', 'stop-opacity', 'stroke-opacity', 'rgba'],
      },
    ],
    'max-nesting-depth': 3,
    'no-descending-specificity': null, // too many false positives with style nesting
  },
};
