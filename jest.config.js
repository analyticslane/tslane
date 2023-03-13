module.exports = {
    preset: 'ts-jest',
    moduleFileExtensions: ['ts', 'js'],
    transform: {
      '^.+\\.(ts)$': [
        'ts-jest',
        {
          tsconfig: 'tsconfig.json',
          isolatedModules: true,
        },
      ],
    },
    testEnvironment: 'node',
    coveragePathIgnorePatterns: ['tests']
  };
  