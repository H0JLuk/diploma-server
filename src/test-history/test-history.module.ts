import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestHistoryService } from './test-history.service';
import { TestHistoryResolver } from './test-history.resolver';
import { TestHistoryEntity } from './entities/test-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestHistoryEntity])],
  providers: [TestHistoryResolver, TestHistoryService],
})
export class TestHistoryModule {}
