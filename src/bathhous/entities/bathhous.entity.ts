import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Bathhous {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: string

    @Column()
    date: string

    @Column()
    is_Active: boolean
}
