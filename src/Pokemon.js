import { useEffect, useState } from "react"

const DEFAULT_POKEMON = {
    name: '',
    sprites: {front_default: null}
}

export default function Pokemon(props) {
    const [pokemon, setPokemon] = useState(DEFAULT_POKEMON)
    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/pokemon/${props.Pokemon}`
        fetch(url).then((res) => {
            if(res.ok) {
                return res.json()
            } else {
                return DEFAULT_POKEMON
            }
        }).then((data) => {
            setPokemon(data)
        }).catch((e) => {
            console.log(e)
        })
    }, [])

    return(
        <div>
            <h2 className="header">{pokemon.name}</h2>
            <image href={pokemon.sprites.front_default}></image>
        </div>
    )
}