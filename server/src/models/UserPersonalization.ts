import { QueryBuilder } from 'objection';

import { Domain } from './Domain';
import { User } from './User';

export class UserPersonalization extends Domain {
  id!: string;
  user_id!: string;

  type!: string | null;
  value!: string | null;

  user!: User;

  static tableName = 'omscentral_user_personalization';

  static relationMappings = {
    userPersonalization: {
      relation: Domain.BelongsToOneRelation,
      modelClass: UserPersonalization,
      join: {
        from: `${UserPersonalization.tableName}.user_id`,
        to: `${User.tableName}.id`,
      },
    },
  };

  static jsonSchema = {
    type: 'object',
    required: ['id', 'user_id', 'type', 'value'],
    properties: {
      id: { type: 'string' },
      user_id: { type: 'string' },
      type: { type: ['string'] },
      value: { type: ['string'] },
      user: User.jsonSchema,
    },
  };

  static eagerQuery = (): QueryBuilder<UserPersonalization> =>
    UserPersonalization.query().withGraphFetched(`[user]`);
}
