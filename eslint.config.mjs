// @ts-check

import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import storybook from 'eslint-plugin-storybook';

export default tseslint.config(
  // 基础推荐配置
  eslint.configs.recommended,

  // TypeScript 推荐配置 (非类型检查版本，兼容性更好)
  ...tseslint.configs.recommended,

  // Storybook 配置
  ...storybook.configs['flat/recommended'],

  {
    // 语言选项
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    // 规则配置
    rules: {
      // 代码风格规则
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'always'],

      // 代码质量规则
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'no-multi-spaces': 'error',

      // TypeScript 特定规则
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // 忽略文件
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'dist/**',
      'coverage/**',
      '.storybook-out/**',
      'next-env.d.ts',
      'pnpm-lock.yaml',
      '*.min.js',
    ],
  }
);
