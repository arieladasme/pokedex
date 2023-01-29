import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { isValidObjectId, Model } from 'mongoose'
import { CreatePokemonDto } from './dto/create-pokemon.dto'
import { UpdatePokemonDto } from './dto/update-pokemon.dto'
import { Pokemon } from './entities/pokemon.entity'

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase()

    try {
      return await this.pokemonModel.create(createPokemonDto)
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`)
      }
      console.log(error)
      throw new InternalServerErrorException(`Can't create pokemon, check server logs`)
    }
  }

  findAll() {
    return `This action returns all pokemon`
  }

  async findOne(value: string) {
    let pokemon: Pokemon

    if (!isNaN(+value)) pokemon = await this.pokemonModel.findOne({ num: value })

    // find by mongo id
    if (!pokemon && isValidObjectId(value)) pokemon = await this.pokemonModel.findById(value)

    // find by name
    if (!pokemon) pokemon = await this.pokemonModel.findOne({ name: value.toLowerCase().trim() })

    if (!pokemon) throw new NotFoundException(`Pokemon ${value} not found`)

    return pokemon
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`
  }
}
