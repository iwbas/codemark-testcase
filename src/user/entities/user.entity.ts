import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany } from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity()
export class User {
  @PrimaryColumn()
  login: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @ManyToMany(type => Role, role => role.users, {cascade: true})
  @JoinTable()
  roles: Role[];
}
