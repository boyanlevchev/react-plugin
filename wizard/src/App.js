import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import {useWindowScroll} from 'react-use';
import { useCookies } from 'react-cookie';

import './App.css';

import Popup from './components/popup';

import { modalTrigger } from './vanilla/wizard_trigger';
import { termToggler } from './vanilla/term_toggle';

function App() {
  const {y} = useWindowScroll();

  const [alreadyOpened, setAlreadyOpened] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [term, setTerm] = useState("term");
  const [cookies, setCookie] = useCookies(['returning_user']);

  const closeWizard = () => {
    setWizardOpen(false);
  }

  useEffect(() => {
    if (y && y > 400 && alreadyOpened === false && !cookies.returning_user) {
      setTimeout(() => setWizardOpen(true), 5000);
      setAlreadyOpened(true);
      setCookie('returning_user', true, { path: '/', maxAge: 604800 });
    }
  },[y])

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
