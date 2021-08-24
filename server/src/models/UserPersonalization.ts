import { QueryBuilder } from 'objection';

import { Domain } from './Domain';
import { User } from './User';

export class UserPersonalization extends Domain {
  id!: string;
  type!: string | null;
  value!: string | null;
  user_id!: string;

  static tableName = 'omscentral_user_personalization';
  static relationMappings = {
    user: {
      relation: Domain.HasManyRelation,
      modelClass: User,
      join: {
        from: `${User.tableName}.id`,
        to: `${UserPersonalization.tableName}.user_id`,
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
