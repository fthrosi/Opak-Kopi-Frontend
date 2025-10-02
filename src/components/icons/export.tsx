type exportIconProps = {
  className?: string;
};

export const ExportIcon = ({ className }: exportIconProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_870_7239"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="20"
      >
        <path
          d="M9.5 1L15 6.5V18C15 18.55 14.55 19 14 19H2C1.45 19 1 18.55 1 18V2C1 1.45 1.45 1 2 1H9.5Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 1.5V6H15L10.5 1.5Z"
          fill="black"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 1L15 6.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M4 14L7 11L5 9H12V16L10 14L7 17L4 14Z" fill="black" />
      </mask>
      <g mask="url(#mask0_870_7239)">
        <path d="M20 -2H-4V22H20V-2Z" fill="#DE962C" />
      </g>
    </svg>
  );
};
