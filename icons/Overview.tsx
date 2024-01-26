import { IconProps } from "@/shared/contracts/icon";

export default function Overview({ className, active = false, ...rest }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} {...rest} viewBox="0 0 2048 2048"><path fill={active ? "var(--color-primary)" : "currentcolor"} d="M1408 512h512v512h-128V731l-576 575l-256-256l-704 705v37h1664v128H128V128h128v1445l704-703l256 256l485-486h-293V512z" /></svg>
  )
}


