import { defineConfig } from 'vitest/config';

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    // 基础测试配置
    globals: true,
    environment: 'jsdom',

    // 可以后续添加 Storybook 集成
    // projects: [
    //   {
    //     extends: true,
    //     plugins: [
    //       // The plugin will run tests for the stories defined in your Storybook config
    //       // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
    //       // storybookTest({ configDir: path.join(dirname, '.storybook') }),
    //     ],
    //     test: {
    //       name: 'storybook',
    //       browser: {
    //         enabled: true,
    //         headless: true,
    //         provider: 'playwright',
    //         instances: [{ browser: 'chromium' }]
    //       },
    //       setupFiles: ['.storybook/vitest.setup.ts'],
    //     },
    //   },
    // ],
  },
});
