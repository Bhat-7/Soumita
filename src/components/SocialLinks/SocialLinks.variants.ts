import { cv } from "css-variants";

const SocialLinksVariants = cv({
  base: "flex gap-2 items-start",
  variants: {
    for: {
      contact: "flex-col gap-2 md:flex-row lg:flex-row mx-7",
      footer: "flex-row justify-center align-middle",
    },
  },
});

export default SocialLinksVariants;
