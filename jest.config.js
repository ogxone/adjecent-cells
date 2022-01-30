import stripJsonComments from 'strip-json-comments'  
import fs from 'fs'
import tsJestUtils from 'ts-jest/utils/index.js'

const {pathsToModuleNameMapper} = tsJestUtils

console.log(pathsToModuleNameMapper)

const { compilerOptions } = JSON.parse(
  stripJsonComments(fs.readFileSync('./tsconfig.json', 'utf8'))
  );
  // const { pathsToModuleNameMapper } = require('ts-jest/utils');

export default {
  verbose: true,
  rootDir: './',
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(unit|int|e2e|spec|test).(ts|js)'],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json'
    }
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  modulePathIgnorePatterns: ['<rootDir>/dist'],

}