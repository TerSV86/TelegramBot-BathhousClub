import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    bdId: number

    @PrimaryColumn({ type: 'bigint' })
    id: string

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    is_Active: boolean

    @CreateDateColumn()
    createdAt: Date

    @CreateDateColumn()
    updatedAt: Date
}
