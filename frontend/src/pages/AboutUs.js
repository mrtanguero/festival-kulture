import React from 'react';
import { team } from './team';
import usersAPI from '../api/usersAPI';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  aboutRoot: {
    width: '80%',
    margin: '5% auto',
  },

  logo: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',

    '& img': {
      width: '20%',
      borderRadius: '50%',
    },
  },

  aboutUs: {
    textAlign: 'justify',
    textIndent: '5%',
    textAlignLast: 'center',
  },

  teamRoot: {
    margin: '10px 0',
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

export default function AboutUs() {
  const apiCall = async () => {
    const data = await usersAPI.get('/showUsers');
    console.log(data);
  };

  apiCall();

  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.aboutRoot}>
      <Grid item xs={12}>
        <div className={classes.logo}>
          <img src='/images/eiffel.png' alt='Logo' />
        </div>
        <Typography variant='h6' component='h2' className={classes.aboutUs}>
          Par dana u prošlost shvatili smo da je ljudima potreban pouzdan i
          iskusan tim stručnjaka koji će im pomoći da pronađu osobe sličnih
          interesa. Zato smo odlučili da svoje znaje psihologije,
          parapsihologije, hipnoze i bioenergije pretočimo u ovaj sajt koji će
          na nepogrešiv način spojiti ljude preko jedinstvenih kulturnih
          dešavanja.
        </Typography>
      </Grid>

      <Grid item xs={12} align='center'>
        <Typography variant='h5' component='h1'>
          Upoznajte naš tim
        </Typography>
      </Grid>

      {team.map((member) => {
        return (
          <Grid container spacing={2} className={classes.teamRoot}>
            <Grid item xs={12} md={6} className={classes.teamIntro}>
              <Typography variant='h5' component='h1'>
                {member.name}
              </Typography>
              <Typography component='p'>{member.intro}</Typography>
            </Grid>
            <Grid item xs={12} md={6} className={classes.teamImg}>
              <img src={member.image} alt='Ivan' />
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}
