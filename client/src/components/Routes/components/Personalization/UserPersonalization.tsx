import React from 'react';
import UserPersonalizationForm from 'src/components/UserPersonalizationForm';
import { UserPersonalizationQuery } from 'src/graphql';

interface Props {
  userPersonalization?: UserPersonalizationQuery['userPersonalization'];
}
const UserPersonalization: React.FC<Props> = ({ userPersonalization }) =>
  userPersonalization ? (
    <UserPersonalizationForm userPersonalization={userPersonalization} />
  ) : null;

export default UserPersonalization;
