import React, { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react';

import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useParams } from 'react-router-dom';

import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Drawer,
  Group,
  Input,
  LoadingOverlay,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';

import { useAddFoodToDietPlanMutation, useLazyGetFoodListQuery } from 'shared/api';
import { MealsOptions, ProductItem } from 'shared/types';
import { CustomPagination } from 'shared/ui';

interface Props {
  openDrawer: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  day: number;
  meals: MealsOptions[];
}

export const AddFood: FC<Props> = ({ openDrawer, setOpenDrawer, day, meals }) => {
  const { id } = useParams();

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<{ id: string; name: string } | null>(null);
  const [checked, setChecked] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [getFoods, { data, isLoading }] = useLazyGetFoodListQuery();
  const [addFood] = useAddFoodToDietPlanMutation();

  const foods: ProductItem[] = useMemo(
    () => data?.data?.filter((row) => !!row.nutrients && !!Object.keys(row.nutrients).length) || [],
    [data],
  );

  useEffect(() => {
    if (search) {
      getFoods({ query: search, page: currentPage });
    }
  }, [currentPage, getFoods]);

  const handleSearch = () => {
    getFoods({ query: search, page: currentPage });
  };

  const handleClose = () => {
    setOpenDrawer(false);
    setSelected(null);
  };

  const handleAdd = () => {
    addFood({
      id: id!,
      day,
      foods: foods
        .filter((f) => checked.includes(f.id))
        .map((it) => ({
          id: it.id,
          meals,
        })),
    });
    handleClose();
  };

  const handleToggle = (value: string) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const concatNutrients = (food: ProductItem) => {
    return `К: ${food.nutrients.calories}, Б: ${food.nutrients.proteins}, Ж: ${
      food.nutrients.fats
    }, У: ${food.nutrients.carbs}`;
  };

  return (
    <Drawer
      offset={8}
      radius='md'
      opened={openDrawer}
      onClose={handleClose}
      title={<Text>Добавить продукты</Text>}
      position='right'
      // scrollAreaComponent={ScrollArea.Autosize}
      styles={{
        content: { position: 'relative', top: '64px', height: 'calc(100vh - 84px)' },
      }}
    >
      <Stack style={{ height: '100%', position: 'relative' }}>
        <Group wrap='nowrap' style={{ width: '100%' }}>
          <Input.Wrapper style={{ height: '80px', width: '100%' }} label='Введите название'>
            <Input value={search} onChange={(e) => setSearch(e.target.value)} />
          </Input.Wrapper>

          <ActionIcon variant='transparent' onClick={handleSearch} color='teal'>
            <MagnifyingGlassIcon size={24} weight='light' />
          </ActionIcon>
        </Group>

        <ScrollArea h='calc(80vh - 94px)' offsetScrollbars style={{ position: 'relative' }}>
          <LoadingOverlay
            visible={isLoading}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'teal', type: 'bars' }}
          />
          {foods.map((f) => (
            <Stack>
              <Group wrap='nowrap'>
                <Checkbox checked={checked.includes(f.id)} onChange={() => handleToggle(f.id)} />
                <Stack key={f.id}>
                  <Text>{f.name}</Text>
                  <Text c='dimmed' size='sm'>
                    {concatNutrients(f)}
                  </Text>
                </Stack>
              </Group>
              <Divider />
            </Stack>
          ))}
        </ScrollArea>

        <Box style={{ alignSelf: 'center', position: 'fixed', bottom: '50px' }}>
          <CustomPagination
            page={currentPage}
            dataLength={data?.totalCount ?? 0}
            setCurrentPage={setCurrentPage}
          />
        </Box>

        <Group style={{ alignSelf: 'end', position: 'fixed', bottom: '10px' }}>
          <Button variant='default' onClick={handleClose}>
            Отмена
          </Button>
          <Button variant='filled' type='button' disabled={!checked.length} onClick={handleAdd}>
            Добавить
          </Button>
        </Group>
      </Stack>
    </Drawer>
  );
};
