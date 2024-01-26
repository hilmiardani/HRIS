import Edit from "@/icons/Edit";
import Trash from "@/icons/Trash";
import { Badge, Card, Group, Image, Text, Tooltip } from "@mantine/core";

interface PromoCardProps {
    image: string
    title: string
    type?: string
    amount: string
    description: string
    withBadge?: boolean
    onClickEdit?: () => void
    onClickDelete?: () => void
}

const PromoCard = ({ image, title, type, amount, description, withBadge, onClickEdit, onClickDelete }: PromoCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="h-full">
        <div className="flex justify-end absolute right-4 top-4 z-10 gap-2">
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
        <Card.Section style={{marginTop: "-20px"}}>
            <Image
            src= {image ? image : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"}
            height={160}
            alt="Norway"
            />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{title}</Text>
            {
                withBadge && <Badge color="pink">{type}</Badge>
            }
        </Group>

        <Text size="sm" c="dimmed">
            {type === 'PERCENTAGE' ? `${amount}%` : type === 'FIX' ? `Rp. ${amount}` : '-'}
        </Text>
        <Text size="sm" c="dimmed">
            {description}
        </Text>
    </Card>
  )
}

export default PromoCard