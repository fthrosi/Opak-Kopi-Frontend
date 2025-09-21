type PlusIconProps = {
  className?: string;
};

export default function PlusIcon({ className }: PlusIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 7H7V10H6V7H3V6H6V3H7V6H10V7Z" fill="currentColor" />
    </svg>
  );
}
