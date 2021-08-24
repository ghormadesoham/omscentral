import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  UserPersonalizationInputType,
  UserPersonalizationQuery,
} from 'src/graphql';

import Button from '../Button/Button';
import Paper from '../Paper/Paper';
import White from '../White/White';
import { useStyles } from './UserPersonalizationForm.styles';

interface Props {
  mode: 'edit' | 'view';
  userPersonalization: UserPersonalizationQuery['userPersonalization'];
  disabled?: boolean;
  onSubmit: (userPersonalization: UserPersonalizationInputType) => void;
}

const UserPersonalizationForm: React.FC<Props> = ({
  mode,
  userPersonalization,
  disabled,
  onSubmit,
}) => {
  const classes = useStyles();
  const form = useForm<UserPersonalizationInputType>({
    defaultValues: userPersonalization,
  });
  const { handleSubmit, register, errors } = form;
  // TODO: 3:show options in drop down
  // TODO: see UserForm program_id
  const [title, action] =
    mode === 'edit'
      ? ['Update User Personalization', 'Update']
      : ['User Personalization', null];

  return (
    <Container component="main" maxWidth="sm">
      <White />
      <Paper>
        <Avatar className={classes.avatar}>
          <AccountIcon />
        </Avatar>
        <Typography component="h1" variant="h5" data-cy="title">
          {title}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                data-cy="userPersonalization:id"
                id="id"
                name="id"
                label="ID"
                autoComplete="id"
                variant="outlined"
                fullWidth
                disabled
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                data-cy="userPersonalization:type"
                id="name"
                name="type"
                label="Type"
                autoComplete="frequency"
                variant="outlined"
                autoFocus
                fullWidth
                required
                disabled={disabled || mode === 'view'}
                inputRef={register({ required: true })}
                error={Boolean(errors.type)}
                helperText={errors.type?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                data-cy="userPersonalization:value"
                id="value"
                name="value"
                label="Value"
                autoComplete="daily"
                variant="outlined"
                autoFocus
                fullWidth
                required
                disabled={disabled || mode === 'view'}
                inputRef={register({ required: true })}
                error={Boolean(errors.value)}
                helperText={errors.value?.message}
              />
            </Grid>
          </Grid>
          <Button
            data-cy="userPersonalization:submit"
            type="submit"
            size="large"
            fullWidth
            disabled={disabled}
          >
            {action}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default UserPersonalizationForm;
