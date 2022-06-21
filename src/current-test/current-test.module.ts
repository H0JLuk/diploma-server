import { Module } from '@nestjs/common';
import { CurrentTestService } from './services/current-test.service';
import { CurrentTestResolver } from './resolvers/current-test.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentTestEntity } from './entities/current-test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CurrentTestEntity])],
  providers: [CurrentTestResolver, CurrentTestService],
})
export class CurrentTestModule {}
