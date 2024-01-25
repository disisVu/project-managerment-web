import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { StatusProject } from 'src/common/enum';

export class UpdateProject {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ example: 'My project' })
  name: string;

  @IsOptional()
  @IsEnum(StatusProject)
  @ApiProperty({ enum: StatusProject, required: false })
  status?: StatusProject;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({ format: 'date', required: false })
  timeStart?: Date;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({ format: 'date', required: false })
  timeEnd?: Date;
}
