import React, {useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './button';
import OptionButton from './option_button';

// import FirstImage from '../images/first_image.svg';

function Popup({closeWizard}) {
  const [page, setPage] = useState(1);

  const [trueCheckmark, setTrueCheckmark] = useState(false);
  const [falseCheckmark, setFalseCheckmark] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [plan, setPlan] = useState(null);

  const [ answers, setAnswers ] = useState({
    monetized: null,
    hosting: null,
    redistribution: null
  })

  const [ pages ] = useState([
    {
      image: "https://staging.froala.com/wp-content/uploads/2021/02/first_image.svg",
      subtitle: "Let's help you find the right plan."
    },
    {
      answer: "monetized",
      title: "Do you plan to monetize your app?",
      options: ["Yes", "No"]
    },
    {
      answer: "hosting",
      title: "Will you or your customer deploy your app on-prem or host it on the web/cloud?",
      options: ["On-prem", "Web/cloud"]
    },
    {
      answer: "redistribution",
      title: "Is this app going to be generally accessible to the public or for internal staff only?",
      options: ["Generally accessible", "Internal only"]
    }
  ])

  const [ planOptions ] = useState({
    "Basic": {
      "link": "https://staging.froala.com/wp-content/uploads/2021/02/basic.svg",
      "list": [
        <p><span classnNme={"check-mark"}></span>Unlimited users</p>,
        <p><span classnNme={"check-mark"}></span>Up to 3 domains</p>,
        <p><span classnNme={"check-mark"}></span>Single product</p>,
        <p><span classnNme={"check-mark"}></span>Community Support</p>,
        <p><span classnNme={"cross-mark"}></span>No source code access</p>,
        <p><span classnNme={"cross-mark"}></span>No redistribution rights</p>
      ]
    },
    "Pro": {
      "link": "https://staging.froala.com/wp-content/uploads/2021/02/first_image.svg",
      "list": [
        <p><span classnNme={"check-mark"}></span>Unlimited users</p>,
        <p><span classnNme={"check-mark"}></span>Unlimited domains</p>,
        <p><span classnNme={"check-mark"}></span>Single product</p>,
        <p><span classnNme={"check-mark"}></span>Full source code access</p>,
        <p><span classnNme={"check-mark"}></span>Professional Support</p>,
        <p><span classnNme={"cross-mark"}></span>No redistribution rights</p>
      ]
    },
    "Enterprise": {
      "link": "https://staging.froala.com/wp-content/uploads/2021/02/ent.svg",
      "list": [
        <p><span classnNme={"check-mark"}></span>Unlimited users</p>,
        <p><span classnNme={"check-mark"}></span>Unlimited domains</p>,
        <p><span classnNme={"check-mark"}></span>Unlimited products</p>,
        <p><span classnNme={"check-mark"}></span>Full source code access</p>,
        <p><span classnNme={"check-mark"}></span>Complete redistribution rights</p>,
        <p><span classnNme={"check-mark"}></span>Professional Support</p>
      ]
    }
  })

  const getPlan = () => {
    if (answers.hosting === true) {
      setPlan("Enterprise");
    } else if (answers.redistribution === true) {
      setPlan("Pro");
    } else if (answers.monetized === true) {
      setPlan("Pro");
    } else {
      setPlan("Basic");
    }
  }

  const handleSelection = (answer, bool) => {
    setAnswers({ ...answers, [answer]: bool});
    setTrueCheckmark(bool);
    setFalseCheckmark(!bool);
    setIsDisabled()
  }

  const resetButtons = () => {
    setTrueCheckmark(false);
    setFalseCheckmark(false);
    setIsDisabled(true);
  }

  const paginate = (step) => {
    if (page === 4) {
      getPlan();
    }

    if (step > 0) {
      resetButtons();
    }

    setPage(page + step);
  }

  console.log(answers)
  return(
    <motion.div
      key={1}
      initial={{opacity: 0, scale: 0.8}}
      animate={{opacity:1, scale:1}}
      exit={{opacity:0, scale: 0.8, transition:{duration: 1.5}}}
      transition={{ type: "spring", duration: 1.2, bounce: 0.6}}
      className={"wizard-main-window-border"}>
      <div className={"wizard-main-window flex column space-between"}>
        <button onClick={closeWizard} onTouchEnd={closeWizard} className={"wizard-close-button"}>X</button>

        {pages.map( (p, i) => {
          if (page === i + 1) {
            return  <AnimatePresence key={page}>
                      <motion.div
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity:1, scale:1}}
                        exit={{opacity:0, scale: 0.8, transition:{duration: 1.5}}}
                        transition={{ type: "spring", duration: 1.2, bounce: 0.6}}
                        className={"wizard-page flex column align-center space-around h-100"}
                      >


                        {p.title &&
                          <h3>{p.title}</h3>
                        }

                        {p.subtitle &&
                          <h4 className={"wizard-options-subtitle"}>{p.subtitle}</h4>
                        }

                        {p.image &&
                          <img src={p.image} className={`image-${i+1}`} alt={`Froala pricing plan wizard step ${i + 1}`}/>
                        }


                        {p.options &&
                          <div className={"wizard-options-container flex space-between"}>
                            <OptionButton bool={true} checked={trueCheckmark} answer={p.answer} option={p.options[0]} handleSelection={handleSelection}/>

                            <OptionButton bool={false} checked={falseCheckmark} answer={p.answer} option={p.options[1]} handleSelection={handleSelection}/>
                          </div>
                        }

                      </motion.div>
                    </AnimatePresence>
          }
        })}

        { page === 5 &&
          <motion.div
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity:1, scale:1}}
            transition={{ type: "spring", duration: 1.2, bounce: 0.6}}
            >
            <h3>The plan most suited to your needs is</h3>
            <h1>{plan}</h1>
            <div className={"d-flex-around"}>
              <img src={planOptions[plan]["link"]} alt={`You've chosen ${plan} plan`} className={"image-1"}/>
              <div class={"text-small left-align"}>
                <p>{plan} plan highlights</p>
                <ul>
                  {planOptions[plan]["list"].map( listItem => {
                    return <li>{listItem}</li>
                  } )}
                </ul>
              </div>
            </div>
          </motion.div>
        }

        <div className={"flex space-between"}>
          { page === 1 &&
            <React.Fragment>
              <Button action={closeWizard} text={"Remind me later"}/>
              <Button action={() => paginate(1)} text={"Begin"}/>
            </React.Fragment>
          }
          { page > 1 &&
            <Button action={() => paginate(-1)} text={"Previous"}/>
          }
          { page < 5 && page > 1 &&
            <Button action={() => paginate(1)} isDisabled={isDisabled} text={"Next"}/>
          }
          { page === 5 &&
            <Button action={closeWizard} text={"Finish"}/>
          }
        </div>
      </div>
    </motion.div>
  )
}

export default Popup;
