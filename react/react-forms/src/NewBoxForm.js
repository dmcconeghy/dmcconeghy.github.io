import { useState } from 'react';
import "./App.css";
// import { CSS_COLOR_NAMES } from './Colors'

function NewBoxForm({ addBox }) {

    const emptyForm = {bgColor: "", width: 0, height: 0}
    const [formData, setFormData] = useState(emptyForm)
    

    const handleSubmit = evt => {
        evt.preventDefault();

        addBox(formData)
        
        // This empties the form fields  
        function handleReset() {
            Array.from(document.querySelectorAll('input')).forEach( input => { input.value = "" })
            
        }

        handleReset()
        // This clears the state.
        setFormData(emptyForm)       
    }

    const handleChange = evt => {
        const {name, value } = evt.target
        setFormData(fData => ({
            ...fData, [name]: value
        }))

    }

  return <div className="BoxForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="bgColor" >Background Color:</label>
        <input 
            type="textarea" 
            name="bgColor" 
            placeholder="background-color" 
            onChange={handleChange}
            id="bgColor"
            /><br/>
        <label htmlFor="width">Width:</label>
        <input 
            type="textarea" 
            name="width" 
            placeholder="width" 
            onChange={handleChange}
            id="width"
            /><br/>
        <label htmlFor="height">Height:</label>
        <input 
            type="textarea" 
            name="height" 
            placeholder="height" 
            onChange={handleChange}
            id="height"
            /><br/>
        <button name="submit">Submit!</button>
      </form>
    
  </div>;
}

export default NewBoxForm;
