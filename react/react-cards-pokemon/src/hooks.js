import axios from "axios";
import { useState } from "react";
import uuid from "uuid";


const useFlipCard = (initialState = true) => {

    const [state, setState] = useState(initialState)

    const flipCard = () => {

        setState(state => !state);
    
    };

    return ([state, flipCard]);

}


const useAxios = (URL) => {

    const [data, setData] = useState([])

    const getData = async () => {
        const response = await axios.get(URL);

        setData(cards => [...cards, {...response.data, id: uuid() }])
    }



    return ([data, getData]);
}

export {useFlipCard, useAxios}; 