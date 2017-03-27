
var topics=["Samuel L Jackson", "John Travolta", "Larry David", "Tina Fey", "Zach Galifianakis", "Kate McKinnon", "Bill Murray", "Illana Glazer"];
  
//  function getButtons(){

//   // $("#buttons").empty();

//   for(var i; i<topics.length; i++){
//     var newButton=$("<button>");
//     newButton.attr("data-show", topics[i]);
//     newButton.text(topics[i]);

//     $("#buttons").append(newButton);
//   }
// };

 function getButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons").empty();

        // Loops through the array of movies
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of movie to our button
          a.addClass("show");
          // Added a data-attribute
          a.attr("data-show", topics[i]);
          // Provided the initial button text
          a.text(topics[i]);
          // Added the button to the buttons-view div
          $("#buttons").append(a);
        }
      }

$("#add-show").on("click", function(event){
  event.preventDefault();

  var newShow=$("#show-input").val().trim();

  (topics).push(newShow);

  getButtons();

})



 function displayGifs() {
      var searchTerm = $(this).attr("data-show");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;
          

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height_still.url);
            personImage.attr("data-still", results[i].images.fixed_height_still.url);
            personImage.attr("data-animate", results[i].images.fixed_height.url);
            personImage.attr("data-state", "still");
            personImage.addClass("gif");
            

            gifDiv.prepend(p, personImage);
            
            $("#gifs-appear-here").prepend(gifDiv);
          };

       $(".gif").on("click", function() {

          var state=$(this).attr("data-state");
         console.log(state)

           if(state==="still"){
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            }else{
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }

          });

        });


    };
  $(document).on("click", ".show", displayGifs);

getButtons();



