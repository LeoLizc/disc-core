import esTs from 'es-ts';

export default [
  ...esTs,
  {
    files: ['src/**/*.ts'],
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
    rules: {
      'canonical/id-match': [
        'warn',
        '(^_?[A-Za-z]+(?:[A-Z][a-z]*)*\\d*$)|(^[A-Z]+(_[A-Z]+)*(_\\d$)*$)|(^(_|\\$)$)',
      ],
    },
  },
];
