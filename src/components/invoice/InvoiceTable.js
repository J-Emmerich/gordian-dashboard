import React, { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import DeleteIcon from "@material-ui/icons/Delete";
import LastPage from "@material-ui/icons/LastPage";
import FirstPage from "@material-ui/icons/FirstPage";
import NavigateNext from "@material-ui/icons/NavigateNext";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import styled from "styled-components";

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
    padding-left: 10px;
  }
`;

const Pagination = styled.div``;

const InvoiceTable = ({ data, handleClick, saveToPdf, deleteInvoice }) => {
  const [filterInput, setFilterInput] = useState("");

  // Update the state when input changes
  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter("clientName", value);
    setFilterInput(value);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Cliente",
        columns: [
          {
            Header: "Nombre",
            accessor: "clientName"
          }
        ]
      },
      {
        Header: "Información Facturas",
        columns: [
          {
            Header: "Date",
            accessor: "invoiceDate"
          },
          {
            Header: "Numero de Factura",
            accessor: "invoiceNumber"
          },
          {
            Header: "Total",
            accessor: "invoiceTotal"
          },
          {
            Header: "Download",
            accessor: "_id",
            Cell: (props) => {
              return (
                <PictureAsPdfIcon
                  className="save-to-pdf"
                  onClick={() => saveToPdf(props.cell.value)}
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
        ]
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
      <table className="-highlight" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

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
                          e.target.parentNode.style.backgroundColor = "red";
                        }}
                        onMouseLeave={(e) => {
                          e.target.parentNode.style.backgroundColor = "white";
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
      </table>
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

export default InvoiceTable;
