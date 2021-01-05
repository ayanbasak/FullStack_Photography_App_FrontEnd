import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        margin: '20px',
        alignItems: 'center',
        justifyContent: 'center',
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(0),
        paddingBottom: theme.spacing(10),
        width: 500,
        height: 300,
    },
    text: {
        paddingRight: theme.spacing(5),
    },
    cover: {
        width: 500,
        height: 300,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

export default function BannerTypes() {
    const classes = useStyles();

    return (
        <>
            {/*   item start   */}
            <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant="h5" className={classes.text}>
                            h5. Heading
                        <Typography variant="body2">
                                body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                                unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                    </Typography>
                        </Typography>

                    </CardContent>

                </div>
                <CardMedia
                    className={classes.cover}
                    image="https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60"
                    title="Live from space album cover"
                />
            </Card>
            {/*   item end   */}
            {/*   item start   */}
            <Card className={classes.root}>
                <CardMedia
                    className={classes.cover}
                    image="https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60"
                    title="Live from space album cover"
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant="h5" className={classes.text}>
                            h5. Heading
                        <Typography variant="body2">
                                body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                                unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                    </Typography>
                        </Typography>

                    </CardContent>

                </div>

            </Card>
            {/*   item end   */}
        </>
    );
}
