import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryService } from './services';
import { CategoryResolver } from './resolvers';
import { CategoryEntity } from './entities';
import { QuestionsModule } from 'src/question/question.module';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity]), QuestionsModule],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
