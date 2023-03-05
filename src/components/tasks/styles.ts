import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  task: {
    "&:hover": {
      backgroundColor: theme.colors.gray[0],
    },
  },
}));
