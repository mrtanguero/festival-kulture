import React, { useContext } from 'react';
import djangoAPI from '../api/djangoAPI';
import AuthContext from '../context/AuthContext';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },

  cardActions: {
    justifyContent: 'flex-end',
    paddingRight: 15,
  },
});

export default function UserCandidateCard({ user }) {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  const onApproveClick = async () => {
    await djangoAPI.get(`/switchModerator/${user.id}`, {
      headers: {
        Authorization: `Token ${auth.token}`,
      },
    });
  };

  const onDeleteClick = async () => {
    alert('Jeste li sigurni da želite da obrišete ovaj zahtjev?');
    await djangoAPI.get(`/deleteModerator/${user.id}`, {
      headers: {
        Authorization: `Token ${auth.token}`,
      },
    });
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {`${user.firstName} ${user.lastName}`}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {`${user.email}`}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="secondary" onClick={onDeleteClick}>
          Izbriši
        </Button>
        <Button size="small" onClick={onApproveClick}>
          Odobri
        </Button>
      </CardActions>
    </Card>
  );
}
