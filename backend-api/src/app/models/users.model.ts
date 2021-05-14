import { IsOptional, IsString } from 'class-validator';

export class UsersDto {
  @IsOptional()
  @IsString()
  page: number;
  @IsOptional()
  @IsString()
  limit: string;
}
