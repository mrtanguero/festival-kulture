import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
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
  const open = Boolean(anchorEl);
  const {
    userName,
    userImgUrl,
    eventName,
    eventImageUrl,
    eventCategory,
    eventDescription,
  } = data;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            src={userImgUrl}
            alt={userName}
            aria-label={userName}
            className={classes.avatar}
          >
            {userImgUrl ? '' : 'R'}
          </Avatar>
        }
        action={
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
              <MenuItem onClick={handleClose}>Edit</MenuItem>
              <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
          </React.Fragment>
        }
        title={<strong>{eventName}</strong>}
        subheader={eventCategory}
      />
      <CardMedia
        className={classes.media}
        image={eventImageUrl}
        title={eventName}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {eventDescription}
        </Typography>
      </CardContent>
      <CardActions className={classes.CardActions}>
        <Button variant="contained" color="secondary">
          Read more
        </Button>
      </CardActions>
    </Card>
  );
}
