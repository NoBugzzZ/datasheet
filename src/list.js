import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList({ open: drawerOpen }) {
  const classes = useStyles();
  const [modelChildOpen, setModelChildOpen] = React.useState(false);

  useEffect(() => {
    if (!drawerOpen) {
      setModelChildOpen(false)
    }
  }, [drawerOpen])


  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={() => { if (drawerOpen) setModelChildOpen(!modelChildOpen); }}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="模型" />
        {modelChildOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={modelChildOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemLink href="/dmlist" className={classes.nested}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="数据模型" />
          </ListItemLink>
          <ListItemLink href="/fmlist" className={classes.nested}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="流程模型" />
          </ListItemLink>
        </List>
      </Collapse>

      <ListItemLink href="/datasheetpage">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="表格" />
      </ListItemLink>
    </List>
  );
}