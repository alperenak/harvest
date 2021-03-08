import * as React from "react";

function SvgPopupClose(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 30 30"
      {...props}
    >
      <g transform="translate(-329 -175)">
        <rect
          width={30}
          height={30}
          fill="#d5d4d9"
          rx={15}
          transform="translate(329 175)"
        />
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M347.034 184.51l-3.036 3.032-3.036-3.034a1.735 1.735 0 10-2.452 2.455l3.035 3.036-3.033 3.033a1.738 1.738 0 102.457 2.458l3.029-3.039 3.034 3.035a1.737 1.737 0 102.456-2.456l-3.03-3.029 3.033-3.033a1.738 1.738 0 10-2.457-2.458z"
        />
      </g>
    </svg>
  );
}

export default SvgPopupClose;
