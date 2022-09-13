document.addEventListener('DOMContentLoaded', event => {
  let modalLayer = document.querySelector('#modal-layer');
  let modal = document.querySelector('#modal')
  let openLink = document.querySelector('#open');
  let closeLink = document.querySelector('#close');

  // we use css to help us with the user experience
  // we add or remove class name to trigger visibility;
  function hideModal (event) {
    modalLayer.classList.replace('show', 'hide');
    modal.classList.replace('show', 'hide');
  }
  function showModal(event) {
    modalLayer.classList.replace('hide', 'show');
    modal.classList.replace('hide', 'show');
  }
  
  openLink.addEventListener('click', showModal);
  closeLink.addEventListener('click', hideModal);
})