import React from 'react';
import PropTypes from 'prop-types';

import {
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material';

import { Loader } from 'src/sections/loader';

function ScheduleView({ title, data }) {
  const daysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  const timesOfDay = [
    { period: 1, start: '08:00 AM', end: '09:30 AM' },
    { period: 2, start: '09:30 AM', end: '11:00 AM' },
    { period: 3, start: '11:00 AM', end: '11:30 AM' }, // Include the break
    { period: 4, start: '11:30 AM', end: '01:00 PM' },
    { period: 5, start: '01:00 PM', end: '02:30 PM' },
  ];
  const styles = {
    tableContainer: {
      maxWidth: 1200,
      margin: 'auto',
      marginTop: 5,
    },
    headerCell: {
      backgroundColor: '#2196F3',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1.0rem',
      wordWrap: 'break-word',
      textAlign: 'center',
    },
    timeCell: {
      backgroundColor: '#f5f5f5',
      fontWeight: 'bold',
      fontSize: '1.1rem',
      wordWrap: 'break-word',
      textAlign: 'center',
    },
    blockRow: {
      borderBottom: '1px solid #ccc',
    },
    blockCell: {
      border: '1px solid #ccc',
      padding: '12px',
      textAlign: 'center',
      wordWrap: 'break-word',
    },
    multilineText: {
      whiteSpace: 'pre-line',
    },
  };

  return (
    <>
      <Typography variant="h3">{title} Schedule</Typography>
      {data.loading ? (
        <Loader sx="mt-5 pt-5" />
      ) : (
        <TableContainer component={Paper} sx={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={styles.headerCell}>Period</TableCell>
                {timesOfDay.map((time) => (
                  <TableCell key={time.period} align="center" sx={styles.headerCell}>
                    {`${time.start} - ${time.end}`}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {daysOfWeek.map((day) => (
                <TableRow key={day}>
                  <TableCell sx={styles.timeCell}>{day}</TableCell>
                  {timesOfDay.map((time) => {
                    const scheduleItem =
                      data?.data?.find((item) => item.day === day && item.period === time.period) ||
                      {};
                    return (
                      <TableCell
                        key={`${day}-${time.period}`}
                        style={{ ...styles.blockCell, ...styles.multilineText }}
                        className="text-center"
                      >
                        {scheduleItem ? (
                          <>
                            {scheduleItem.data?.sub}
                            <br />
                            {scheduleItem.data?.class}
                          </>
                        ) : (
                          ''
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

ScheduleView.propTypes = {
  title: PropTypes.any,
  data: PropTypes.any,
};

export default ScheduleView;
