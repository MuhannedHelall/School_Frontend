import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { Loader } from 'src/sections/loader';
import FileUploadDialog from 'src/sections/file-upload/fileUpload-dialog';

import TableNoData from '../table-no-data';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function TableView({
  title,
  addTitle = '',
  headLabel,
  items,
  onDownload,
  onUpload,
  TableRow,
  AddDialog,
}) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = items.data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: items.data,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{title + addTitle}</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setOpenAdd(true)}
        >
          New {title.slice(0, title.length - 1)}
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          // showSearch={dataFiltered.length > 1}
          title={title}
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          onOpenUpload={() => setOpenUpload(true)}
        />

        {items.loading ? (
          //   <Typography variant="h3" textAlign="center" my="100px">
          //     Loading ...
          //   </Typography>
          <Loader />
        ) : (
          <Scrollbar>
            {dataFiltered.length < 1 ? (
              <h1 style={{ textAlign: 'center' }}>No {title.toLowerCase()} to show !</h1>
            ) : (
              <TableContainer sx={{ overflow: 'unset' }}>
                <Table sx={{ minWidth: 800 }}>
                  <UserTableHead
                    order={order}
                    orderBy={orderBy}
                    rowCount={items.data.length}
                    numSelected={selected.length}
                    onRequestSort={handleSort}
                    onSelectAllClick={handleSelectAllClick}
                    headLabel={headLabel}
                  />
                  <TableBody>
                    {dataFiltered
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow
                          key={row?.id || row.grades.id}
                          user={row}
                          selected={selected.indexOf(row.name) !== -1}
                          handleClick={(event) => handleClick(event, row.name)}
                        />
                      ))}

                    <TableEmptyRows
                      height={77}
                      emptyRows={emptyRows(page, rowsPerPage, items.data.length)}
                    />

                    {notFound && <TableNoData query={filterName} />}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Scrollbar>
        )}

        <TablePagination
          page={page}
          component="div"
          count={items.data.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <AddDialog open={openAdd} setOpen={setOpenAdd} title={title} />

        <FileUploadDialog
          open={openUpload}
          setOpen={setOpenUpload}
          onDownload={onDownload}
          onUpload={(file) => {
            onUpload(file);
            setOpenUpload(false);
          }}
        />
      </Card>
    </Container>
  );
}

TableView.propTypes = {
  title: PropTypes.any,
  addTitle: PropTypes.any,
  headLabel: PropTypes.any,
  items: PropTypes.any,
  onDownload: PropTypes.func,
  onUpload: PropTypes.func,
  TableRow: PropTypes.any,
  AddDialog: PropTypes.any,
};
