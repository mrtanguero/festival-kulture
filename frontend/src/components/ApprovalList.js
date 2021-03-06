import React, { useState, useEffect, useContext } from 'react';
import djangoAPI from '../api/djangoAPI';
import AuthContext from '../context/AuthContext';
import UserCandidateCard from './UserCandidateCard';
import { adaptUser } from '../utils/helperFunctions';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    marginTop: 5,
    marginBottom: 20,
  },
  gridContainer: {
    margin: 0,
  },
}));

export default function ApprovalList() {
  const auth = useContext(AuthContext);
  const [userCandidates, setUserCandidates] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    let isMounted = true;
    const fetchUsers = async () => {
      const { data } = await djangoAPI.get('/showModerators/', {
        headers: {
          Authorization: `Token ${auth.token}`,
        },
      });
      if (isMounted) setUserCandidates(data.map(adaptUser));
    };
    fetchUsers();
    return () => {
      isMounted = false;
    };
  }, [auth.token, userCandidates]);

  const userCandidatesCards = userCandidates
    ? userCandidates.map((user) => {
        return (
          <Grid item key={user.id}>
            <UserCandidateCard user={user} />
          </Grid>
        );
      })
    : null;

  return userCandidates.length ? (
    <div className={classes.root}>
      <Typography variant="h6">Korisnici koji čekaju odobrenje:</Typography>
      <Grid className={classes.gridContainer} container spacing={2}>
        {userCandidatesCards}
      </Grid>
    </div>
  ) : null;
}
