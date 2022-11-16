import {
  Box, Flex, Button, useColorMode, useColorModeValue, IconButton
} from '@chakra-ui/react'
import { FaSun, FaMoon } from "react-icons/fa";

export default function Sidebar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const sidebarGradient = useColorModeValue(
    'linear(to-b, orange.100, purple.300)',
    'linear(to-b, gray.700, teal.700, teal.900, gray.900)'
  );
  const darkModeIcon = useColorModeValue(<FaMoon />, <FaSun />);

  return (
    <Box {...styles.main} bgGradient={sidebarGradient}>
      <Flex {...styles.flex}>
        <IconButton onClick={toggleColorMode} aria-label="color-theme" icon={darkModeIcon} />
        <Button {...styles.link}>Home</Button>
      </Flex>
    </Box>
  )
}

const styles: any = {
  main: {
    position: 'absolute',
    top: '10px',
    left: '20px',
    height: '70vh',
    width: '280px',
    shadow: 'lg',
    borderRadius: '20px',
  },
  flex: {
    direction: 'column',
    justify: 'flex-end',
    align: 'center'
  },
  link: {
    variant: 'link',
    color: 'white',
  }
}
