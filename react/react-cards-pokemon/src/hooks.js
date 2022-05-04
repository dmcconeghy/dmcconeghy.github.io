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


const useAxios = BASEURL => {

    const [ data, setData ] = useState([])

    const addData = async name => {
        let endpoint = name ? `${BASEURL}${name}/` : BASEURL;
        console.log(name)


        const response = await axios.get(endpoint)

        setData(data => [...data,{ ...response.data, id: uuid() } ])
    }

    const deleteData = () => setData([])

    return ([data, addData, deleteData]);
}

export {useFlipCard, useAxios}; 