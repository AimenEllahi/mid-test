$(document).ready(function () {
  //calling functions here
  loadRecipes();
  $(".product-section").on("click", ".delete-btn", handleDelete);
  $(".product-section").on("click", ".edit-btn", handleUpdate);
  $("#add").click(addRecipe);
  $("#save-changes").click(saveRecipes);
});

//function to load recipes
const loadRecipes = function () {
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "GET",
    error: function (response) {
      var div = $(".product-section");
      div.html("An Error has occured");
    },
    success: function (response) {
      console.log(response);
      var div = $(".product-section");
      div.empty();
      for (var i = 0; i < response.length; i++) {
        div.append(
          `<div class="col-lg-3 col-md-5 col-10 productCard-1 mt-5" data-id="${response[i]._id}">
                    <img class = "product-img" src ="./images/food.jpg">
                     <h2 class="title" >${response[i].title}</h2>
                    <span class="body">${response[i].body}</span>
                    <button class="own-btn edit-btn"  data-toggle="modal" data-target="#edit-form">Edit</button>
                    <button class="own-btn delete-btn">Delete</button>
                
            </div>`
        );
      }
    },
  });
};

//function to delete recipe
function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".productCard-1");
  let id = parentDiv.attr("data-id");
  console.log(id);
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
    method: "DELETE",
    success: function () {
      loadRecipes();
    },
  });
}

//create recipe function
function addRecipe() {
  var title = $(".inputTitle").val();
  var body = $(".inputBody").val();

  console.log(title, body);
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "POST",
    data: { title, body },
    success: function (response) {
      $(".inputTtitle").val("");
      $(".inputBody").val("");
      loadRecipes();
      $("#create").modal("hide");
    },
  });
}

//handle update
function handleUpdate() {
  var btn = $(this);
  var parentDiv = btn.closest(".productCard-1");
  let id = parentDiv.attr("data-id");
  $.get(
    "https://usman-recipes.herokuapp.com/api/recipes/" + id,
    function (response) {
      console.log(response);
      $(".UpdateId").val(response._id);
      $(".UpdateTitle").val(response.title);
      $(".UpdateBody").val(response.body);
    }
  );
}

function saveRecipes(evt) {
  //save changes
  var id = $(".UpdateId").val();
  var title = $(".UpdateTitle").val();
  var body = $(".UpdateBody").val();
  console.log(id, title, body);
  evt.preventDefault();
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
    data: { title, body },
    method: "PUT",
    success: function (response) {
      console.log(response);
      loadRecipes();
      $(".updateModal").modal("hide");
    },
  });
}
