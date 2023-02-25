import { Test, TestingModule } from '@nestjs/testing';
import { RafflesGateway } from './raffles.gateway';

describe('RafflesGateway', () => {
  let gateway: RafflesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RafflesGateway],
    }).compile();

    gateway = module.get<RafflesGateway>(RafflesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
