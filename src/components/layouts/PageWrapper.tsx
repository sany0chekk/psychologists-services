import { motion } from "motion/react";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className = "" }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 25 }}
      transition={{
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      {children}
    </motion.div>
  );
}
