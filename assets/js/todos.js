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
  console.log('Key press');
  if (event.which === 13){
    //grabbing todo text from input
    var todoText= ($(this).val());
    var trashCan = '<span><i class="fa fa-trash"></i></span>';
    $(this).val(''); //sets input to empty
    // create new li and add to ul
    $('ul').append(`<li>${trashCan} ${todoText}</li>`);
  }
});

// Toggle Todo input
$('.fa-plus').click(function (){
  $('input[type =text]').fadeToggle(300);
});