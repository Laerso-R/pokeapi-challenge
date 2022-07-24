import axios from 'axios';

// default Poke API call

const pokeApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
})

export default pokeApi