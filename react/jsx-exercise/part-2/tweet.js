function Tweet(props) {
    return (

    <div class="tweet">
        <p> On <span class="date">{ props.date }</span> <span class="username">@{ props.username }</span> ({ props.user }) tweeted:</p>
        <p>{ props.msg }</p> 
    </div>
    );
}

// function Tweet(props) {
//     return (
//       <div className="tweet">
//         <span>{props.name}</span>
//         <span className="username">@{props.username}</span>
//         <span className="date">{props.date}</span>
//         <p>{props.message}</p>
//       </div>
//     );
//   }