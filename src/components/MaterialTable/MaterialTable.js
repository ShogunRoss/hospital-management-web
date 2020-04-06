import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { ThemeProvider } from '@material-ui/core';
import customizedTheme from './customizedTheme';

const MaterialTable = props => {
  const { columns, data, options, toolbarNarrow = false, ...rest } = props;

  const defaultOptions = {
    filterType: 'dropdown',
    selectableRows: 'none',
    download: false,
    print: false,
    sortFilterList: false,
    viewColumns: false,
    elevation: 0,
    textLabels: {
      body: {
        noMatch: 'Xin lỗi, không tìm thấy dữ liệu để hiển thị',
        toolTip: 'Sắp xếp',
        columnHeaderTooltip: column => `Sắp xếp theo ${column.label}`
      },
      filter: {
        all: 'Tất cả',
        title: 'BỘ LỌC',
        reset: 'Đặt lại'
      },
      toolbar: {
        search: 'Tìm kiếm',
        filterTable: 'Bộ lọc',
        viewColumns: 'Hiển thị cột'
      },
      pagination: {
        next: 'Trang kế tiếp',
        previous: 'Trang trước',
        rowsPerPage: 'Số hàng mỗi trang:',
        displayRows: 'trong'
      }
    },
    ...options
  };

  return (
    <ThemeProvider theme={customizedTheme(toolbarNarrow)}>
      <MUIDataTable
        data={data}
        columns={columns}
        options={defaultOptions}
        {...rest}
      />
    </ThemeProvider>
  );
};

MaterialTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  options: PropTypes.object,
  toolbarNarrow: PropTypes.bool
};

export default MaterialTable;
