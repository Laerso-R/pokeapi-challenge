import React, { useState, useEffect } from 'react'
import AppNavbar from './components/navbar/Navbar';
import PokemonCard from './components/pokemonCard/PokemonCard';
import { Container, Row, Pagination, Col } from 'react-bootstrap'
import pokeApi from './services/api';


function App() {
  const off = parseInt(localStorage.getItem('offset')) ?? 0

  const [list, setList] = useState([])
  const [count, setCount] = useState()
  const [offset, setOffset] = useState(off)



  const getList = async () => {

    pokeApi.get('/pokemon?limit=20&offset=' + offset)
      .then(response => {
        setList(response.data.results)
        setCount(response.data.count)        
      })

      localStorage.setItem('offset', offset)
  }

  useEffect(() => {
    getList()
  }, [offset])

  return (
    <div className='body'>
      {/* Navbar */}
      <AppNavbar />

      {/* Pagination and Search */}
      <Container className='p-3'>
        <Row className="justify-content-md-between" >
          <Col md='auto'>
          </Col>
          <Col md='auto'>
            <Pagination variant='warning'>
              <Pagination.First onClick={() => setOffset(0)} />
              <Pagination.Prev onClick={() => { if (offset >= 20) { setOffset(offset - 20) } }} />
              <Pagination.Next onClick={() => { if (offset < count - 20) setOffset(offset + 20) }} />
              <Pagination.Last onClick={() => setOffset(count - 20)} />
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
