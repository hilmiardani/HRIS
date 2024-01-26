interface ButtonIconProps {
  icon: React.ReactNode;
  className?: string;
  onClick?: () => void;
  label: string;
  iconOnly?: boolean;
}
export type ButtonProps = Omit<ButtonIconProps, "icon" | "label">;
export default function ButtonIcon({
  icon,
  onClick = () => {},
  className = "",
  label,
  iconOnly = false,
}: ButtonIconProps) {
  return (
    <button
      className={`text-secondary flex flex-row gap-2 items-center ${className}`}
      onClick={onClick}
    >
      {icon}
      {!iconOnly && <span>{label}</span>}
    </button>
  );
}
