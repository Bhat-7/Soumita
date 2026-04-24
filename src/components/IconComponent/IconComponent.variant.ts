import { cv } from "css-variants";

const IconVariants = cv({
  base: "w-6 h-6",
  variants: {
    size: {
      small: "w-4 h-4",
      medium: "w-6 h-6",
      large: "w-8 h-8",
    },
  },
});
