import Trash from "icons/Trash";
import ButtonIcon, { ButtonProps } from "./ButtonIcon";

export default function ButtonDelete(props: ButtonProps) {
  return <ButtonIcon icon={<Trash />} label="Delete" {...props} />
}
