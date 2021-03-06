import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  editRoot: {
    width: '400px',
    height: '100vh',
    margin: '20px auto 0',

    '& form': {
      width: '90%',
      margin: 'auto',
    },
  },

  eventImg: {
    '& img': {
      width: '100%',
    },
  },

  eventContainer: {
    position: 'relative',
  },

  editBtn: {
    position: 'absolute',
    top: '10px',
    right: '5px',
  },
});
