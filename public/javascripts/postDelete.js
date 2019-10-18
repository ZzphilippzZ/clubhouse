/* eslint-env browser */

function addFunctionToForms(fn) {
  const forms = document.querySelectorAll('form');
  for (const form of forms) {
    form.addEventListener('submit', fn);
  }
}

function confirmPostDeletion(event) {
  const isConfirmed = confirm('Are you sure you want to delete this post');
  if (!isConfirmed) {
    event.preventDefault();
  }
}

addFunctionToForms(confirmPostDeletion);
