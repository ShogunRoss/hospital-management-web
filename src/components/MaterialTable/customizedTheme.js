import { createMuiTheme } from '@material-ui/core';
import palette from 'src/theme/palette';
import typography from 'src/theme/typography';

export default (toolbarPaddingNarrow = false) => {
  return createMuiTheme({
    palette,
    typography,
    overrides: {
      MUIDataTableHeadCell: {
        sortAction: {
          flexDirection: 'row',
          alignItems: 'center'
        },
        sortActive: {
          color: palette.primary.dark
        }
      },
      MuiTableSortLabel: {
        icon: {
          color: `${palette.primary.dark} !important`
        }
      },
      MuiTableRow: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: palette.white
          },
          '&:nth-of-type(even)': {
            backgroundColor: palette.primary.light
          }
        }
      },
      MuiTableHead: {
        root: {
          borderBottom: '2px solid #E4E7EB'
        }
      },
      MuiToolbar: toolbarPaddingNarrow && {
        regular: {
          paddingLeft: 16,
          paddingRight: 4,
          '@media (min-width: 600px)': {
            minHeight: 48
          }
        }
      },
      MUIDataTable: {
        responsiveStacked: {
          overflowX: 'hidden'
        }
      }
    }
  });
};
