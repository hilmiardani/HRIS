// ProfileCard.tsx
import React from 'react';
import { Avatar, Group, Text } from "@mantine/core";
import { IconAt, IconPhoneCall } from "@tabler/icons-react";

interface ProfileCardProps {
  name: string;
  role: string;
  email: string;
  phone: string;
  avatarSrc: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, role, email, phone, avatarSrc }) => (
  <Group wrap="nowrap">
    <Avatar src={avatarSrc} size={94} radius="md" />
    <div>
      <Text fz="lg" fw={700} c="white">
        {name}
      </Text>

      <Text fz="xs" tt="uppercase" fw={500} c="white">
        {role}
      </Text>

      <Group wrap="nowrap" gap={10} mt={3}>
        <IconAt stroke={1.5} size="1rem" />
        <Text fz="xs" c="white">
          {email}
        </Text>
      </Group>

      <Group wrap="nowrap" gap={10} mt={5}>
        <IconPhoneCall stroke={1.5} size="1rem" />
        <Text fz="xs" c="white">
          {phone}
        </Text>
      </Group>
    </div>
  </Group>
);

export default ProfileCard;