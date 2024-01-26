import { IconProps } from "@/shared/contracts/icon";

export default function Property({className, active = false} : IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24"><path fill="none" stroke={active ? "var(--color-primary)" : "currentcolor"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 21h18M9 8h1m-1 4h1m-1 4h1m4-8h1m-1 4h1m-1 4h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/></svg>
    )
}