import React from 'react'
import TopHeader from './TopHeader'
import BannerTypes from './BannerTypes'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Others from './Others';
import Grid from '@material-ui/core/Grid';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import ContactUsForm from './ContactUsForm';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 50,
    },
    other: {
        marginTop: 50,
        marginBottom: 50,
    },
    bannerTypes: {
        marginTop: 50,
        marginBottom: 50,
    },
    bottomNav: {
        height: 200,
        width: 1920,
        backgroundColor: 'black',
        color: 'white',
    },
}));


const Home = () => {
    const classes = useStyles();
    return (
        <div className="headerpage">
            <TopHeader />

            <Paper variant="outlined" square >
                <Typography className={classes.root} variant="h3" component="h3" gutterBottom>
                    EXPLORE TILES
                </Typography>
            </Paper>


            <Grid container direction="row" justify="space-around" alignItems="center" className={classes.bannerTypes}>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <BannerTypes />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <BannerTypes />
                </Grid>
            </Grid>

            <Grid container direction="row" justify="center" spacing={0} >
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} spacing={3}>
                    <Paper variant="outlined" square >
                        <Typography className={classes.root} variant="h3" component="h2" gutterBottom>
                            Explore More of our products
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container direction="row" justify="space-around" alignItems="center" className={classes.other} spacing={1} >
                <Grid container item xs={12} sm={4} md={3} lg={2} xl={2} spacing={3}>
                    <Others />
                </Grid>
                <Grid container item xs={12} sm={4} md={3} lg={2} xl={2} spacing={3}>
                    <Others />
                </Grid>
                <Grid container item xs={12} sm={4} md={3} lg={2} xl={2} spacing={3}>
                    <Others />
                </Grid>
                <Grid container item xs={12} sm={4} md={3} lg={2} xl={2} spacing={3}>
                    <Others />
                </Grid>
                <Grid container item xs={12} sm={4} md={3} lg={2} xl={2} spacing={3}>
                    <Others />
                </Grid>
            </Grid>


            <Paper variant="outlined" square style={{ backgroundColor: '#ee5522' }}>
                <ContactUsForm />
            </Paper>
        </div>
    )
}

export default Home


/*
 *
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
 *
 */