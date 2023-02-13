import { Group, Text } from "@mantine/core";

function StepiLogo({ size }: { size: number }) {
  return (
    <Group>
      <img height={size} src="/stepi.png" />
      <Text size={size - 2} color="indigo">
        Stepi
      </Text>
    </Group>
  );
}

export default StepiLogo;
