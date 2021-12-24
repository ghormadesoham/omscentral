import { PartialModelObject as PMO } from 'objection';

import { UserPersonalization } from '../models';
import { updateUserPersonalization } from './updateUserPersonalization';

export const upsertUserPersonalization = async (
  id: string,
  userPersonalization: PMO<UserPersonalization>,
): Promise<UserPersonalization> => {
  const existing = await UserPersonalization.query().findById(id);
  // TODO: check if user.name is needed. Compare with user.ts in parent folder
  if (existing) {
    return updateUserPersonalization(id, {
      ...userPersonalization,
      id,
    });
  }

  return UserPersonalization.eagerQuery().insertAndFetch({
    ...userPersonalization,
    id,
  });
};
