function addFunctionToForms(fn) {
	let forms = document.querySelectorAll('form');
	for(let form of forms) {
		form.addEventListener('submit', fn);
	}
}

function confirmPostDeletion(event) {
	let isConfirmed = confirm('Are you sure you want to delete this post');
	if(!isConfirmed) {
		event.preventDefault();
	}
};

addFunctionToForms(confirmPostDeletion);
