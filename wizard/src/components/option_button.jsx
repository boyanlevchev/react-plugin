import React from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons'

function OptionButton({handleSelection, answer, option, bool, checked}) {
  return(
    <motion.button
      type={"button"}
      className={"wizard-options-toggle flex align-center justify-center"}
      onClick={ e => handleSelection( answer, bool ) }>
      <p className={"h-100 w-100 flex align-center justify-center m-0"}>
        <FontAwesomeIcon icon={faCircle} size="2x" className={"mr-1"}/>
        {option}
      </p>
      <AnimatePresence>
        {checked &&
          <motion.div
            initial={{width: 0}}
            animate={{width: '100%'}}
            exit={{width: 0, transition:{duration: 0.8}}}
            transition={{ type: "spring", duration: 0.8, bounce: 0.2}}
            className={"overlay-container"}
            >
              <div className={"wizard-toggle-overlay flex align-center justify-center"}>
                <p className={"h-100 w-100 flex align-center justify-center m-0"}>
                  <FontAwesomeIcon icon={faCheckCircle} size="2x" className={"mr-1"}/>
                  {option}
                </p>
              </div>
            </motion.div>
        }
      </AnimatePresence>
    </motion.button>
  )
}

export default OptionButton;
