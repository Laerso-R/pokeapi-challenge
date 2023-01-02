import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap'
import { RiArrowGoBackFill } from "react-icons/ri";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

import './style.css'
import pokeApi from '../../services/api';

export default function DetailsScreen() {
    const navigate = useNavigate();

    const { state } = useLocation()
    const [species, setSpecies] = useState({})
    const [description, setDescription] = useState('')
    const [favorite, setFavorite] = useState(false)
    const type = state.types[0].type.name

    // get pokemon details
    const getDescriptions = () => {
        pokeApi.get('/pokemon-species/' + state.id)
            .then(response => {
                var desc = response.data.flavor_text_entries[1].flavor_text.replaceAll('\f', ' ')
                setSpecies(response.data)
                setDescription(desc)
                getFavorite()
            })
    }
    
    // checks if pokemon is one of the favorites
    const getFavorite = () => {
        let favorites = localStorage.getItem('favorites')
        favorites = favorites.split(',')

        for (var favorite of favorites) {
            if (favorite === state.name) {
                setFavorite(true)
            } else {
                setFavorite(false)
            }
        }
    }

    // add pokemon to favorites list
    const addFavorite = () => {
        let favorites = localStorage.getItem('favorites') ?? ''
        let newFavorite = favorites + ',' + state.name
        localStorage.setItem('favorites', newFavorite)
        getFavorite()
    }

    // remove pokemon to favorites list
    const removeFavorite = () => {
        var favorites = localStorage.getItem('favorites').replaceAll(',,', '').replaceAll('null,', '')
        favorites = favorites.split(',')
        console.log(favorites)
        let newFavorite = '';

        for (var favorite of favorites) {
            if (favorite !== state.name) {
                newFavorite = newFavorite + ',' + favorite
            }
        }
        localStorage.setItem('favorites', newFavorite)
        getFavorite()
    }

    useEffect(() => {
        getDescriptions()
    }, [])

    return (
        <div className={`screen ${type}`}>
            <Container onClick={() => navigate('/')} className='p-3 back'>
                <RiArrowGoBackFill size={30} />
            </Container>

            <Container className='h-75'>
                <Row className='h-100' >

                    {/* Pokemon Image */}
                    <Col className='pokemon d-flex align-items-center' >
                        <Container>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h1 className='m-5'>{'#' + state.id + ' - ' + state.name}</h1>
                                {favorite ? <MdFavorite onClick={removeFavorite} size={40} /> : <MdFavoriteBorder onClick={addFavorite} size={40} />}
                            </div>

                            <img
                                className='img align-middle'
                                src={state['sprites']['other']['official-artwork']['front_default']}
                                alt={state.name}
                            />
                        </Container>
                    </Col>

                    {/* Pokemon details */}
                    <Col className='m-3 d-flex align-items-center justify-content-center'>
                        <div className='descriptions'>
                            <div className="d-flex desc" ><h4>Type: </h4> <span>{type}</span></div>
                            <div className="d-flex desc" ><h4>Generation: </h4> <span>{species.id ? species.generation.name : ''}</span></div>
                            <div className="d-flex desc" ><h4>Weight: </h4> <span>{parseFloat(state.weight) / 10 + ' kg'}</span></div>
                            <div className="d-flex desc" ><h4>Height: </h4> <span>{parseFloat(state.height) / 10 + ' m'}</span></div>
                            <div className="d-flex desc" ><h4>Base happiness: </h4> <span>{species.id ? species.base_happiness : ''}</span></div>
                            <div className="d-flex desc" ><h4>Capture rate: </h4> <span>{species.id ? species.capture_rate : ''}</span></div>
                            <div className="d-flex desc" ><h4>Shape: </h4> <span>{species.id ? species.shape.name : ''}</span></div>
                            <div className="desc"> <h4>Description: </h4> <p>{description}</p></div>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}