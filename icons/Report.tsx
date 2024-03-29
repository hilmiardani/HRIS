import { IconProps } from "@/shared/contracts/icon";

export default function Report({ className, active = false }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 256 256"><path fill={active ? "var(--color-primary)" : "currentcolor"} d="M90 96a6 6 0 0 1 6-6h64a6 6 0 0 1 0 12H96a6 6 0 0 1-6-6Zm6 38h64a6 6 0 0 0 0-12H96a6 6 0 0 0 0 12Zm32 20H96a6 6 0 0 0 0 12h32a6 6 0 0 0 0-12Zm94-106v108.69a13.94 13.94 0 0 1-4.1 9.9l-51.31 51.31a13.94 13.94 0 0 1-9.9 4.1H48a14 14 0 0 1-14-14V48a14 14 0 0 1 14-14h160a14 14 0 0 1 14 14ZM48 210h106v-50a6 6 0 0 1 6-6h50V48a2 2 0 0 0-2-2H48a2 2 0 0 0-2 2v160a2 2 0 0 0 2 2Zm153.52-44H166v35.52Z" /></svg>
    )
}