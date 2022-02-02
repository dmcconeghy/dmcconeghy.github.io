import {useState} from 'react';

import './App.css';


function MagicWindow(props) {

    function randomMessage(array){

        const select = Math.floor(Math.random() * array.length)
    
        return array[select]
        
    }

    const [msg, setMsg] = useState("What's your question?")

    const [color, setColor] = useState()

    function handleClick() {
        if (msg === "What's your question?"){
            const { msg, color } = randomMessage(props.answers)
            setMsg(msg)
            setColor(color)
        } else {
           setMsg("What's your question?")
           setColor()
        }
    }

  return (
  
    <div className="MagicWindow">
        <div className="AnswerBox" onClick={handleClick} >
            <div className="Answer" style={{ backgroundColor: color}}>
               {msg} 
            </div>   
        </div>
    </div>
  )

}
    MagicWindow.defaultProps = {
        answers: [
        { msg: "It is certain.", color: "green" },
        { msg: "It is decidedly so.", color: "green" },
        { msg: "Without a doubt.", color: "green" },
        { msg: "Yes - definitely.", color: "green" },
        { msg: "You may rely on it.", color: "green" },
        { msg: "As I see it, yes.", color: "green" },
        { msg: "Most likely.", color: "green" },
        { msg: "Outlook good.", color: "green" },
        { msg: "Yes.", color: "green" },
        { msg: "Signs point to yes.", color: "goldenrod" },
        { msg: "Reply hazy, try again.", color: "goldenrod" },
        { msg: "Ask again later.", color: "goldenrod" },
        { msg: "Better not tell you now.", color: "goldenrod" },
        { msg: "Cannot predict now.", color: "goldenrod" },
        { msg: "Concentrate and ask again.", color: "goldenrod" },
        { msg: "Don't count on it.", color: "red" },
        { msg: "My reply is no.", color: "red" },
        { msg: "My sources say no.", color: "red" },
        { msg: "Outlook not so good.", color: "red" },
        { msg: "Very doubtful.", color: "red" },
    ]
}

export default MagicWindow;


