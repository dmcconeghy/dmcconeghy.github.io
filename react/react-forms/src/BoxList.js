import { useState } from 'react'
import Box from './Box';
import NewBoxForm from './NewBoxForm'
import { v4 as uuid } from 'uuid';

function BoxList() {
    const [boxes, setBoxes] = useState([])

    const addBox = box => {
        let newBox = {...box, id: uuid()}
        setBoxes(boxes => [...boxes, newBox])

    }

    const remove = id => {
        setBoxes(boxes => boxes.filter(box => box.id !== id))
    }

    const renderBoxes = () => {
        return (
            <div className="Boxes">
                {boxes.map(box => (
                    <Box 
                        key={box.id}
                        id={box.id}
                        backgroundColor = {box.bgColor} 
                        width = {box.width} 
                        height = {box.height}
                        handleRemove={remove}
                    />
                ))}
            </div>
        )
    }

    

  return (
    <div>
        <NewBoxForm addBox = { addBox }/>
        {renderBoxes()}
    </div>
  )
}

export default BoxList;
