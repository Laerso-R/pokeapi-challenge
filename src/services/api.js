import axios from 'axios';

// default PokeAPI calls

const pokeApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
})

export default pokeApi