window.addEventListener('load', ()=>{
    //this is a json file created to store the todo list and will be update every time user put a value inside it
    var todos = JSON.parse(localStorage.getItem('todos'))||[];
    //targeting the first input tag where user will give there name 
    const nameInput = document.querySelector('#name'); //This target the name input tag where user would give his name
    const newTodoForm = document.querySelector('#new-todo-form');//This target the form of Todo list that has the todo input tag and catagory selection

    const username = localStorage.getItem('username')||''; //this will get the value of 'username' index
    nameInput.value = username; //This will put the value of 'username' index inside the First input tag

    nameInput.addEventListener('change', (e)=>{
        localStorage.setItem('username', e.target.value); //this target the change happening on the input tag and put the value on local storage with 'username' index
    })

    newTodoForm.addEventListener('submit', e =>{
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value, //Targeting the text will be put in To-Do input tag
            category: e.target.elements.catagory.value, //Targeting the radio button text will be selected in the radion input tag
            done: false,
            createAt: new Date().getTime()
        }

        todos.push(todo); //This will put the value added on the todo list by catagory on the todos json file every time the 'add todo' button is clicked

        localStorage.setItem('todos', JSON.stringify(todos));//This will store the value given to the todoList on 'todos' index in local storage as a string

        e.target.reset(); //This will reset the todo input tag and the radio button every time we add a todo list

        DisplayTodos();
    })

    function DisplayTodos(){
        const todoList = document.querySelector('#todo-list'); //Targetting the third part of the app which will have the todo list

        todoList.innerHTML = ''; //

        todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item'); //This will have all the todos with button whenever we create a todo 

            //making variable for all the html tag we need
            const label = document.createElement('label');
            const input = document.createElement('input');
            const span = document.createElement('span');
            const content = document.createElement('div');
            const actions = document.createElement('div');
            const deleteButton = document.createElement('button');
            const edit = document.createElement('button');

            input.type = 'checkbox';
            input.checked = todo.done; //this create a crossed mark
            span.classList.add('bubble');//this create the radio button on the todos 

            if(todo.category == 'personal'){
                span.classList.add('personal');       
            }else{
                span.classList.add('business');
            }

            content.classList.add('todo-content');
            actions.classList.add('actions');
            edit.classList.add('edit');
            deleteButton.classList.add('delete');

            content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
            edit.innerHTML = "Edit";
            deleteButton.innerHTML = "Delete";

            label.appendChild(input);
            label.appendChild(span);
            actions.appendChild(edit);
            actions.appendChild(deleteButton);
            todoItem.appendChild(label);
            todoItem.appendChild(content);
            todoItem.appendChild(actions);

            todoList.appendChild(todoItem);

            if(todo.done){
                todoItem.classList.add('done');
            }

            input.addEventListener('click', e=>{
                todo.done = e.target.checked;
                localStorage.setItem('todos', JSON.stringify(todos));

                if(todo.done){
                    todoItem.classList.add('done');
                }else{
                    todoItem.classList.remove('done');
                }
                // todoItem.classList.toggle('done');
                DisplayTodos();
            })

            edit.addEventListener('click', e=>{
                const input = content.querySelector('input');
                input.removeAttribute('readonly');//this will make the edit feature avilable on todo inputs
                input.focus(); //this will focus on input and make the cursor available when the edit option is clicked
                input.addEventListener('blur', e=>{ //blur means clicking outside the box
                    input.setAttribute('readonly',true);//this will off the feature of edit
                    todo.content = e.target.value;//this will store the value user edited to the todo list
                    localStorage.setItem('todos', JSON.stringify(todos));
                    DisplayTodos();
                })
            })
            deleteButton.addEventListener('click', e =>{
                todos = todos.filter(t =>t != todo);
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })

        });
 
    }
})
