import { makeStyles } from '@material-ui/core/styles';

const colors = {
  formTitleBg: '#3f51b5',
  formTitleTxt: 'whitesmoke',
  formAvatarBg: '#3f51b5',
  formAvatarTxt: 'whitesmoke',
  submitLink: 'green',
};

export const useStyles = makeStyles((theme) => ({
  paperRoot: {
    padding: '20px',
    width: '380px',
    margin: '3% auto',
  },

  formTitle: {
    backgroundColor: colors.formTitleBg,
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    padding: '15px',
    margin: '10px auto',
    color: colors.formTitleTxt,
  },

  formAvatar: {
    backgroundColor: colors.formAvatarBg,
    color: colors.formAvatarTxt,
  },

  submitBtn: {
    marginTop: '10px',
  },

  formRedirect: {
    marginTop: '3%',
    '& a': {
      color: colors.submitLink,
    },
  },
}));
