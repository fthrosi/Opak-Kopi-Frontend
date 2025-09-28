type baruIconProps = {
  className?: string;
};

export default function BaruIcon({ className }: baruIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.11 9.32658L6 8.13127L7.89 9.34231L7.395 7.07751L9.06 5.56764L6.87 5.36318L6 3.2242L5.13 5.34745L2.94 5.55191L4.605 7.07751L4.11 9.32658ZM2.295 11.9531L3.27 7.53361L0 4.56106L4.32 4.16787L6 0L7.68 4.16787L12 4.56106L8.73 7.53361L9.705 11.9531L6 9.60968L2.295 11.9531Z"
        fill="currentColor"
      />
    </svg>
  );
}
