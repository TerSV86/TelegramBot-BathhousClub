import { Test, TestingModule } from '@nestjs/testing';
import { BathhousService } from './bathhous.service';

describe('BathhousService', () => {
  let service: BathhousService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BathhousService],
    }).compile();

    service = module.get<BathhousService>(BathhousService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
