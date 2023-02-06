import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateReportDto } from './dtos/create-report.dto';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  @Post()
  createReport(@Body() body: CreateReportDto) {}
}
