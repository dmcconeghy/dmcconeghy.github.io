import { useState } from "react";

const useFlipCard = (initialState = true) => {

    const [state, setState] = useState(initialState)

    const flipCard = () => {

        setState(state => !state);
    
    };

    return ([state, flipCard])

}

export default useFlipCard; 