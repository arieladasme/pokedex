import { Injectable } from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'
import { PokeResponse } from './interfaces/poke-response.interface'

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios

  async executeSeed() {
    const { data } = await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=1')

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/')
      const num: number = +segments[segments.length - 2] // tomo el num que esta en la penult posi
      console.log({ name, num })
    })

    return data.results
  }
}
