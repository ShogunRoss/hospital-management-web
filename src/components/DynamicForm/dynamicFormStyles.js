import { makeStyles } from '@material-ui/styles';

export default makeStyles(theme => ({
  input: {
    /* Chrome, Safari, Edge, Opera */
    '&::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '&::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },

    /* Firefox */
    '&[type=number]': {
      ' -moz-appearance': 'textfield'
    }
  }
}));
