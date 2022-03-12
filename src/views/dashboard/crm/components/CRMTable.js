import React, { useState, useMemo } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import styled from "styled-components";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DeleteIcon from "@mui/icons-material/Delete";
import LastPage from "@mui/icons-material/LastPage";
import FirstPage from "@mui/icons-material/FirstPage";
import NavigateNext from "@mui/icons-material/NavigateNext";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import MuiTable from '@mui/material/Table';
import MuiTableBody from '@mui/material/TableBody';
import MuiTableCell from '@mui/material/TableCell';
import MuiTableContainer from '@mui/material/TableContainer';
import MuiTableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



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

const Pagination = styled.div``;

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
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable({ columns, data }, useFilters, useSortBy, usePagination);

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
      </Table>
      <Pagination>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <FirstPage />
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <NavigateBefore />
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          <NavigateNext />
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <LastPage />
        </button>{" "}
        <span>
          Página
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Ir a página:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <Select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <MenuItem key={pageSize} value={pageSize}>
              Mostrar {pageSize}
            </MenuItem>
          ))}
        </Select>
      </Pagination>
    </Container>
  );
};

export default CRMTable;
