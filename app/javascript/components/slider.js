const initFullCardProduct = () => {
  const trigger = document.querySelector('.slider')
  const card = document.querySelector('.card-product')
  trigger.addEventListener('click', () => {
    console.log("Hello from slider");
    trigger.classList.add('open-full');
    card.classList.add('open');
  })
}

export { initFullCardProduct }
