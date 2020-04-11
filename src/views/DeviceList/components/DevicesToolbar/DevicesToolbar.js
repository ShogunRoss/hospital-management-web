import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(2)
  }
}));

const ProductsToolbar = props => {
  const { className, onAddNewDevice, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Button
        onClick={onAddNewDevice}
        color="primary"
        variant="contained"
        startIcon={<AddIcon />}>
        Thêm thiết bị
      </Button>
    </div>
  );
};

ProductsToolbar.propTypes = {
  className: PropTypes.string,
  onAddNewDevice: PropTypes.func
};

export default ProductsToolbar;
