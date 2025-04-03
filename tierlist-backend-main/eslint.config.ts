import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
// @ts-ignore
import perfectionist from 'eslint-plugin-perfectionist';

export default tseslint.config(
  {
    ignores: ['**/*.js', 'eslint.config.ts', 'tests/**/*.ts'],
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  perfectionist.configs['recommended-natural']
);
