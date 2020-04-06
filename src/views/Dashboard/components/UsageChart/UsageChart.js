import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import CustomizedShape from './CustomizedShape';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.purple,
    height: 64,
    width: 64,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

const UsageChart = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
          variant="body2">
          THỐNG KÊ TỔNG SỐ GIỜ SỬ DỤNG THIẾT BỊ
        </Typography>
        <ResponsiveContainer height={500}>
          <BarChart
            data={data}
            maxBarSize={14}
            margin={{
              top: 24,
              right: 8,
              left: 8,
              bottom: 24
            }}>
            <CartesianGrid vertical={false} strokeDasharray="5" />
            <XAxis axisLine={false} tickLine={false} dataKey="name" />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            {/* <Legend /> */}
            <Bar shape={<CustomizedShape />} dataKey="pv" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

UsageChart.propTypes = {
  className: PropTypes.string
};

export default UsageChart;
