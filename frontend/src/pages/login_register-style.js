import { makeStyles } from '@material-ui/core/styles';

const colors = {
  formTitleBg: '#f50057',
  formTitleTxt: 'whitesmoke',
  formAvatarBg: '#f50057',
  formAvatarTxt: 'whitesmoke',
  submitBtn: '#f50057',
};

export const useStyles = makeStyles((theme) => ({
  paperRoot: {
    padding: '20px',
    width: '380px',
    margin: '5% auto 5%',
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
    backgroundColor: colors.submitBtn,
    color: 'whitesmoke',
    fontWeight: 600,
  },

  formRedirect: {
    marginTop: '3%',
    '& a': {
      color: colors.submitBtn,
      fontWeight: 600,
    },
  },
}));
