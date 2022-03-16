$("#movieRating").on("change", function(){
    let rating = $("#movieRating").val();
    $("#ratingValue").text("(" + rating + " out of 10)");
})

$("#movie").on("submit", function(e) {
    e.preventDefault()
    let title = $("#movieTitle").val();
    let rating = $("#movieRating").val();
    let button = $("<input type=button id='removeEntry' value='Remove'>");
    $("#ratedMovies").append("<li>" + title + " | " + rating + " out of 10 </li> ")
    $("#ratedMovies li:last").append(button).on("click", function(e) {
        console.log(e);
        $(e.target).parent().remove();
    })
});
