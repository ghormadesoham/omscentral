import { QueryBuilder } from 'objection';

import { Domain } from './Domain';
import { User } from './User';
import { withDates } from './utils';

export class UserPersonalization extends withDates(Domain) {
  id!: string;
  user_id!: string;

  type!: string | null;
  value!: string | null;

  user!: User;

  static tableName = 'omscentral_user_personalization';

  static relationMappings = {
    user: {
      relation: Domain.HasOneRelation,
      modelClass: UserPersonalization,
      join: {
        from: `${UserPersonalization.tableName}.user_id`,
        to: `${User.tableName}.id`,
      },
    },
  };

  static jsonSchema = {
    type: 'object',
    required: ['id', 'user_id'],
    properties: {
      id: { type: 'string' },
      user_id: { type: 'string' },
      type: { type: ['string', 'null'] },
      value: { type: ['string', 'null'] },
      user: User.jsonSchema,
    },
  };

  static eagerQuery = (): QueryBuilder<UserPersonalization> =>
    UserPersonalization.query().withGraphFetched(`[user]`);
}
