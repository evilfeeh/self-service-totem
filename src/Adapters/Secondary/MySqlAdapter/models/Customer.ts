import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    length: 11,
  })
  cpf: string;
}