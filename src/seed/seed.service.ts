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
    const { data } = await axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')

    const insertPromisesArray = []

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/')
      const num: number = +segments[segments.length - 2] // tomo el num que esta en la penult posi
      // await this.pokemonModel.create({ name, num })
      insertPromisesArray.push(this.pokemonModel.create({ name, num }))
    })

    await Promise.all(insertPromisesArray)

    return data.results
  }
}
