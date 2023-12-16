import axios from "axios"


export const buscarVarios = async (offset:number) => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset='+offset+'&limit=10')
    return response.data
}

export const buscarNome = async (name: string) => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + name)
    return response.data
}