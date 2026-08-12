import { useMantineTheme } from '@mantine/core';

export function useRandomColor() {
  const theme = useMantineTheme();

  // Extract all available color names (e.g., 'blue', 'red', 'teal')
  const colorNames = Object.keys(theme.colors);

  // Select a random name and a random shade index (0 to 9)
  const getRandomThemeColor = () => {
    const randomName = colorNames[Math.floor(Math.random() * colorNames.length)];
    const randomShade = Math.floor(Math.random() * 10);

    // Returns format like "blue.6"
    return `${randomName}.${randomShade}`;
  };

  return { getRandomThemeColor };
}
