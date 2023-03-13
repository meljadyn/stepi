import { useState } from "react";
import { Navbar } from "@mantine/core";
import {
  IconSettings,
  IconHome,
  IconCategory,
  IconSwitchHorizontal,
  IconLogout,
  IconCirclePlus,
} from "@tabler/icons";
import { signOut } from "next-auth/react";
import { useSidebarStyles } from "./styles";

const data = [
  { link: "/dashboard", label: "Home", icon: IconHome },
  { link: "/projects/new", label: "New Project", icon: IconCirclePlus },
  { link: "/projects", label: "Projects", icon: IconCategory },
  { link: "", label: "Other Settings", icon: IconSettings },
];

type Props = {
  active: string;
};

export function Sidebar(props: Props) {
  const { classes, cx } = useSidebarStyles();
  const [active, setActive] = useState(props.active || "Home");

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar
      height={"100vh"}
      width={{ sm: 220 }}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section grow>{links}</Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={() => signOut()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}

export default Sidebar;
