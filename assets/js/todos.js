class TodoList {
  constructor() {
    this.state = {
      user: "deontemanning@gmail.com",
      todos: "",
      id:''
    },
    this.todo = (task) => {
      return {
        todo_id: this.state.id,
        name: task,
        completed: false,
        email: this.state.user
      }
    }
  }

   addTodo = async (task) => {
    const response = await fetch("http://localhost:3000/addTodo", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(this.todo(task)),
    });
    this.drawTodo(this.todo(task));
    const data = await response.json();
    this.state.todos = data.todos;
    this.setTodoId();
  }

   getTodos = async () => {
    const response = await fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: this.state.user,
      }),
    });
    const data = await response.json();
    this.state.todos = await data.todos;
  };

   renderTodos = () => {
     const data = this.state.todos;
    data.map((todo) => {
     this.drawTodo(todo);
    });
  };

  drawTodo = (todo) => {
     const list = $('#list');
     const trashCan = '<span><i class="fa fa-trash"></i></span>';
     list.append(`<li id=${todo.todo_id} class='todo'>${trashCan} ${todo.name}</li>`);
  }

  setTodoId = () => {
    const lastId = $('.todo').last().attr('id');
    this.state.id = lastId + 1;
  }

  init = async () => {
    await this.getTodos();
    await this.renderTodos();
    await this.setTodoId();
  };
}

const todolist = new TodoList();

todolist.init();



// Check Off Specific Todos By Clicking
$('ul').on('click', 'li', function (){ //adds listeners on lis inside ul that may or
  $(this).toggleClass('completed');   // may not be there yet.
});

//Click on X to Delete Todo
$('ul').on('click','span', function (event) {
  $(this).parent().fadeOut(500, function (){
    $(this).remove();
  });
  event.stopPropagation();
});

//Add new Todo
$('input[type = text]').keypress(function(event){  
  if (event.which === 13){
    //grabbing todo text from input
    var todoText= ($(this).val());
    var trashCan = '<span><i class="fa fa-trash"></i></span>';
    $(this).val(''); //sets input to empty
    todolist.addTodo(todoText);
  }
});

// Toggle Todo input
$('.fa-plus').click(function (){
  $('input[type =text]').fadeToggle(300);
});



