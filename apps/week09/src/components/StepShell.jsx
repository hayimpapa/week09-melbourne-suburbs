import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Wraps each step's contents in a horizontal slide animation, like a tram
// rolling into the station. `direction` is 1 for forward, -1 for backward.
export default function StepShell({ stepKey, direction, children }) {
  return (
    <AnimatePresence mode="wait" initial={false} custom={direction}>
      <motion.div
        key={stepKey}
        custom={direction}
        variants={{
          enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
          center: { x: 0, opacity: 1 },
          exit: (d) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
        }}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ x: { type: 'spring', stiffness: 220, damping: 26 }, opacity: { duration: 0.15 } }}
        className="space-y-8"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
