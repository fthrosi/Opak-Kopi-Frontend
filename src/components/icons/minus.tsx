type MinusIconProps = {
  className?: string;
};

export default function MinusIcon({ className }: MinusIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.5 6.49902H2.5V5.49902H9.5V6.49902Z" fill="currentColor" />
    </svg>
  );
}
