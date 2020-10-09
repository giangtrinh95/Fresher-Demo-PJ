import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Link as routerLink } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import useFilterMap from '../../components/hooks/useFilterMap';
import { logout } from '../App/actions';
import { makeSelectRoleRoute, makeSelectUsername } from '../App/selectors';
import useStyles from './styles';

function Layouts(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    props.onLogout();
  };
  const renderRoutes = () => {
    let result = null;
    const dataRoute = useFilterMap(props.role);
    result = dataRoute.map(route => {
      if (route.show === 1) {
        return (
          <ListItem
            button
            component={routerLink}
            to={`${route.path}`}
            key={route.name}
          >
            <ListItemIcon>{route.icon}</ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        );
      }
    });
    return result;
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            DEMO
          </Typography>
          <Typography className={classes.username} variant="h6" noWrap>
            Chào mừng :
            <span className={classes.usernameColor}>{props.name}</span>
          </Typography>
          <Button
            color="inherit"
            className={classes.button}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>{renderRoutes()}</List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div>{props.children}</div>
      </main>
    </div>
  );
}

Layouts.propTypes = {
  role: PropTypes.string,
  onLogout: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  role: makeSelectRoleRoute(),
  name: makeSelectUsername(),
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(Layouts);
