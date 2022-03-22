import React, { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import styled from "styled-components";

import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import Box from "@mui/material/Box";
import MuiTable from "@mui/material/Table";
import MuiTableBody from "@mui/material/TableBody";
import MuiTableCell from "@mui/material/TableCell";
import MuiTableContainer from "@mui/material/TableContainer";
import MuiTableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

dayjs.extend(advancedFormat); // Plugin to format date

const Table = styled(MuiTable)`
  border-collapse: collapse;
  border-radius: 1em;
  overflow: hidden;
  width: 100%;
`;

const TableHeader = styled(MuiTableHead)`
  background-color: #eee;
  & th {
    padding: 20px;
  }
`;

const Container = styled(MuiTableContainer)`
  padding-top: 15px;
  .react-td,
  .save-to-pdf,
  .delete {
    :hover {
      cursor: pointer;
    }
  }
  td {
    padding: 10px;
  }
  input {
    margin-bottom: 20px;
    padding: 10px;
  }
  th {
    height: 30px;
    & div {
      display: flex;
      align-items: center;
    }
  }
`;

const CRMTable = ({ data, handleClick, deleteCustomer }) => {
  const [filterInput, setFilterInput] = useState("");

  // Update the state when input changes
  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter("name", value);
    setFilterInput(value);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "name",
        sortBy: "string"
      },

      {
        Header: "Contrato",
        accessor: "estadoContrato"
      },
      {
        Header: "Modelo Contrato",
        accessor: "modeloContrato"
      },
      {
        Header: "Delete",
        accessor: "",
        Cell: (props) => {
          return (
            <DeleteIcon
              className="delete"
              onClick={() => deleteCustomer(props.cell.row.original._id)}
            >
              PDF
            </DeleteIcon>
          );
        }
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setFilter,
    // Pagination helpers

    pageOptions,
    toggleHideColumn,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable({ columns, data }, useFilters, useSortBy, usePagination);

  const TablePaginationActions = (props) => {
    const { count, page, rowsPerPage, onPageChange } = props;

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={()=>previousPage()}
          disabled={page === 0}
          aria-label="previous page"
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={()=>nextPage()}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          <KeyboardArrowRight />
        </IconButton>
      </Box>
    );
  };

  return (
    <Container>
      <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Buscar por nome"}
      />
      <Table className="-highlight" {...getTableProps()}>
        <TableHeader>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <MuiTableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <div>
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowDropDownIcon />
                        ) : (
                          <ArrowDropUpIcon />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </MuiTableCell>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <MuiTableBody className="rt-tbody" {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow key={row.original._id}>
                {row.cells.map((cell) => {
                  if (
                    cell.column.Header !== "Download" &&
                    cell.column.Header !== "Delete"
                  ) {
                    return (
                      <MuiTableCell
                        className="react-td"
                        {...cell.getCellProps()}
                        onMouseEnter={(e) => {
                          e.target.parentNode.style.backgroundColor = "#F1769A";
                        }}
                        onMouseLeave={(e) => {
                          e.target.parentNode.style.backgroundColor = "inherit";
                        }}
                        onClick={() => {
                          handleClick(cell.row.original);
                        }}
                      >
                        {cell.render("Cell")}
                      </MuiTableCell>
                    );
                  } else {
                    return (
                      <MuiTableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </MuiTableCell>
                    );
                  }
                })}
              </TableRow>
            );
          })}
        </MuiTableBody>
        <TableFooter>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            colSpan={3}
            count={pageOptions.length}
            rowsPerPage={pageSize}
            page={pageIndex}
            SelectProps={{
              inputProps: {
                "aria-label": "Columnas por página"
              },
              native: true
            }}
            ActionsComponent={TablePaginationActions}
            onRowsPerPageChange={(e) => setPageSize(e.target.value)}
            sx={{overflow: 'visible'}}
          />
        </TableFooter>
      </Table>
    </Container>
  );
};

export default CRMTable;
