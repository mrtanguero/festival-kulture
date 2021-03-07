import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  teamRoot: {
    margin: '20px 0',
    maxHeight: '30%',
  },

  teamIntro: {
    '& p': {
      textAlign: 'justify',
    },
  },
  teamImg: {
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
});

export default function TeamMember(props) {
  const { name, intro, image, memberN } = props;
  const classes = useStyles();

  return memberN % 2 === 0 ? (
    <Grid container spacing={3} className={classes.teamRoot}>
      <Grid item xs={12}>
        <Typography variant='h5' component='h1'>
          {name}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} className={classes.teamIntro}>
        <Typography component='p'>{intro}</Typography>
      </Grid>
      <Grid item xs={12} md={6} className={classes.teamImg}>
        <img src={image} alt='Ivan' />
      </Grid>
    </Grid>
  ) : (
    <Grid container spacing={3} className={classes.teamRoot}>
      <Grid item xs={12}>
        <Typography variant='h5' component='h1'>
          {name}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} className={classes.teamImg}>
        <img src={image} alt='Ivan' />
      </Grid>
      <Grid item xs={12} md={6} className={classes.teamIntro}>
        <Typography component='p'>{intro}</Typography>
      </Grid>
    </Grid>
  );
}
