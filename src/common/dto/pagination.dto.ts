import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator'

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Min(1)
  @IsNumber()
  limit?: number // agrego ? para que typescript sepa que es opctional

  @IsOptional()
  @IsPositive()
  @IsNumber()
  offset?: number
}
