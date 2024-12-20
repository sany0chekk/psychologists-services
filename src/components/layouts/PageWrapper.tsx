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
      initial={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      {children}
    </motion.div>
  );
}
