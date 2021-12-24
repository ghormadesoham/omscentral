import { PartialModelObject as PMO } from 'objection';

import { UserPersonalization } from '../models';

export const updateUserPersonalization = (
  id: string,
  userPersonalization: PMO<UserPersonalization>,
): Promise<UserPersonalization> =>
  UserPersonalization.eagerQuery().updateAndFetchById(id, userPersonalization);
