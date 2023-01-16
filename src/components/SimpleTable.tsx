import {
  CellRenderer,
  Column,
  ColumnHeaderCell,
  ColumnHeaderRenderer,
  RegionCardinality,
  Table2,
} from "@blueprintjs/table";
import { Menu, MenuItem } from "@blueprintjs/core";
import { Job } from "../generated/graphql";

type simpleTableProps = {
  jobData: Job[];
  cellRenderer: CellRenderer;
  additionalColumns: string[];
};

function SimpleTable({
  jobData,
  cellRenderer,
  additionalColumns,
}: simpleTableProps) {
  let rowCount: number = 0;
  let columns: string[] = [];

  if (jobData) {
    rowCount = jobData.length;
    columns = Object.keys(jobData[0]).map((key) => {
      return key.toString();
    });
  }

  additionalColumns.forEach((columnName) => {
    columns.push(columnName);
  });

  const emptyOnClick = () => {
    //future implementation
  };

  const sortMenuRenderer = () => (
    <Menu>
      <MenuItem icon="sort-asc" onClick={emptyOnClick} text="Sort Asc" />
      <MenuItem icon="sort-desc" onClick={emptyOnClick} text="Sort Desc" />
    </Menu>
  );

  const sortableHeaderRenderer: ColumnHeaderRenderer = (
    columnIndex: number
  ) => (
    <ColumnHeaderCell menuRenderer={sortMenuRenderer}>
      {columns[columnIndex].toString()}
    </ColumnHeaderCell>
  );

  return (
    <Table2 numRows={rowCount} selectionModes={[RegionCardinality.FULL_ROWS]}>
      {columns.map((key) => {
        const keyName = `job-grid-column-${key}`;
        return (
          <Column
            key={keyName}
            name={key}
            cellRenderer={cellRenderer}
            columnHeaderCellRenderer={sortableHeaderRenderer}
          />
        );
      })}
    </Table2>
  );
}

export default SimpleTable;
