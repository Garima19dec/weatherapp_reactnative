import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const fetchCountryDetails = async (name:any) => {
    const data = await axios.get<any>(`https://restcountries.com/v3.1/name/${name}`)
    return data
}


export const fetchCapitalDetails = async (capital:any) => {
    const data = await axios.get<any>(`http://api.weatherstack.com/current?access_key=1da8222ef5d403f3bb9e9851614b3cde&query=${capital}`)
    return data
}
