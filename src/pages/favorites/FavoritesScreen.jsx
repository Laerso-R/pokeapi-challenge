import React, { useState, useEffect } from 'react'
import AppNavbar from '../../components/navbar/Navbar';
import PokemonCard from '../../components/pokemonCard/PokemonCard';
import { Container } from 'react-bootstrap'

function FavoritesScreen() {
    const [list, setList] = useState([])

    // get the favorites list and prepare them to render avoiding empty cards in the list
    const getList = async () => {
        setList([])

        let pokemons = localStorage.getItem('favorites')
        if (!pokemons) return;
        pokemons = pokemons.replaceAll(',,', '')
        pokemons = pokemons.split(',')

        var newList = [];
        for (var pokemon of pokemons) {
            if (pokemon !== '' || pokemon != null || pokemon !== undefined) {
                newList.push({ 'name': pokemon })
            }
        }
        setList(newList)
    }

    useEffect(() => {
        getList()
    }, [])

    return (
        <div className='body'>
            {/* Navbar */}
            <AppNavbar />

            {/* Favorites List */}
            <Container>
                <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', padding: 0 }}>
                    {
                        list.map((pokemon) => {
                            return <PokemonCard key={pokemon.name} pokemonData={pokemon} />
                        })
                    }
                </ul>
            </Container>
        </div>
    )
}

export default FavoritesScreen;
