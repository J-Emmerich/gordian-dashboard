import React, { useState, useMemo } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import styled from "styled-components";

import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import DeleteIcon from "@material-ui/icons/Delete";
import LastPage from "@material-ui/icons/LastPage";
import FirstPage from "@material-ui/icons/FirstPage";
import NavigateNext from "@material-ui/icons/NavigateNext";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

dayjs.extend(advancedFormat); // Plugin to format date

const Table = styled.table`
  border-collapse: collapse;
  border-radius: 1em;
  overflow: hidden;
  width: 100%;
`;

const TableHeader = styled.thead`
  background-color: #eee;
  & th {
    padding: 20px;
  }
`;

const Container = styled.div`
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
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                </th>
              ))}
            </tr>
          ))}
        </TableHeader>

        <tbody className="rt-tbody" {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr key={row.original._id}>
                {row.cells.map((cell) => {
                  if (
                    cell.column.Header !== "Download" &&
                    cell.column.Header !== "Delete"
                  ) {
                    return (
                      <td
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
                      </td>
                    );
                  } else {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
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
