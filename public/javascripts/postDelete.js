function addFunctionToButtons(fn) {
	let buttons = document.querySelectorAll('button');
	for(let button of buttons) {
		button.addEventListener('click', fn);
	}
}

function confirmPostDelete() {
	let isConfirmed = confirm('Are you sure you want to delete this post');
};

addFunctionToButtons(confirmDeletePost);
