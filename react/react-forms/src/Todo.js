import { useState } from 'react'
import "./App.css";

function Todo({ id="1", text="default todo",  handleRemove, update }) {

    const [editText, setEditText] = useState(text)
    const [isEditing, setIsEditing] = useState(false)

    
    const toggleEdit = () => {
        setIsEditing(edit => !edit)
    }

    const handleChange = evt => {
        setEditText(evt.target.value)
    }

    const remove = () => handleRemove(id)

    const handleUpdate = evt => {
        evt.preventDefault()
        update(id, editText)
        setIsEditing(false)
    }

    let standard = (
        <div>
            <li>
                <span>{text}</span>
                <button onClick={toggleEdit}>Edit</button>
                <button onClick={remove}>X</button>
            </li>
            
        </div>
    )

    if (isEditing){
        standard = (
            <div>
                <form onSubmit={handleUpdate}>
                    <input type="text" value={editText} onChange={handleChange} />
                    <button>Update</button>
                </form>
            </div>
        )
    }
    
    return standard
}

export default Todo;
