//Define ui vars
const form=document.querySelector('#task-form')
const taskList=document.querySelector('.collection')
const clearBtn=document.querySelector('.clear-tasks')
const filter=document.querySelector('#filter')
const taskInput=document.querySelector('#task')

//Load all event listeners
loadEventListeners();

function loadEventListeners(){
    //DOM Load event
    document.addEventListener('DOMContentLoaded',getTasks)
    //add task
    form.addEventListener('submit',addTask);
    //remove task
    taskList.addEventListener('click',removeTask)
    //Clear task event
    clearBtn.addEventListener('click',clearTask)
    //Filter tasks
    filter.addEventListener('keyup',filterTask)
}

//Get Tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task){
         //Create li element
        const li=document.createElement('li')
        //Add class
        li.className='collection-item'
        //Create text node and append to li
        li.appendChild(document.createTextNode(task))
        //Create new link element
        const link=document.createElement('a')
        //Add class
        link.className = 'delete-item secondary-content'
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>'
        //Append link to li
        li.appendChild(link)
        //APpend li to ul
            // console.log(li);
        taskList.appendChild(li)
    })
}

//Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task!')
    }
    //Create li element
    const li=document.createElement('li')
    //Add class
    li.className='collection-item'
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value))
    //Create new link element
    const link=document.createElement('a')
    //Add class
    link.className = 'delete-item secondary-content'
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    //Append link to li
    li.appendChild(link)
    //APpend li to ul
        // console.log(li);
    taskList.appendChild(li)
    //store in LS
    storeTaskInLocalStorage(taskInput.value);
    //Clear the tasks
    taskInput.value='' 
    e.preventDefault()
}

//store in LS
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
         if(confirm('Are u sure?')){
            e.target.parentElement.parentElement.remove();
            //Remove task from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
         }
        // console.log(e.target);
    }
}
//Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1)
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
// Clear Tasks
function clearTask(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }
    //or
    // taskList.innerHTML='';
    clearTasksFromLocalStorage()
}

//Clear from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// //Filter Task
function filterTask(e){
    const txt=e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item=task.firstChild.textContent;
        if(item.toLowerCase().indexOf(txt)!=-1){
            task.style.display='block'
        }else{
            task.style.display='none'

        }
    })
}