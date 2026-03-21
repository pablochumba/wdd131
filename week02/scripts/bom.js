const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

const li = document.createElement('li');
const deleteButton = document.createElement('button');
deleteButton.setAttribute('aria-label', 'Delete');

li.textContent = input.value;
deleteButton.textContent = '❌';

li.appendChild(deleteButton);
list.appendChild(li);







