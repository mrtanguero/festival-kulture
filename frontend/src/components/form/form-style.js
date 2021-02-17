import { makeStyles } from '@material-ui/core/styles';

const colors = {
  formRoot: '#fff',
  formRootBefore: 'linear-gradient(-45deg, #4481eb 0%, #04befe 100%)',
  formTitleFont: '#444',
};

export const useStyles = makeStyles((theme) => ({
  formRoot: {
    position: 'relative',
    width: '100%',
    backgroundColor: colors.formRoot,
    minHeight: '100vh',
    overflow: 'hidden',

    '&:before': {
      content: '""',
      position: 'absolute',
      height: '2000px',
      width: '2000px',
      top: '-10%',
      right: '48%',
      transform: 'translateY(-50%)',
      backgroundImage: colors.formRootBefore,
      transition: '1.8s ease-in-out',
      borderRadius: '50%',
      zIndex: 6,
    },
  },

  formsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },

  loginRegister: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    left: '75%',
    width: '50%',
    transition: '1s 0.7s ease-in-out',
    display: 'grid',
    zIndex: 5,
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0rem 5rem',
    transition: 'all 0.2s 0.7s',
    overflow: 'hidden',
    gridColumn: '1/2',
    gridRow: '1/2',

    '& $inputRoot': {
      marginBottom: '20px',
    },
  },

  login: { zIndex: 2 },

  register: { opacity: 0, zIndex: 1 },

  formTitle: {
    color: colors.formTitleFont,
    marginBottom: '30px',
    padding: '5px',
    textAlign: 'center',
  },

  inputRoot: {
    maxWidth: '380px',
    width: '100%',
  },

  googleIcon: {
    '& img': {
      width: '10%',
      marginTop: '5%',
    },
  },

  sliderContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  slider: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    textAlign: 'center',
    zIndex: '6',

    '& $sliderContent': {
      color: '#fff',
      transition: 'transform 0.9s ease-in-out',
      transitionDelay: '0.6s',
    },
  },

  slideLeft: {
    pointerEvents: 'all',
    padding: '3rem 17% 2rem 12%',
  },

  slideRight: {
    pointerEvents: 'none',
    padding: '3rem 12% 2rem 17%',

    '& $sliderImg, & $sliderContent': {
      transform: 'translate(800px)',
    },
  },

  sliderContent: {},

  sliderImg: {
    width: '100%',
    transition: 'transform 1.1s ease-in-out',
    transitionDelay: '0.4s',
  },

  // Animation

  formMode: {
    '&:before': {
      transform: 'translate(100%, -50%)',
      right: '52%',
    },

    '& $slideLeft $sliderImg, & $slideLeft $sliderContent': {
      transform: 'translateX(-800px)',
    },

    '& $loginRegister': {
      left: '25%',
    },

    '& $register': {
      opacity: 1,
      zIndex: 2,
    },

    '& $login': {
      opacity: 0,
      zIndex: 1,
    },

    '& $slideRight $sliderImg, & $slideRight $sliderContent': {
      transform: 'translate(0%)',
    },

    '& $slideLeft': {
      pointerEvents: 'none',
    },

    '& $slideRight': {
      pointerEvents: 'all',
    },
  },

  '@media (max-width: 870px)': {
    formRoot: {
      minHeight: '800px',
      height: '100vh',

      '& $formMode $loginRegister': {
        left: '50%',
      },

      '&:before': {
        width: '1500px',
        height: '1500px',
        transform: 'translateX(-50%)',
        left: '30%',
        bottom: '68%',
        right: 'initial',
        top: 'initial',
        transition: '2s ease-in-out',
      },
    },

    loginRegister: {
      width: '100%',
      top: '95%',
      transform: 'translate(-50%, -100%)',
      transition: '1s 0.8s ease-in-out',
    },

    sliderContainer: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr 2fr 1fr',
    },

    slider: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      gridColumn: '1/2',

      '& $sliderContent': {
        paddingRight: '15%',
        transition: 'transform 0.9s ease-in-out',
        transitionDelay: '0.8s',
      },
    },

    slideRight: {
      gridRow: '3/4',

      '& $sliderImg, & $sliderContent': {
        transform: 'translateY(300px)',
      },
    },

    slideLeft: {
      gridRow: '1/2',
    },

    sliderImg: {
      width: '200px',
      transition: 'transform 0.9s ease-in-out',
      transitionDelay: '0.6s',
    },

    formMode: {
      '&:before': {
        transform: 'translate(-50%, 100%)',
        bottom: '32%',
        right: 'initial',
      },

      '& $loginRegister': {
        top: '5%',
        transform: 'translate(-50%, 0)',
      },

      '& $slideLeft $sliderImg, & $slideLeft $slideContent': {
        transform: 'translateY(-300px)',
      },

      '& $slideRight $sliderImg, & $slideRight $slideContent': {
        transform: 'translateY(0px)',
      },
    },
  },

  '@media (max-width: 570px)': {
    formRoot: {
      padding: '1.5rem',

      '& $:before': {
        bottom: '72%',
        left: '50%',
      },
    },

    form: {
      padding: '0 1.5rem',
    },

    sliderImg: {
      display: 'none',
    },

    sliderContent: {
      padding: '0.5rem 1rem',
    },

    formMode: {
      '&:before': {
        bottom: '28%',
        left: '50%',
      },
    },
  },
}));
