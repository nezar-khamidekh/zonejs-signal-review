import { defineConfig, globalIgnores } from "eslint/config";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([
    globalIgnores(["projects/**/*", "**/node_modules", "**/dist", "**/*.js"]),
    {
        files: ["**/*.ts"],

        extends: compat.extends(
            "eslint:recommended",
            "plugin:@typescript-eslint/recommended",
            "plugin:@angular-eslint/recommended",
            "plugin:@angular-eslint/template/process-inline-templates",
            "plugin:prettier/recommended",
        ),

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 5,
            sourceType: "script",

            parserOptions: {
                project: ["tsconfig.json"],
                createDefaultProgram: true,
            },
        },

        rules: {
            "@angular-eslint/directive-selector": ["error", {
                type: "attribute",
                prefix: "app",
                style: "camelCase",
            }],

            "@angular-eslint/component-selector": ["error", {
                type: "element",
                prefix: "app",
                style: "kebab-case",
            }],

            "@typescript-eslint/no-unused-vars": ["warn"],
            "@typescript-eslint/no-explicit-any": "off",
            "prettier/prettier": "error",
        },
    },
    {
        files: ["**/*.html"],
        extends: compat.extends("plugin:@angular-eslint/template/recommended"),

        rules: {
            "@angular-eslint/template/no-negated-async": "off",
        },
    },
]);