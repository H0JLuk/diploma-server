import { Resolver } from '@nestjs/graphql';
import { CurrentTestService } from '../services/current-test.service';

@Resolver()
export class CurrentTestResolver {
  constructor(private readonly currentTestService: CurrentTestService) {}
}
