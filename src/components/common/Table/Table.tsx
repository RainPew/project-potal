import clsx from "clsx";
import { isFunction } from "lodash";
import React, { MouseEventHandler } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ThSort } from "./ThSort";

export type HeaderColumnType = (
  | {
      isSort: true;
      onClickSortAsc: MouseEventHandler;
      onClickSortDesc: MouseEventHandler;
    }
  | {
      isSort: false;
    }
) & {
  text: string;
  className?: string;
};

export type BodyColumnType = {
  render?: Function;
  renderKey: string;
  isDisableCellClick?: boolean;
  tdClassName?: string;
};

interface TableProps {
  isLoading: boolean;
  dataSource: any[];
  headerColumns: HeaderColumnType[];
  bodyColumns: BodyColumnType[];
  idKey: string;
  onRowClick?: (id: string) => void;
  role?: string;
  defaultRowColor?: string;
  hoverRowColor?: string;
  activeRowColor?: string;
  fnCheckActiveRow?: (row: any) => boolean;
  dataTestId?: string;
}

const Table: React.FC<TableProps> = ({
  isLoading = true,
  dataSource,
  headerColumns,
  bodyColumns,
  idKey,
  onRowClick = null,
  role,
  dataTestId,
  defaultRowColor = "bg-white",
  hoverRowColor = "hover:bg-[#F5F8FB]",
  activeRowColor = "bg-[#F5F8FB]",
  fnCheckActiveRow,
}) => {
  const renderBody = () => {
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, index) => (
        <tr key={index}>
          {Array.from(Array(bodyColumns.length).keys()).map((cell) => (
            <td key={cell}>
              <div className="px-1 py-1 ">
                <Skeleton height={30} />
              </div>
            </td>
          ))}
        </tr>
      ));
    }

    if (dataSource.length === 0) {
      return (
        <tr>
          <td colSpan={bodyColumns.length}>
            <div className="px-2 py-8 text-center ">
              <span className="text-center text-gray-500">No data found</span>
            </div>
          </td>
        </tr>
      );
    }

    return dataSource.map((row) => {
      return (
        <tr
          onClick={() => {
            if (isFunction(onRowClick)) {
              onRowClick(row[idKey]);
            }
          }}
          key={row[idKey]}
          className={clsx(
            hoverRowColor,
            isFunction(onRowClick) && "cursor-pointer",
            (() => {
              if (isFunction(fnCheckActiveRow)) {
                return fnCheckActiveRow(row) ? activeRowColor : defaultRowColor;
              }
              return "";
            })()
            // fnCheckActiveRow && fnCheckActiveRow(row)
            //   ? activeRowColor
            //   : defaultRowColor
          )}
        >
          {bodyColumns.map(
            ({ renderKey, render, tdClassName, isDisableCellClick }) => {
              const dataRow = row[renderKey];
              return (
                <td
                  key={renderKey}
                  onClick={(e) => {
                    if (isDisableCellClick) {
                      e.stopPropagation();
                    }
                  }}
                  style={{
                    boxShadow: "inset 0px -1px 0px #CBD0DF",
                  }}
                  className={clsx(
                    `py-3 px-4 text-black text-xs leading-[125%]`,
                    isDisableCellClick && "cursor-default",
                    tdClassName
                  )}
                >
                  {render ? render(dataRow, row) : dataRow}
                </td>
              );
            }
          )}
        </tr>
      );
    });
  };

  return (
    <div className="overflow-x-auto relative w-full ">
      <table
        data-testid={dataTestId}
        role={role}
        className="w-full text-left table-auto border border-[#CBD0DF] rounded-[6px]"
      >
        <thead>
          <tr className="">
            {headerColumns.map((headerColumn, index) => (
              <React.Fragment key={headerColumn.text}>
                {headerColumn.isSort ? (
                  <ThSort
                    onClickSortAsc={headerColumn.onClickSortAsc}
                    onClickSortDesc={headerColumn.onClickSortDesc}
                    text={headerColumn.text}
                    isAlignRight={index === headerColumns.length - 1}
                    className={headerColumn.className}
                  />
                ) : (
                  <th
                    className={clsx(
                      "py-3 px-4 bg-white text-[#000A44] font-medium text-[15px] leading-[18px] border-b border-b-[#CBD0DF] ",
                      headerColumn.className
                    )}
                  >
                    {headerColumn.text}
                  </th>
                )}
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
};

export { Table };
