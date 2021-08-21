import { QueryBuilder } from 'objection';

import { Domain } from './Domain';
import { User } from './User';

export class UserPersonalization extends Domain {
  id!: string;
  type!: string | null;
  value!: string | null;
  user_id!: string;

  static tableName = 'omscentral_user_personalization';
  // TODO: 1: one to many relationship between user and user_personalization
  // TODO: 2: what to use as the id for user_personalization? generate id?
  // TODO: currently using user id but user id will not work once (1) above is addressed.
  static relationMappings = {
    user: {
      relation: Domain.HasOneRelation,
      modelClass: User,
      join: {
        from: `${UserPersonalization.tableName}.user_id`,
        to: `${User.tableName}.id`,
      },
    },
  };

  static jsonSchema = {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
      type: { type: ['string', 'null'] },
      value: { type: ['string', 'null'] },
      user_id: { type: ['string'] },
    },
  };

  static eagerQuery = (): QueryBuilder<UserPersonalization> =>
    UserPersonalization.query().withGraphFetched(`
        [user]`);
}
