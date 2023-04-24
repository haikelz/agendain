import { Variants } from "framer-motion";

type VariantsConfigProps = {
  popUpModal: Variants;
  pageTransition: Variants;
  leftToRight: Variants;
  toTop: Variants;
  notMove: Variants;
};

export const variants: VariantsConfigProps = {
  popUpModal: {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  },
  pageTransition: {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 80 },
  },
  leftToRight: {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 },
  },
  toTop: {
    hidden: { y: -20 },
    visible: { y: 0 },
  },
  notMove: {
    hidden: {},
    visible: {},
  },
};
