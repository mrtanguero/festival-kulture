import React from 'react';
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

export default function EventCard(props) {
  const classes = useStyles();
  const {
    userName,
    userImgUrl,
    eventName,
    eventImageUrl,
    eventCategory,
    eventDescription,
  } = props.data;

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
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
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
