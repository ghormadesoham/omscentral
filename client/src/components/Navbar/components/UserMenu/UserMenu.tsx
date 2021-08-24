import AccountCircle from '@material-ui/icons/AccountCircle';
import React from 'react';
import Menu from 'src/components/Menu';
import { paths } from 'src/constants';

const UserMenu: React.FC = () => (
  <Menu
    data-cy="user_menu"
    id="user_menu"
    icon={<AccountCircle data-cy="user_menu_icon" />}
    items={[
      { key: 'profile', path: paths.userProfile, caption: 'My Profile' },
      { key: 'reviews', path: paths.userReviews, caption: 'My Reviews' },
      {
        key: 'personalization',
        path: paths.userPersonalization,
        caption: 'My Personalization',
      },
    ]}
  />
);
// TODO: 4:rename personalization to preferences

export default UserMenu;
