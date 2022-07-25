import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap'

import pokeApi from '../../services/api'
import imageUrl from '../../services/imageUrl'

export default function PokemonCard({ pokemonData }) {
    const navigate = useNavigate();

    const [pokemon, setPokemon] = useState({})
    const [type, setType] = useState('')

    // gets pokemon details
    useEffect(() => {
        pokeApi.get(`/pokemon/${pokemonData.name}`)
            .then(response => {
                let data = response.data
                setPokemon(data)
                setType(data.types[0].type.name)
            })
    }, [type, pokemonData.name])

    return (
        // send details through route to avoid unecessary api calls
        <li onClick={() => { navigate('/details', { state: pokemon }) }}>
            <Card className={`m-2 card ${type}`} style={{ width: 230 }} >
                <Card.Img className='img' variant='top' src={pokemon.id ? imageUrl(pokemon.id) : ''} />
                <Card.Body>
                    <Card.Title className='title'>
                        #{pokemon.id} - {pokemon.name}
                    </Card.Title>
                </Card.Body>
            </Card>
        </li>
    )
}