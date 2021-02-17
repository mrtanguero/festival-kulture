import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
    formRoot: {
        maxWidth: '400px',
        margin: 'auto',
        textAlign: 'center',

        '& h3': {
            marginTop: '5%'
        }
    },

    formContainer:{
        display: 'flex',
        flexDirection: 'column',
    },

    form: {
        display: 'flex',
        flexDirection: 'column'

    },

    formImg: {
        width: '100%'
    },

    googleIcon: {
        '& img': {
            width: '10%',
            marginTop: '5%'
        }
    }
})