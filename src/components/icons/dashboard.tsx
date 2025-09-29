type dashboardIconProps = {
  className?: string;
};

export const DashboardIcon = ({ className }: dashboardIconProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 20 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 22.4375V7.82812L10 0.523438L20 7.82812V22.4375H12.5V13.9154H7.5V22.4375H0Z"
        fill="currentColor"
      />
    </svg>
  );
};
