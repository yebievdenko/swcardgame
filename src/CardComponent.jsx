import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
      width: '50%',
      flex: 1
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12,
      display: 'flex',
      justifyContent: 'space-between'
    },
    winner: {
      backgroundColor: '#00FF00'
    }
  });

export default function CardComponent ({ player, winner }) {
        const { name, value, accessor } = player;
        const classes = useStyles();
        return (
            <Card className={classes.root} variant="outlined">
                <CardContent className={winner && classes.winner}>
                    <Typography color='#F0F' className={classes.title} variant="h5" component="h2">
                          <div>{name}</div>
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                          <span>{accessor}:</span>
                          <span>  {value}</span>
                    </Typography>
                </CardContent>
            </Card>
        );
}