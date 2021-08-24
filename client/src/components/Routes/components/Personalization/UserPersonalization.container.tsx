import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from 'src/components/Auth';
import { PersonalizationTypes } from 'src/core/types/PersonalizationTypes';
import { useUserPersonalizationsQuery } from 'src/graphql';

import UserPersonalization from './UserPersonalization';

const UserPersonalizationContainer: React.FC = () => {
  const { user } = useContext(AuthContext);
  // TODO::get userPersonalization by type set to time zone
  // TODO::get userPersonalization by type set to time to send email
  const { data } = useUserPersonalizationsQuery({
    variables: {
      user_ids: user!.uid,
      types: PersonalizationTypes.EmailFrequency,
    },
    fetchPolicy: 'no-cache',
  });

  return (
    <>
      <Helmet title="My Preferences">
        <meta name="description" content="User personalization settings." />
      </Helmet>
      <UserPersonalization
        userPersonalization={data?.userPersonalizations[0]}
      />
    </>
  );
};

export default UserPersonalizationContainer;
