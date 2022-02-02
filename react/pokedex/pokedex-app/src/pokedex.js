import Pokecard from "./pokecard"
import './style.css'


function Pokedex(props) {

// game logic

    return (
        <div className="Pokedex">
            <div className="Pokecards">
                {console.log(props)}
            <div className="Hud">
                    <h2>{props.name}</h2>
                    <p>Total Experience: {props.exp}</p>
                    <p>{(props.isWinner) ? (`${props.name} wins!`) : (`${props.name} loses.`)}</p>
            </div>
                {props.pokemon.map(p => (
                    <Pokecard
                        key={p.id} 
                        id={p.id}
                        name={p.name}
                        type={p.type}
                        exp={p.base_experience}
                        
                    />
                ))} 
            </div>
        </div>
    )
}

export default Pokedex