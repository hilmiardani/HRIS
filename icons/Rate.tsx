import { IconProps } from "@/shared/contracts/icon";

export default function Rate({ className, active = false }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 48 48"><g fill="none" stroke={active ? "var(--color-primary)" : "currentcolor"} strokeWidth="2"><path d="M42 8H6a2 2 0 0 0-2 2v28a2 2 0 0 0 2 2h36a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2Z" /><path strokeLinecap="round" d="M24 17v14m8-7v7m-16-9v9" /></g></svg>
    )
}

