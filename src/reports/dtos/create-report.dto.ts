import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateReportDto {
  make: string;

  model: string;

  year: number;

  mileage: number;

  lng: number;

  lat: number;

  price: number;
}
