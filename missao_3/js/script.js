'use strict';
/*
 * Varibles that store the SVG (in HTML) of 'remove' and 'complete' icons;
 */
const removeIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
const completeIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';


const todos = (localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []);	
const completed = (localStorage.getItem('completed') ? JSON.parse(localStorage.getItem('completed')) : []);

loadItens();

function loadItens() {
	for(let i = 0; i < todos.length; i = i + 1) {
		addItemToDOM(todos[i]);
	}

	for(let i = 0; i < completed.length; i = i + 1) {
		addItemToDOM(completed[i], true);
	}
}
/*
 * This piece of code gets the text on the input field and adds it as a paramenter to the function 'addItemToDom'
 * upon clicking on the "+" button. It doesn't accept blank items (no text on the field) and cleans the text 
 * input field after adding a new item.
 */
document.getElementById('new-item-button').onclick = function() {
	addToDo();
}   
document.getElementById('new-item-input').addEventListener("keyup", function(event) {
	if(event.keyCode === 13) {
		addToDo();
	} 
})

function addToDo() {
	const itemText = document.getElementById('new-item-input').value;
	if(itemText) {
		todos.push(itemText);
		addItemToDOM(itemText);
		document.getElementById('new-item-input').value = '';
	}
	updateStorage();		
}

/*
 * This function receive a text from the input field and adds it as inner Text of a new li element
 * with complete and remove buttons, on the top of the to do list.  
 */
function addItemToDOM(itemText, completed) {
    const item = document.createElement('li');
    item.innerText = itemText;

/*
 * Creating the div element to organize list item's buttons and storing it on the buttons variable,
 * and adding the buttons class to it
 */
    const buttons = document.createElement('div');
   	buttons.classList.add('buttons');
/*
 * Creating both remove and complete buttons, adding their related classes and inner HTML by calling 
 * above functions removeIcon and completeIcon 
 */
   	const removeButton = document.createElement('button');
   	removeButton.classList.add('remove');
   	removeButton.innerHTML = removeIcon;
   	removeButton.onclick = removeItem;

   	const completeButton = document.createElement('button');
   	completeButton.classList.add('complete');
   	completeButton.innerHTML = completeIcon;
   	completeButton.onclick = completeItem;
/*
 * Adding above remove and complete buttons into buttons element.
 */
   	buttons.append(removeButton);
   	buttons.append(completeButton);

   	item.append(buttons);

/*
 * list variable will store both lists (completed or to do)
 * If the completed parameter is true so it will add this new item into the top of the completed list; 
 * if not, it will add it into our to do list.
 */	
 	const listId = (completed ? 'completed-list' : 'todo-list');

    document.getElementById(listId).prepend(item);
};

/* 
 * removeItem function identifies which li item has triggered the onclick property and then, remove it;
 */
function removeItem() {
	const item = this.parentNode.parentNode;
	const currentList = item.parentNode;
	const currentListId = currentList.id;
	const text = item.innerText;
	item.remove();

	if(currentListId == 'todo-list') {
		todos.splice(todos.indexOf(text),1);
	} else {
		completed.splice(completed.indexOf(text),1);
	}
	updateStorage();
}

/* 
 * completeItem function identifies which li item has triggered the onclick property, its id
 * and removes it.
 */
function completeItem() {	
	const item = this.parentNode.parentNode;
	const currentList = item.parentNode;
	const currentListId = currentList.id;
	const text = item.innerText;

	item.remove();
/* 
 * Depending on the list the item came from, the function will reposition it. 
 * If it came from our to do list, the item will be placed in our completed list and while
 * if it came from our completed list, it will be back to our to do list.
 */
	if(currentListId == 'todo-list') {
		todos.splice(todos.indexOf(text),1);
		completed.push(text);
		document.getElementById('completed-list').prepend(item);
	} else {
		completed.splice(completed.indexOf(text),1);
		todos.push(text);
		document.getElementById('todo-list').prepend(item);
	}
	updateStorage();
}


function updateStorage() {
	localStorage.setItem('todos',JSON.stringify(todos));
	localStorage.setItem('completed',JSON.stringify(completed));
}