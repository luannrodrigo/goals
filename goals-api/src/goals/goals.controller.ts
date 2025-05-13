import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('goals')
@UseGuards(JwtAuthGuard)
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  create(@Body() createGoalDto: CreateGoalDto, @CurrentUser() user: User) {
    return this.goalsService.create(createGoalDto, user.id);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.goalsService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.goalsService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGoalDto: UpdateGoalDto,
    @CurrentUser() user: User,
  ) {
    return this.goalsService.update(id, updateGoalDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.goalsService.remove(id, user.id);
  }

  @Post(':id/thermal-sensations')
  addThermalSensation(
    @Param('id') id: string,
    @Body() record: { thermalSensation: number; date: string },
    @CurrentUser() user: User,
  ) {
    return this.goalsService.addThermalSensation(id, record, user.id);
  }
}
