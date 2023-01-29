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
      this.handleExeptions(error)
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

  async update(value: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(value)

    if (updatePokemonDto.name) updatePokemonDto.name = updatePokemonDto.name.toLowerCase()

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true })

      return { ...pokemon.toJSON(), ...updatePokemonDto }
    } catch (error) {
      this.handleExeptions(error)
    }
  }

  async remove(id: string) {
    const pokemon = await this.findOne(id)
    await pokemon.deleteOne({ id })
  }

  private handleExeptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error)
    throw new InternalServerErrorException(`Can't update pokemon, check server logs`)
  }
}
