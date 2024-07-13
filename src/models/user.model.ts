import {Entity, hasMany, model, property} from '@loopback/repository';
import {Orders} from './orders.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @hasMany(() => Orders)
  orders?: Orders[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  orders: Orders[];
}

export type UserWithRelations = User & UserRelations;
