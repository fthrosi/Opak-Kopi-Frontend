type restNowProps = {
  className?: string;
};

export default function ResNow({ className }: restNowProps) {
  return (
    <svg
        className={className}
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.73529 15H2.52941C2.12379 15 1.73477 14.8361 1.44795 14.5444C1.16113 14.2527 1 13.857 1 13.4444V4.11111C1 3.69855 1.16113 3.30289 1.44795 3.01117C1.73477 2.71944 2.12379 2.55556 2.52941 2.55556H11.7059C12.1115 2.55556 12.5005 2.71944 12.7873 3.01117C13.0742 3.30289 13.2353 3.69855 13.2353 4.11111V8.77778M10.1765 1V4.11111M4.05882 1V4.11111M1 7.22222H13.2353M9.41177 13.4444L10.9412 15L14 11.8889"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
