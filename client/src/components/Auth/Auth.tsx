import firebase from 'firebase/app';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Nullable } from 'src/core';
import { EmailFrequency } from 'src/core/types/EmailFrequency';
import { PersonalizationTypes } from 'src/core/types/PersonalizationTypes';
import { TimeZones } from 'src/core/types/TimeZones';
import storage from 'src/core/utils/storage';
import apollo from 'src/data/apollo';
import {
  useUpsertUserMutation,
  useUpsertUserPersonalizationMutation,
} from 'src/graphql';

import { FirebaseContext } from '../Firebase';
import { toInput, toUserPersonalizationInput } from './Auth.utils';

interface State {
  initializing: boolean;
  authenticated: boolean;
  user: Nullable<firebase.User>;
}

const initialState: State = {
  initializing: true,
  authenticated: false,
  user: null,
};

export const AuthContext = createContext<State>(initialState);

const Auth: React.FC = ({ children }) => {
  const firebase = useContext(FirebaseContext);
  const [state, setState] = useState<State>(initialState);
  const [upsertUser] = useUpsertUserMutation();
  const [upsertUserPersonalization] = useUpsertUserPersonalizationMutation();

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(async (authUser) => {
      apollo.resetStore();

      setState({
        initializing: false,
        authenticated: Boolean(authUser),
        user: authUser,
      });

      if (!authUser) {
        storage('session').removeItem('token');
        return;
      }

      storage('session').setItem('token', await authUser.getIdToken());

      const result = await upsertUser({
        variables: {
          user: toInput(authUser),
        },
      });

      await upsertUserPersonalization({
        variables: {
          userPersonalization: toUserPersonalizationInput(
            authUser,
            PersonalizationTypes.EmailFrequency,
            EmailFrequency.Daily,
          ),
        },
      });
      await upsertUserPersonalization({
        variables: {
          userPersonalization: toUserPersonalizationInput(
            authUser,
            PersonalizationTypes.TimeZone,
            TimeZones.EST,
          ),
        },
      });

      if (result.errors && result.errors.length) {
        await firebase.auth.signOut();
        return;
      }

      const user = result.data!.upsertUser;
      firebase.analytics.setUserId(user.id, { global: true });
      firebase.analytics.setUserProperties({ email: user.email });
      firebase.analytics.logEvent('login', { method: user.auth_provider });
      if (!user.updated) {
        firebase.analytics.logEvent('sign_up', { method: user.auth_provider });
      }
    });

    return () => unsubscribe();
  }, [firebase, upsertUser, upsertUserPersonalization]);

  return (
    <AuthContext.Provider value={{ ...state }}>{children}</AuthContext.Provider>
  );
};

export default Auth;
