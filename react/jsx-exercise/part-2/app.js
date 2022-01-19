function App() {
    return (
        <div>
            <Tweet
                date = "January 19, 2022"
                username = "dmcconeghy"
                user = "Dave McConeghy"
                msg = "Can you believe what this one politican said? Outrageous."
            />

            <Tweet
                date = "January 20, 2022"
                username = "bombastic"
                user = "Mr. Bombastic"
                msg = "It's absurd. Semi-fantastic, I'm sure."
            />

            <Tweet
                date = "January 21, 2022"
                username = "doctorwhoknows"
                user ="Time Lord"
                msg = "They've had many faces, many names... but also the question that must never be answered."
            />
        </div>
    );
}

// function App() {
//     return (
//       <div>
//         <Tweet
//           name="Matt Lane"
//           username="mmmaaatttttt"
//           date={new Date().toDateString()}
//           message="This app will disrupt everything!!"
//         />
//         <Tweet
//           name="Elie Schoppik"
//           username="eschoppik"
//           date={new Date().toDateString()}
//           message="#Ilovehashtags"
//         />
//         <Tweet
//           name="Tim Garcia"
//           username="TimGarcia0"
//           date={new Date().toDateString()}
//           message="Follow me on Twitter!"
//         />
//       </div>
//     );
//   }