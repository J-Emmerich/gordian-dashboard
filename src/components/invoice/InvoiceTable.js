import React, { useState, useMemo } from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import styled from "styled-components";

const Container = styled.div`
  padding-top: 15px;
  tr {
    :hover {
      cursor: pointer;
    }
  }
`;

const InvoiceTable = ({ data, handleClick }) => {
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
          }
        ]
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter
  } = useTable({ columns, data }, useFilters, useSortBy);

  return (
    <Container>
      <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search name"}
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
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                onClick={() => {
                  handleClick(row.original);
                }}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="react-td"
                      {...cell.getCellProps()}
                      onMouseEnter={(e) =>
                        (e.target.parentNode.style.backgroundColor = "red")
                      }
                      onMouseLeave={(e) =>
                        (e.target.parentNode.style.backgroundColor = "white")
                      }
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
};

export default InvoiceTable;
