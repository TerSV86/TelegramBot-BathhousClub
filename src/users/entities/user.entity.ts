import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  bdId: number;

  @Column()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  is_Active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
