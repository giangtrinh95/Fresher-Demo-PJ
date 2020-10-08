import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Dashboard from 'containers/Dashboard';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Report from 'containers/Report';
import ViewReport from 'containers/Report/ViewReport';
import React from 'react';
import Order from '../Customer/Order';

const routes = [
  {
    path: '/dashboard',
    name: 'DashBoard',
    icon: <InboxIcon />,
    exact: false,
    role: 'admin',
    component: Dashboard,
    show: 1,
  },
  {
    path: '/customer',
    name: 'Customer',
    icon: <MailIcon />,
    exact: false,
    role: ['admin', 'member'],
    component: Order,
    show: 1,
  },
  {
    path: '/reports',
    name: 'Report',
    icon: <MailIcon />,
    exact: false,
    role: ['admin'],
    component: Report,
    show: 1,
  },
  {
    path: '/view/:id',
    name: 'Report',
    icon: <MailIcon />,
    exact: false,
    role: ['admin'],
    component: ViewReport,
    show: 0,
  },
  {
    path: '', //Last route
    name: 'NotFoundPage',
    role: ['admin', 'member'],
    exact: false,
    component: NotFoundPage,
    show: 0,
  },
];
export default routes;
