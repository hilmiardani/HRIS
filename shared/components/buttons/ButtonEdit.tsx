import Edit from "icons/Edit";
import ButtonIcon, { ButtonProps } from "./ButtonIcon";

export default function ButtonEdit(props: ButtonProps) {
  return <ButtonIcon icon={<Edit />} label="Edit" {...props} />
}
