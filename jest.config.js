module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/data/usecases/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  testMatch: ['**/*.spec.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'],
};
