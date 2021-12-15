import { PartialModelObject as PMO } from 'objection';

import { UserPersonalization } from '../models';
import { updateUserPersonalization } from './updateUserPersonalization';

export const upsertUserPersonalization = async (
  id: string,
  userPersonalization: PMO<UserPersonalization>,
): Promise<UserPersonalization> => {
  const existing = await UserPersonalization.query().findById(id);

  if (existing) {
    return updateUserPersonalization(id, userPersonalization);
  }

  return UserPersonalization.eagerQuery().insertAndFetch({
    ...userPersonalization,
    id,
  });
};
