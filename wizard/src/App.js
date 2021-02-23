import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import './App.css';

import Popup from './components/popup';

import { modalTrigger } from './vanilla/wizard_trigger';
import { termToggler } from './vanilla/term_toggle';

function App() {
  const [wizardOpen, setWizardOpen] = useState(true);
  const [term, setTerm] = useState("term");

  const closeWizard = () => {
    setWizardOpen(false);
  }

  useEffect(() => {
    modalTrigger(() => setWizardOpen(true));
    termToggler(setTerm);
  },[])

  return (
    <div className="App underlay-container react-pricing-wizard">

      {wizardOpen &&
        <Popup closeWizard={closeWizard} term={term}/>
      }
    </div>
  );
}

export default App;
