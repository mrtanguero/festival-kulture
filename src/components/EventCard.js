import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import history from '../utils/history';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  CardActions: {
    paddingBottom: 15,
    paddingRight: 15,
    justifyContent: 'center',
  },
});

export default function EventCard({ data }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const auth = useContext(AuthContext);
  const open = Boolean(anchorEl);

  const {
    id,
    host,
    // 'userFirstName', //TODO: ovo bi trebalo nekako izvući radi prikaza
    eventName,
    startTime,
    endTime,
    eventImg,
    category,
    description,
  } = data;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return data ? (
    <Card className={classes.root}>
      <CardHeader
        // avatar={
        //   <Avatar
        //     alt={'userFirstName'}
        //     aria-label={'userFirstName'}
        //     className={classes.avatar}
        //   >
        //     {/* {userFirstName[0].toUpperCase()} */ 'R'}
        //   </Avatar>
        // }
        action={
          auth?.user?.id === host || auth?.user?.is_superuser ? (
            <React.Fragment>
              <IconButton
                aria-controls="edit-menu"
                aria-haspopup="true"
                aria-label="edit-menu"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="edit-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    history.push(`/events/${id}`);
                    handleClose();
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    // Ovdje logika za brisanje pa refresh?
                    alert('Are you sure you want to delete this event?');
                    handleClose();
                    history.push(`/delete/${id}`);
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </React.Fragment>
          ) : null
        }
        title={eventName}
        subheader={`${startTime.hours}:${startTime.minutes}-${endTime.hours}:${
          endTime.minutes
        } (${category.toLowerCase()})`}
      />
      <CardMedia className={classes.media} image={eventImg} title={eventName} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.CardActions}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            history.push(`/events/${id}`);
            handleClose();
          }}
        >
          Read more
        </Button>
      </CardActions>
    </Card>
  ) : null;
}
