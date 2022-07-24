import React, { useState, useEffect } from 'react'
import AppNavbar from './components/navbar/Navbar';
import PokemonCard from './components/pokemonCard/PokemonCard';
import { Container, Row, Button, Pagination, Col } from 'react-bootstrap'
import pokeApi from './services/api';


function App() {
  const [list, setList] = useState([])

  const getList = async (query) => {
    pokeApi.get('/pokemon' + query)
      .then(response => {
        setList(response.data.results)
      })
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <div className='body'>
      {/* Navbar */}
      <AppNavbar />

      {/* Pagination and Search */}
      <Container className='p-3'>
        <Row className="justify-content-md-between" >
          <Col md='auto'>
            <input
              type='text'
              placeholder='Search by name or id'
            />
            <Button variant='warning' className='m-1'>Search</Button>
          </Col>
          <Col md='auto'>
            <Pagination variant='warning'>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </Col>
        </Row>
      </Container>

      {/* Pokemon List */}
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

export default App;
