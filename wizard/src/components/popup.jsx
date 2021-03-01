import React, {useState, useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './button';
import OptionButton from './option_button';



function Popup({closeWizard, term}) {


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
      image: "https://froala.com/wp-content/uploads/2021/03/first_image.svg",
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
      "image": "https://froala.com/wp-content/uploads/2021/03/basic.svg",
      "price": "$199",
      "annual_link": "https://store.froala.com/buy-now/wysiwyg-editor/basic-term-license/",
      "perpetual_link": "https://store.froala.com/buy-now/wysiwyg-editor/basic-license/",
      "list": [
        [true, <p>Unlimited users</p>],
        [true, <p>Up to 3 domains</p>],
        [true, <p>Single product</p>],
        [true, <p>Community Support</p>],
        [false, <p>No source code access</p>],
        [false, <p>No redistribution rights</p>]
      ]
    },
    "Pro": {
      "image": "https://froala.com/wp-content/uploads/2021/03/first_image.svg",
      "price": "$899",
      "annual_link": "https://store.froala.com/buy-now/wysiwyg-editor/pro-term-license/",
      "perpetual_link": "https://store.froala.com/buy-now/wysiwyg-editor/pro-license/",
      "list": [
        [true, <p>Unlimited users</p>],
        [true, <p>Unlimited domains</p>],
        [true, <p>Single product</p>],
        [true, <p>Full source code access</p>],
        [true, <p>Professional Support</p>],
        [false, <p>No redistribution rights</p>]
      ]
    },
    "Enterprise": {
      "image": "https://froala.com/wp-content/uploads/2021/03/ent.svg",
      "price": "$1,999",
      "annual_link": "https://store.froala.com/buy-now/wysiwyg-editor/enterprise-term-license/",
      "perpetual_link": "https://store.froala.com/buy-now/wysiwyg-editor/enterprise-license/",
      "list": [
        [true, <p>Unlimited users</p>],
        [true, <p>Unlimited domains</p>],
        [true, <p>Unlimited products</p>],
        [true, <p>Full source code access</p>],
        [true, <p>Complete redistribution rights</p>],
        [true, <p>Professional Support</p>]
      ]
    }
  })

  const getPlan = () => {
    if (answers.hosting === true) {
      setPlan("Enterprise");
    } else if (answers.redistribution === false) {
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
            className={"flex column space-between"}
            >
            <p className={"m-0"}>The plan most suited to your needs is</p>
            <p className={"text-xlarge mt-1"}>{plan}</p>
            <div className={"flex space-around align-center mt-2 h-100"}>
              <img src={planOptions[plan]["image"]} alt={`You've chosen ${plan} plan`} className={"image-2"}/>
              <div className={"text-small left-align flex column align-center"}>
                <div>
                  <span className={`${plan.toLowerCase()}_plan_conatiner`}>{planOptions[plan]["price"]}</span>
                  <span classname={"basic_plan_type"}> / year</span>
                </div>
                <div className={"plan_switcher small-switcher flex align-center my-1"}>
                  <span className={"annual dark"}>Annual</span>
                  <span>
                    <label className={"switch m-0"} htmlFor={"annual_perpetual_plan"}>
                      <input type={"checkbox"} name={"annual_perpetual_plan"} id={"annual_perpetual_plan"}/>
                      <span className={"slider round"}></span>
                    </label>
                  </span>
                  <span className={"perpetual light"}>Perpetual</span>
                </div>
                <ul className={"custom-ul"}>
                  {planOptions[plan]["list"].map( listItem => {
                    return <li className={"flex"}><i className={listItem[0] === true ? "fa fa-check" : "fas fa-times"}></i>{listItem[1]}</li>
                  } )}
                </ul>
                <a
                  className={"buy-now-link wizard-buy-now-button"}
                  href={term === "perpetual" ? planOptions[plan]["perpetual_link"] : planOptions[plan]["annual_link"]}
                  rel={"nofollow"}
                  >Buy now</a>
              </div>
            </div>
          </motion.div>
        }

        <div className={"flex space-between"}>
          { page === 1 &&
            <React.Fragment>
              <motion.a className={"wizard-remind-me-later"} href onClick={e => {e.preventDefault(); closeWizard();}} >Remind me later</motion.a>
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
