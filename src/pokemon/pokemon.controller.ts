import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { PokemonService } from './pokemon.service'
import { CreatePokemonDto } from './dto/create-pokemon.dto'
import { UpdatePokemonDto } from './dto/update-pokemon.dto'

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  //@HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto)
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll()
  }

  @Get(':value')
  findOne(@Param('value') value: string) {
    return this.pokemonService.findOne(value)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(+id, updatePokemonDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(+id)
  }
}
