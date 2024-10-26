import esTs from 'es-ts';

export default [
  ...esTs,
  {
    files: ['src/**/*.ts'],
  },
  {
    rules: {
      'canonical/id-match': [
        'warn',
        '(^_?[A-Za-z]+(?:[A-Z][a-z]*)*\\d*$)|(^[A-Z]+(_[A-Z]+)*(_\\d$)*$)|(^(_|\\$)$)',
      ],
    },
  },
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      'coverage',
      '**/*.json',
      '**/*.config.js',
    ],
  },
];
