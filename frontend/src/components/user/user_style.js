import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  userRoot: {
    maxWidth: '400px',
    minWidth: '40%',
    margin: '10% auto 0',
    padding: '2%',

    '& .MuiPaper-root': {
      width: '100%',
      margin: '5% 1%',
      padding: '20px 10px',

      '& .MuiFormControl-marginNormal': {
        marginBottom: 0,
      },
    },
  },

  paperRoot: {
    borderRadius: '10px',

    '& div': {
      padding: '10px',
    },
  },

  submitBtn: {
    marginTop: '10px',
  },

  fileBtnRoot: {
    display: 'flex',
    justifyContent: 'space-beetween',
    border: '1px solid #bdbdbd',
    borderRadius: '4px',
    height: '3.2em',

    '& input': {
      display: 'none',
    },

    '& span': {
      border: 'none',
      color: '#757575',
      '&:active': {
        border: 'none',
      },
    },
  },
}));
