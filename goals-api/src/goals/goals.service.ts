import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GoalsService {
  constructor(private prisma: PrismaService) {}

  create(createGoalDto: CreateGoalDto, userId: string) {
    return this.prisma.goal.create({
      data: {
        ...createGoalDto,
        userId,
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.goal.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: string, userId: string) {
    const goal = await this.prisma.goal.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!goal) {
      throw new NotFoundException(`Goal with ID ${id} not found`);
    }

    return goal;
  }

  async update(id: string, updateGoalDto: UpdateGoalDto, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.goal.update({
      where: {
        id,
      },
      data: updateGoalDto,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.goal.delete({
      where: {
        id,
      },
    });
  }
}
