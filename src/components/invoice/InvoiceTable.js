import React, { useEffect, useState, useMemo } from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import styled from "styled-components";

const Container = styled.div`
  padding-top: 15px;
`;
const InvoiceTable = ({ data }) => {
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
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}

                  {/* <div>
                    {column.id === "clientName"
                      ? column.render("Filter")
                      : null}
                  </div> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
