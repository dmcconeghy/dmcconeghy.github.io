import './style.css'

function Pokecard(props) {

    const BASE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
    let imgSrc = `${BASE_URL}${props.id}.png`;
      
        return (
            <div className="Pokecard">
              <div className="Pokecard-title">{ props.name }</div>
              <img className="Pokecard-image" src={imgSrc} alt="pokemon"/>
              <div className="Pokecard-data">Type: {props.type}</div>
              <div className="Pokecard-data">EXP: {props.exp}</div>
            </div>
        )
      }

export default Pokecard