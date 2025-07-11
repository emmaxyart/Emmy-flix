import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript"
  ),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // Disabled rules
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/prop-types": "off", // Use TypeScript for prop validation
      "react-hooks/exhaustive-deps": "off", // Disable dependency array warnings
      "react/no-unescaped-entities": "off", // Allow quotes in JSX
      "react/display-name": "off", // Allow anonymous components
      "react/jsx-key": "warn", // Downgrade missing key to warning
      
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_" 
      }],
      "@typescript-eslint/no-explicit-any": "off", // Allow any type
      "@typescript-eslint/ban-ts-comment": "off", // Allow @ts-ignore comments
      "@typescript-eslint/no-non-null-assertion": "off", // Allow non-null assertions
      
      // General rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": "off", // Use TypeScript version instead
      "no-undef": "off", // TypeScript handles this
      
      // Accessibility rules - keep as warnings
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off"
    },
  },
  {
    ignores: [
      "node_modules/",
      ".next/",
      "out/",
      "public/",
      "**/*.d.ts",
      "**/.eslintrc.js",
      "next.config.js",
      "next.config.mjs",
      "postcss.config.js",
      "postcss.config.mjs",
      "tailwind.config.js",
      "tailwind.config.ts",
    ],
  },
];

export default eslintConfig;


