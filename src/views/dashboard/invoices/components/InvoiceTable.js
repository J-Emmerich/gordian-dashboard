import React, { useState, useMemo } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import styled from "styled-components";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
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
    padding-left: 10px;
    height: 30px;
    & div {
      display: flex;
      align-items: center;
    }
  }
`;

const Pagination = styled.div`
  width: 100%;
`;




const InvoiceTable = ({ data, handleClick, saveToPdf, deleteInvoice }) => {
  const [filterInput, setFilterInput] = useState("");
  // Update the state when input changes
  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter("clientName", value);
    setFilterInput(value);
  };

  const formatDate = (date) => {
    const newDate = dayjs(date).format("DD-MM-YYYY");

    return date;
  };

  const columns = useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "clientName",
        sortBy: "string"
      },
      {
        Header: "Fecha",
        accessor: (row) => row.invoiceDate, //
        sortBy: "datetime",
        Cell: (props) => {
          return <>{formatDate(props.cell.value)}</>;
        }
      },
      {
        Header: "Numero de Factura",
        accessor: "invoiceNumber"
      },
      {
        Header: "Total",
        accessor: "invoiceTotal",
        sortBy: "basic"
      },
      {
        Header: "Download",
        accessor: "_id",
        Cell: (props) => {
          return (
            <PictureAsPdfIcon
              className="save-to-pdf"
              onClick={() => saveToPdf(props.cell.value, props.cell.row.original.invoiceNumber)}
            >
              PDF
            </PictureAsPdfIcon>
          );
        }
      },
      {
        Header: "Delete",
        accessor: "",
        Cell: (props) => {
          return (
            <DeleteIcon
              className="delete"
              onClick={() => deleteInvoice(props.cell.row.original._id)}
            >
              PDF
            </DeleteIcon>
          );
        }
      }
    ],
    [saveToPdf]
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
    <Container >
      <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Buscar por nombre"}
      />
      <Table {...getTableProps()}>
        <TableHeader>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <MuiTableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                      <MuiTableCell {...cell.getCellProps()}>{cell.render("Cell")}</MuiTableCell>
                    );
                  }
                })}
              </TableRow>
            );
          })}
        </MuiTableBody>
        <TableFooter>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30, data.length]}
            colSpan={3}
            count={data.length}
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

export default InvoiceTable;
