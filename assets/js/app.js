var superheroes = ["Hulk", "Batman", "She-ra", "wonder woman"];


function renderButtons() {

    $("#hero-buttons").empty();

    for (i = 0; i < superheroes.length; i++) {
        var heroButton = $("<div>");
        heroButton.addClass("hero-button")
        heroButton.attr("data-hero", superheroes[i]);
        heroButton.text(superheroes[i])


        $("#hero-buttons").append(heroButton);

    }

}

// Adding a Superhero
$("#add-hero").on("click", function () {

    event.preventDefault();

    
    // Here we grab the text from the input box
    var hero = $("#hero-input").val().trim();

    if(hero === ""){
        s
    } else {
        superheroes.push(hero);
        console.log(superheroes);

        renderButtons();

    }


    

});
//when the hero-buttons are clicked 

function displayGifs() {
    console.log("clicked");
    var heroChoice = $(this).attr("data-hero");
    // console.log(heroChoice);

    $("#gif-view").empty();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        heroChoice + "&api_key=R2Ic6XaADUjXmclYhRmI1qwUekutBBMM&limit=12&rating=G";

    // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=R2Ic6XaADUjXmclYhRmI1qwUekutBBMM&tag=" 
    // + heroChoice + "&rating=G";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("card m-1")

                var rating = results[i].rating;

                var p = $("<h4>").text("Rating: " + rating);
                p.addClass("card-title px-2")

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height.url);
                gifImage.attr("data-state", "animated")
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.addClass("gif card-img-top");


                gifDiv.prepend(p);
                gifDiv.prepend(gifImage);

                $("#gif-view").append(gifDiv);
            }
        });
}

function pausingGifs() {
    var state = $(this).attr("data-state");
    if (state === "animated") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    } else {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animated");
    }
}

$(document).on("click", ".hero-button", displayGifs);
$(document).on("click", ".gif", pausingGifs);


renderButtons();



