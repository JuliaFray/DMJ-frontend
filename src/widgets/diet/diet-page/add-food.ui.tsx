import React, { Dispatch, FC, SetStateAction, useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Collapse,
  Drawer,
  FormControl,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';

import { useAddFoodMutation, useLazyGetFoodListQuery } from 'shared/api';
import { theme } from 'shared/themes';
import { Meal, ProductItem } from 'shared/types';
import { Spinner } from 'shared/ui';

import styles from './diet.module.scss';

const drawerWidth = 600;

// eslint-disable-next-line no-shadow
enum Nutrients {
  calcium_100g = 'Кальций',
  carbohydrates_100g = 'Углеводы',
  'energy-kcal_100g' = 'Калории',
  fat_100g = 'Жиры',
  'fruits-vegetables-legumes-estimate-from-ingredients_100g' = 'Фрукты / овощи / бобовые',
  proteins_100g = 'Белки',
  salt_100g = 'Соль',
  sodium_100g = 'Кальций',
  'trans-fat_100g' = 'Трансжиры',
  'vitamin-b2_100g' = 'Витамин B2',
}

interface Props {
  openDrawer: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  day: number;
  meals: Meal[];
}

export const AddFood: FC<Props> = ({ openDrawer, setOpenDrawer, day, meals }) => {
  const { id } = useParams();

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<{ id: string; name: string } | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);

  const [getFoods, { data, isLoading }] = useLazyGetFoodListQuery();
  const [addFood] = useAddFoodMutation();

  const foods: ProductItem[] = useMemo(
    () => data?.data?.products?.filter((row) => !!Object.keys(row.nutriments).length) || [],
    [data],
  );

  const handleSearch = () => {
    getFoods({ query: search });
  };

  const handleClose = () => {
    setOpenDrawer(false);
    setSelected(null);
  };

  const handleAdd = () => {
    addFood({
      id: id!,
      foods: foods
        .filter((f) => checked.includes(f.id))
        .map((it) => ({
          name: it.product_name_ru || it.product_name,
          otherNutrients: it.nutriments,
          cal: it.nutriments['energy-kcal_100g'],
          proteins: it.nutriments.proteins_100g,
          fats: it.nutriments.fat_100g,
          carb: it.nutriments.carbohydrates_100g,
          day,
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

  return (
    <Drawer
      open={openDrawer}
      onClose={handleClose}
      anchor='right'
      variant='temporary'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          padding: '80px 10px 10px 10px',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Typography variant='h6'>Добавить продукт</Typography>

      <FormControl fullWidth style={{ display: 'flex', flexDirection: 'row' }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder='Введите название'
          inputProps={{ 'aria-label': 'Введите название' }}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <IconButton type='button' sx={{ p: '10px' }} aria-label='search' onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </FormControl>

      {isLoading && <Spinner />}

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {foods.map((f) => (
          <React.Fragment key={f.id}>
            <ListItem
              alignItems='flex-start'
              secondaryAction={
                expanded && selected?.id === f.id ? (
                  <ExpandLess
                    onClick={() => {
                      setExpanded(false);
                      setSelected(null);
                    }}
                  />
                ) : (
                  <ExpandMore
                    onClick={() => {
                      setExpanded(true);
                      setSelected({ id: f.id, name: f.product_name_ru || f.product_name });
                    }}
                  />
                )
              }
            >
              <ListItemIcon>
                <Checkbox
                  edge='start'
                  checked={checked.includes(f.id)}
                  tabIndex={-1}
                  disableRipple
                  onChange={() => {
                    handleToggle(f.id);
                  }}
                />
              </ListItemIcon>

              <ListItemAvatar>
                <Avatar src={f.image_front_thumb_url} alt='thumb' />
              </ListItemAvatar>

              <ListItemText
                primary={f.product_name_ru || f.product_name || 'Без названия'}
                secondary={
                  f.serving_quantity
                    ? `Порция ${f.serving_quantity}${f.serving_quantity_unit || 'g'}`
                    : ''
                }
              />
            </ListItem>
            <Collapse
              in={expanded && selected?.id === f.id}
              timeout='auto'
              unmountOnExit
              sx={{ marginBottom: '10px' }}
            >
              <TableContainer sx={{ borderRadius: '10px' }}>
                <Table aria-label='nutrients' className={styles.nutrients}>
                  <TableBody>
                    <TableRow sx={{ borderBottom: `3px solid ${theme.palette.secondary.main}` }}>
                      <TableCell>Порция</TableCell>
                      <TableCell align='right'>100g</TableCell>
                    </TableRow>

                    <TableRow sx={{ borderBottom: `3px solid ${theme.palette.secondary.main}` }}>
                      <TableCell>{Nutrients['energy-kcal_100g']}</TableCell>
                      <TableCell align='right'>{f.nutriments['energy-kcal_100g']}kcal</TableCell>
                    </TableRow>

                    <TableRow sx={{ borderBottom: `3px solid ${theme.palette.secondary.main}` }}>
                      <TableCell>{Nutrients.proteins_100g}</TableCell>
                      <TableCell align='right'>{f.nutriments.proteins_100g}g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{Nutrients.fat_100g}</TableCell>
                      <TableCell align='right'>{f.nutriments.fat_100g}g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{Nutrients.carbohydrates_100g}</TableCell>
                      <TableCell align='right'>{f.nutriments.carbohydrates_100g}g</TableCell>
                    </TableRow>

                    {Object.keys(f.nutriments)
                      .filter(
                        (it) =>
                          !!Nutrients[it] &&
                          ![
                            'proteins_100g',
                            'fat_100g',
                            'carbohydrates_100g',
                            'energy-kcal_100g',
                          ].includes(it),
                      )
                      .map((it) => (
                        <TableRow
                          key={it}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component='th' scope='row'>
                            {Nutrients[it]}
                          </TableCell>
                          <TableCell align='right'>{f.nutriments[it]}g</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Collapse>
            <Divider variant='inset' component='li' />
          </React.Fragment>
        ))}
      </List>

      <Box sx={{ alignSelf: 'end', position: 'fixed', bottom: '10px' }}>
        <Button onClick={handleClose}>Отмена</Button>
        <Button variant='contained' type='button' disabled={!checked.length} onClick={handleAdd}>
          Добавить
        </Button>
      </Box>
    </Drawer>
  );
};
