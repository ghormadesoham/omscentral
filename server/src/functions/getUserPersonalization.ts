import { QueryBuilder, SingleQueryBuilder } from 'objection';

import { UserPersonalization } from '../models';

export const getUserPersonalization = (
  id: string,
): SingleQueryBuilder<QueryBuilder<UserPersonalization>> =>
  UserPersonalization.eagerQuery().findById(id);
