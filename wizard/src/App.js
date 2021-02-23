import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import './App.css';

import Popup from './components/popup'

import { modalTrigger } from './vanilla/wizard_trigger'

function App() {
  const [wizardOpen, setWizardOpen] = useState(true);

  const closeWizard = () => {
    setWizardOpen(false);
  }

  useEffect(() => {
    modalTrigger(() => setWizardOpen(true));
  },[])

  return (
    <div className="App underlay-container react-pricing-wizard">

      <AnimatePresence>
        {wizardOpen &&
          <Popup closeWizard={closeWizard}/>
        }
      </AnimatePresence>
    </div>
  );
}

export default App;
