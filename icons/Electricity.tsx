import { IconProps } from "@/shared/contracts/icon";

export default function Electricity({ className, active = false }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 16 16"><path fill={active ? "var(--color-primary)" : "currentcolor"} d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5zM6.374 1L4.168 8.5H7.5a.5.5 0 0 1 .478.647L6.78 13.04L11.478 7H8a.5.5 0 0 1-.474-.658L9.306 1H6.374z" /></svg>
  )
}