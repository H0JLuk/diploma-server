import { Resolver } from '@nestjs/graphql';
import { TestHistoryService } from './test-history.service';

@Resolver()
export class TestHistoryResolver {
  constructor(private readonly testHistoryService: TestHistoryService) {}
}
