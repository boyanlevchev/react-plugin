export const termToggler = (changeHref) => {
  const toggler = document.querySelector("#annual_perpetual_plan");
  if (toggler) {
    console.log(toggler)
    toggler.addEventListener("click", e => {
      console.log(e)
      if (e.target.checked) {
        console.log("checked")
        changeHref("perpetual");
      } else {
        console.log("UNchecked")
        changeHref("annual");
      }
    })
  }
};
