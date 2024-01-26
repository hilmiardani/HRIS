import Edit from "@/icons/Edit";
import Trash from "@/icons/Trash";
import { ribu } from "@/shared/support/formater";
import { Card, Paper, Text, Tooltip } from "@mantine/core";

interface RateCardProps {
    name: string
    price: number
    onClickEdit?: () => void
    onClickDelete?: () => void
}

const RateCard = ({ name, price, onClickEdit, onClickDelete }: RateCardProps) => {
  return (
    <>
        <Paper shadow="sm" radius="md" withBorder p="xl">
            <div className="flex justify-end right-4 top-4 z-10 gap-2">
                <Tooltip label="Edit">
                    <button onClick={onClickEdit}>
                        <Edit className="w-6 cursor-pointer"/>
                    </button>
                </Tooltip>
                <Tooltip label="Delete">
                    <button onClick={onClickDelete}>
                        <Trash className="w-5 cursor-pointer"/>
                    </button>
                </Tooltip>
            </div>
            <Text>Name: {name}</Text>
            <Text>Price: Rp. {ribu(price)}</Text>
        </Paper>
    </>
  )
}

export default RateCard