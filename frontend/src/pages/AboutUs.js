import React from 'react';
import { team } from './helper_folder/team';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import TeamMember from './helper_folder/TeamMember';

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
});

export default function AboutUs() {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.aboutRoot}>
      <Grid item xs={12}>
        <div className={classes.logo}>
          <img src="/images/eiffel.png" alt="Logo" />
        </div>
        <Typography variant="h6" component="h2" className={classes.aboutUs}>
          Par dana u prošlost shvatili smo da je ljudima potreban pouzdan i
          iskusan tim stručnjaka koji će im pomoći da pronađu osobe sličnih
          interesa. Zato smo odlučili da svoje znaje psihologije,
          parapsihologije, hipnoze i bioenergije pretočimo u ovaj sajt koji će
          na nepogrešiv način spojiti ljude preko jedinstvenih kulturnih
          dešavanja.
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <Typography variant="h5" component="h1">
          Upoznajte naš tim
        </Typography>
      </Grid>

      {team.map((member, index) => {
        const crossMember = index + 1;
        return <TeamMember {...member} key={index} memberN={crossMember} />;
      })}
    </Grid>
  );
}
