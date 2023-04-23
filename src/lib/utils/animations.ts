import { Variants } from "framer-motion";

export const popUpModal: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 80 },
};

export const leftToRight: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0 },
};

export const toTop: Variants = {
  hidden: { y: -20 },
  visible: { y: 0 },
};

export const notMove: Variants = {
  hidden: {},
  visible: {},
};
