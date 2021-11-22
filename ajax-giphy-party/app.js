console.log("Let's get this party started!");
const gifGalleryDiv = document.getElementById("gifs")


// gifQueryResults is a single giphy url returned by the submitQuery(), which takes a search string


function setURL(data) {
    const URL = data.images.original.url
    console.log(URL)

    const div = document.createElement("div");
    div.classList.add("gif");
    div.classList.add("flex-fill");
    div.innerHTML = `<img src="${URL}&api_key=y4HPWQjd1B47RnE08OuKqJDzgymD4aqN">`
    gifGalleryDiv.append(div)
}



document.getElementById("search").addEventListener('click', async (e) => {
    e.preventDefault();
    console.log("you clicked the search button")
    let query = document.getElementById("search-query")

    const res = await axios.get("http://api.giphy.com/v1/gifs/search", 
        {params: 
            {     
                api_key: "y4HPWQjd1B47RnE08OuKqJDzgymD4aqN",
                q: `${query.value}`,
                limit: 1,
            }
        });  
    
    setURL(res.data.data[0]);
    query.value = ""
});

document.getElementById("remove").addEventListener('click', () => {
    e.preventDefault();
    document.getElementById("gifs").removeChild
})

