import React, { useContext } from 'react';
import assignDefined from 'src/core/utils/assignDefined';
import {
  UserPersonalizationInputType,
  UserPersonalizationQuery,
  useUpdateUserPersonalizationMutation,
} from 'src/graphql';

import { AuthContext } from '../Auth/Auth';
import { NotificationContext } from '../Notification/Notification';
import UserPersonalizationForm from './UserPersonalizationForm';

interface Props {
  userPersonalization: UserPersonalizationQuery['userPersonalization'];
}

const UserPersonalizationFormContainer: React.FC<Props> = ({
  userPersonalization,
}) => {
  const notification = useContext(NotificationContext)!;
  const auth = useContext(AuthContext);
  const mode = auth.user?.uid === userPersonalization.user_id ? 'edit' : 'view';

  const [update, { loading }] = useUpdateUserPersonalizationMutation();

  const handleSubmit = async (data: UserPersonalizationInputType) => {
    try {
      const { __typename, ...rest } = userPersonalization;
      await update({
        variables: { userPersonalization: assignDefined(rest, data) },
      });
      notification.success('User Personalization updated.');
    } catch {
      notification.error('Something went wrong.');
    }
  };

  return (
    <UserPersonalizationForm
      userPersonalization={userPersonalization}
      mode={mode}
      disabled={loading}
      onSubmit={handleSubmit}
    />
  );
};

export default UserPersonalizationFormContainer;
