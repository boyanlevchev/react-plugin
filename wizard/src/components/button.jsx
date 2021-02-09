import React from 'react';

import { motion } from 'framer-motion';

function Button({action, text, isDisabled}) {
  return(
    <motion.button
      whileTap={{ scale: 0.92}}
      transition={{ type: "spring", duration: 0.7, bounce: 0.7}}
      className={`wizard-button ${isDisabled ? "disabled-wizard-button" : ""}`}
      onClick={action}>
      {text}
    </motion.button>
  )
}

export default Button;
