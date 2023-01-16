import clsx from "clsx";
import React, { MouseEventHandler, useState } from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import ArrowDownSortIcon from "../../../svgs/ArrowDownSortIcon";
import ArrowDownSortPopoverIcon from "../../../svgs/ArrowDownSortPopoverIcon";
import ArrowUpSortPopoverIcon from "../../../svgs/ArrowUpSortPopoverIcon";

interface ThSortProps {
  onClickSortAsc: MouseEventHandler;
  onClickSortDesc: MouseEventHandler;
  text: string;
  isAlignRight?: boolean;
  className?: string;
}

const ThSort: React.FC<ThSortProps> = ({
  onClickSortAsc,
  onClickSortDesc,
  text,
  isAlignRight,
  className,
}) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const ref = React.useRef<HTMLTableCellElement>(null);
  useOnClickOutside(ref, () => {
    setIsOpenPopover(false);
  });

  return (
    <th
      ref={ref}
      className={clsx(
        "p-[0.625rem] bg-[#1D0C36] text-white font-bold text-xs leading-[125%] border-black border cursor-pointer relative",
        className
      )}
      onClick={() => {
        setIsOpenPopover((prev) => {
          return !prev;
        });
      }}
    >
      <div className="flex justify-center items-center ">
        {text}
        <ArrowDownSortIcon />
      </div>
      {isOpenPopover && (
        <div
          className={clsx(
            ` border border-[#00000033] bg-[#F5F5F5] rounded-[0.625rem] absolute
            top-9  w-[13.4375rem] z-10 `,
            isAlignRight === true ? " right-0 " : " left-0 "
          )}
        >
          {[
            {
              text: "Sort A to Z",
              icon: <ArrowUpSortPopoverIcon />,
              onClick: onClickSortAsc,
            },
            {
              text: "Sort Z to A",
              icon: <ArrowDownSortPopoverIcon />,
              onClick: onClickSortDesc,
            },
          ].map((item) => (
            <div
              onClick={item.onClick}
              key={item.text}
              className="flex items-center gap-x-3 px-[0.3125rem] py-2 hover:bg-[#e5e5e5] "
            >
              {item.icon}
              <span className="text-black text-xs leading-[125%] font-normal ">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      )}
    </th>
  );
};

export { ThSort };
