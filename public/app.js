$(document).ready(function() {
   $.getJSON("/api/todos")
      .then(addTodos)
      .catch(function(err) {
         alert(err + "please call for help")
      })


   $("#todoInput").keypress(function(event) {
      if (event.which == 13) {
         createTodo();
      }
   })
});

function addTodos(todos) {
   todos.forEach(function(todo) {
      addTodo(todo);
      console.log(todo)
   })
}

$(".list").on("click", "li", function() {
   updateTodo($(this));
})

$(".list").on("click", "span", function(event) {
   event.stopPropagation();
   removeTodo($(this).parent());
})

function addTodo(todo) {
   var newTodo = $("<li>" + todo.name + " <span><i>X</i></span></li>");
   newTodo.data("id", todo._id)
   newTodo.data("completed", todo.completed)
   if (todo.completed) {
      newTodo.addClass("done");

   }
   newTodo.addClass("task")
   $(".list").append(newTodo);
}

function createTodo() {
   var userInput = $("#todoInput").val();
   $.post("/api/todos", { name: userInput })
      .then(function(newTodo) {
         console.log(newTodo)
         $("#todoInput").val("");
         addTodo(newTodo);
      })
      .catch(function(err) {
         alert(err + "please call for help");
         console.log(err);
      })
}

function removeTodo(todo) {
   var clickedId = todo.data("id");
   var deleteUrl = "/api/todos/" + clickedId;
   $.ajax({
         method: "DELETE",
         url: deleteUrl
      })
      .then(function(data) {
         todo.remove();
      })
      .catch(function(err) {
         console.log(err);
      })
}

function updateTodo(todo) {
   var updateUrl = "/api/todos/" + todo.data("id")
   var isDone = !todo.data("completed");
   var updateData = { completed: isDone }
   $.ajax({
         method: "PUT",
         url: updateUrl,
         data: updateData
      })
      .then(function(updatedTodo) {
         todo.toggleClass("done");
         todo.data("completed", isDone)
      })
      .catch(function(err) {
         console.log(err);
      })
}
