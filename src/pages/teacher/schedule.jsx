import { Helmet } from 'react-helmet-async';

import {
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
} from '@mui/material';

function SchedulePage() {
  const daysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  const timesOfDay = [
    { start: '08:00 AM', end: '09:30 AM' },
    { start: '09:30 AM', end: '11:00 AM' },
    { start: '11:00 AM', end: '11:30 AM' }, // Include the break
    { start: '11:30 AM', end: '01:00 PM' },
    { start: '01:00 PM', end: '02:30 PM' },
  ];
  const scheduleData = [
    { day: 'Saturday', time: '08:00 AM', data: { sub: 'Arabic for level 2', class: '1/1' } },
    { day: 'Tuesday', time: '09:30 AM', data: { sub: 'Arabic for level 1', class: '1/1' } },
  ];

  const styles = {
    tableContainer: {
      maxWidth: 1200,
      margin: 'auto',
    },
    headerCell: {
      backgroundColor: '#2196F3',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      width: '100px',
      wordWrap: 'break-word',
    },
    timeCell: {
      width: '80px',
      backgroundColor: '#f5f5f5',
      fontWeight: 'bold',
      fontSize: '1.1rem',
      wordWrap: 'break-word',
    },
    blockRow: {
      borderBottom: '1px solid #ccc',
    },
    blockCell: {
      border: '1px solid #ccc',
      padding: '12px',
      textAlign: 'center',
      width: '100px',
      wordWrap: 'break-word',
    },
    multilineText: {
      whiteSpace: 'pre-line',
    },
  };

  return (
    <>
      <Helmet>
        <title>Schedule</title>
      </Helmet>

      <h1>Teacher Schedule</h1>

      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.headerCell}>Times</TableCell>
              {daysOfWeek.map((day) => (
                <TableCell key={day} align="center" sx={styles.headerCell}>
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {timesOfDay.map((time, index) => (
              <TableRow key={index}>
                <TableCell sx={styles.timeCell}>{`${time.start} - ${time.end}`}</TableCell>
                {daysOfWeek.map((day) => {
                  const scheduleItem = scheduleData.find(
                    (item) => item.day === day && item.time === time.start
                  );
                  return (
                    <TableCell
                      key={`${day}-${time.start}`}
                      sx={`${styles.blockCell} ${styles.multilineText}`}
                    >
                      {scheduleItem ? (
                        <>
                          {scheduleItem.data.sub}
                          <br />
                          {scheduleItem.data.class}
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
    </>
  );
}

export default SchedulePage;
