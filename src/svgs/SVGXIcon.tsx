import React from "react";

interface SVGXIconProps {
  children?: Element;
  className?: string;
  onClick?: () => void;
}

const SVGXIcon: React.FC<SVGXIconProps> = ({ className, onClick }) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5254 12.5254C11.8183 13.2326 10.9994 12.4136 10.687 12.1012L7.99996 9.41417L5.31296 12.1012C5.00054 12.4136 4.18158 13.2326 3.47447 12.5254C2.76737 11.8183 3.58632 10.9994 3.89874 10.687L6.58575 7.99996L3.89874 5.31295C3.58632 5.00053 2.76736 4.18159 3.47447 3.47448C4.18158 2.76736 5.00054 3.58632 5.31296 3.89874L7.99996 6.58574L10.687 3.89874C10.9994 3.58632 11.8183 2.76737 12.5254 3.47448C13.2325 4.18158 12.4136 5.00053 12.1012 5.31295L9.41418 7.99996L12.1012 10.687C12.4136 10.9994 13.2326 11.8183 12.5254 12.5254Z"
        fill="#102A47"
      />
    </svg>
  );
};

export { SVGXIcon };
