import React, {Dispatch, SetStateAction} from 'react';
import {Pagination} from '@mui/material';
import style from './custom-pagination.module.scss';

type TPagination = {
    page: number,
    dataLength: number,
    setCurrentPage: Dispatch<SetStateAction<number>>,
}

export const CustomPagination: React.FC<TPagination> = (props, context) => {
    const count: number = Math.ceil(props.dataLength / 20);

    const handleOnPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        props.setCurrentPage(page);
    }

    return (
        <div className={style.paginationWrapper} style={{display: count > 1 ? 'block' : 'none'}}>
            {count > 1 &&
                <Pagination className={style.pagination} siblingCount={1} page={props.page} onChange={handleOnPageChange}
                            boundaryCount={1} count={count} variant="outlined" color="primary"/>
            }
        </div>
    );

};
