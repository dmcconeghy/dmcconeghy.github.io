import React from 'react';

function Box(props) {
    let {id, backgroundColor = "green", width = 10, height=10, handleRemove } = props

    if (width < 50) { width = 50}
    if (height < 25) {height = 25}

    const remove = () => handleRemove(id)
  return (
      <div>
        <div style={{
            backgroundColor,
            height: `${height}px`,
            width: `${width}px`
            }} />
            <button onClick={remove}>Remove me!</button>
            I'm {`${height}`} tall and {`${width}`} wide.
    </div>
  )
}

export default Box;




// Object.assign(
//     {backgroundColor: bgColor},
//     {width: `${width}px`},
//     {height: `${height}px`}
// )