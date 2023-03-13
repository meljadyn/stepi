import { Button, Group, Text } from "@mantine/core";
import Link from "next/link";
import { useStyles } from "./styles";

function StepiLogo({ size }: { size: number }) {
  const { classes } = useStyles();
  return (
    <Link href="/dashboard" className={classes.link}>
      <Group>
        <img height={size} src="/stepi.png" className={classes.logo} />
        <Text size={size - 2} className={classes.text}>
          Stepi
        </Text>
      </Group>
    </Link>
  );
}

export default StepiLogo;
