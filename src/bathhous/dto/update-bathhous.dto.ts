import { PartialType } from '@nestjs/mapped-types';
import { CreateBathhousDto } from './create-bathhous.dto';

export class UpdateBathhousDto extends PartialType(CreateBathhousDto) {}
