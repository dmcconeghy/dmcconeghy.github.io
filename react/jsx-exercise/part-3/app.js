function App () {
   return (
       <div>
            <Person 
                name = "Colt Steele"
                age = { 30 }
                hobbies = {["Chicken-raising", "watching Amadeus", "Making coding videos"]}
            />

            <Person 
                name = "Dr. Doom"
                age = { 60 }
                hobbies = {["Taking over the world", "Brooding", "Getting his ass kicked by the Fantastic Four"]}
            />

            <Person 
                name = "The Thing"
                age = { 17 }
                hobbies = {["Brick-laying", "Winning staring contests", "Not being the smallest"]}
            />

        </div>
   );
}