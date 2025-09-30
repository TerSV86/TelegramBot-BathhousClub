import { Test, TestingModule } from '@nestjs/testing';
import { BathhousController } from './bathhous.update';
import { BathhousService } from './bathhous.service';

describe('BathhousController', () => {
  let controller: BathhousController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BathhousController],
      providers: [BathhousService],
    }).compile();

    controller = module.get<BathhousController>(BathhousController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
