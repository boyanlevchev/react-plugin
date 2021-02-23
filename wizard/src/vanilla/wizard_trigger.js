export const modalTrigger = (stateUpdate) => {
  const trigger = document.querySelector('#show-wizard-modal-button');
  console.log("modal trigger method running");
  if (trigger) {
    console.log("trigger selected");
    trigger.addEventListener("click", (button) => {
      console.log("trigger clicked");
      stateUpdate();
      return false;
    });
  }
};
