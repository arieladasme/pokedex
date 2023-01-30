import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import axios, { AxiosInstance } from 'axios'
import { Model } from 'mongoose'
import { Pokemon } from 'src/pokemon/entities/pokemon.entity'
import { PokeResponse } from './interfaces/poke-response.interface'

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>, // tambien se puede con pokemonService
  ) {}

  private readonly axios: AxiosInstance = axios

  async executeSeed() {
    await this.pokemonModel.deleteMany({}) // delete * from pokemon
    const { data } = await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    const pokemonToInsert: { name: string; num: number }[] = []

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/')
      const num: number = +segments[segments.length - 2] // tomo el num que esta en la penult posi
      pokemonToInsert.push({ name, num })
    })

    await this.pokemonModel.insertMany(pokemonToInsert)

    return data.results
  }
}
