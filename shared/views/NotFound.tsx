'use client';

import { Center, Title } from "@mantine/core";

export default function NotFound() {
  return (
    <Center className="flex flex-col justify-center h-full text-gray-500 py-20">
      <Title>Not Found</Title>
      <p>Halaman tidak tersedia</p>
    </Center>
  );
}
