import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import './App.css';

import Popup from './components/popup'

function App() {
  const [wizardOpen, setWizardOpen] = useState(true);

  const closeWizard = () => {
    setWizardOpen(false)
  }

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
