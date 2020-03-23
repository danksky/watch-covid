import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import MaterialTooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


import TableChartIcon from '@material-ui/icons/TableChart';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import FeedbackIcon from '@material-ui/icons/Feedback';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
// import DevicesIcon from '@material-ui/icons/Devices';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    appBarIconButton: {
        marginRight: theme.spacing(2),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default function PrimarySearchAppBar(props) {
    const classes = useStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };


    const handleTitleClick = () => { history.push("/") }
    const handleAboutClick = () => { history.push("/about") }
    const handleFeedbackClick = () => { history.push("/feedback") }
    const handleSupportClick = () => { history.push("/support") }
    const handleDataClick = () => { window.location.href = 'https://github.com/CSSEGISandData/COVID-19'; }
    const handleDeviceToggleClick = () => { props.toggleDeviceHandler() }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleAboutClick}>
                <IconButton aria-label="go to about page" color="inherit">
                    <HelpOutlineIcon />
                </IconButton>
                <p>About</p>
            </MenuItem>
            <MenuItem onClick={handleDataClick}>
                <IconButton aria-label="see the data source" color="inherit">
                    <TableChartIcon />
                </IconButton>
                <p>Source Data</p>
            </MenuItem>
            <MenuItem onClick={handleFeedbackClick}>
                <IconButton aria-label="fill out feedback form" color="inherit">
                    <FeedbackIcon />
                </IconButton>
                <p>Feedback</p>
            </MenuItem>
            <MenuItem onClick={handleSupportClick}>
                <IconButton aria-label="support the developers" color="inherit">
                    <AccessibilityNewIcon />
                </IconButton>
                <p>Support</p>
            </MenuItem>
            {/* <MenuItem onClick={handleDeviceToggleClick}>
                <IconButton aria-label="toggle device mode" color="inherit">
                    <DevicesIcon />
                </IconButton>
                <p>Toggle</p>
            </MenuItem> */}

        </Menu>
    );

    return (
        <div>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <Button className="app-bar-title">
                        <Typography className={classes.title} variant="button" onClick={handleTitleClick}>WATCHCOVID.ORG</Typography>
                    </Button>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {/* <MaterialTooltip title="Toggle device mode" aria-label="add">
                            <IconButton className={classes.appBarIconButton} edge="end" aria-label="menu" onClick={handleDeviceToggleClick}>
                                <DevicesIcon color="action" />
                            </IconButton>
                        </MaterialTooltip> */}
                        <MaterialTooltip title="Support WatchCovid.org" aria-label="add">
                            <IconButton className={classes.appBarIconButton} edge="end" aria-label="menu" onClick={handleSupportClick}>
                                <AccessibilityNewIcon color="action" />
                            </IconButton>
                        </MaterialTooltip>
                        <MaterialTooltip title="Provide feedback" aria-label="add">
                            <IconButton className={classes.appBarIconButton} edge="end" aria-label="menu" onClick={handleFeedbackClick}>
                                <FeedbackIcon color="action" />
                            </IconButton>
                        </MaterialTooltip>
                        <MaterialTooltip title="Explore raw data" aria-label="add">
                            <IconButton className={classes.appBarIconButton} edge="end" aria-label="menu" onClick={handleDataClick}>
                                <TableChartIcon color="action" />
                            </IconButton>
                        </MaterialTooltip>
                        <MaterialTooltip title="About WatchCovid.org" aria-label="add">
                            <IconButton className={classes.iconButton} edge="end" aria-label="menu" onClick={handleAboutClick}>
                                <HelpOutlineIcon color="action" />
                            </IconButton>
                        </MaterialTooltip>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                        >
                            <MoreIcon color="action" />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div >
    );
}