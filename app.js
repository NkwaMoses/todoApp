// define UI vals
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load events
loadEventListeners();

//all event listeners
function loadEventListeners(){
    //domload
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task
    form.addEventListener('submit', addTask);
    //remove task
  taskList.addEventListener('click', deleteItem);
  //clear all tasks
  clearBtn.addEventListener('click', wipeAll);

  //filter 
  filter.addEventListener('keyup', filtTask);
}

//getting task

function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = []; 
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const li = document.createElement('li')
        //add class
        li.className = 'collection-item';
        //text node append to li
        li.appendChild(document.createTextNode(task));
        //new link element
        const link = document.createElement('a')
        //link class
        link.className = 'delete-item secondary-content';
        //link icon
        link.innerHTML = '<i class="fa fa-remove">x</i>';
        //appending link to li
        li.appendChild(link);
        //apend to ul
        taskList.appendChild(li)
    })
}
//Add task
function addTask(e){
if(taskInput.value === ''){
    alert('Please Add a task')
} else{
    //create li element
    const li = document.createElement('li')
    //add class
    li.className = 'collection-item';
    //text node append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //new link element
    const link = document.createElement('a')
    //link class
    link.className = 'delete-item secondary-content';
    //link icon
    link.innerHTML = '<i class="fa fa-remove">x</i>';
    //appending link to li
    li.appendChild(link);
    //apend to ul
    taskList.appendChild(li)
    //storevalues
  storeTaskInLS(taskInput.value)  
}
    //clear input
taskInput.value = '';

e.preventDefault();
}

//storing
function storeTaskInLS(task){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = []; 
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//deleItem
function deleteItem(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure to delete?')){
    e.target.parentElement.parentElement.remove();
    //remove from ls
    removeFromLS(e.target.parentElement.parentElement)
    }
  }
}
//remove from ls
function removeFromLS(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = []; 
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        if (taskItem.textContent===task) {
            task.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//wipeall
function wipeAll(){
    // taskList.innerHTML = ''

    //faster way
    while (taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    //clear from ls
    removeFromLS();
}
//removing
function removeFromLS(){
    localStorage.clear();
}
//filttask
function filtTask(e){
const text = e.target.value.toLowerCase();

document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
task.style.display = 'block';
    }else{
        task.style.display = 'none'
    }
});

}