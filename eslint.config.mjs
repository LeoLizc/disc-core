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
  },
];
