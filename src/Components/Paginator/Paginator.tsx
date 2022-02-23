import React, {useState} from 'react';
import StyleSheet from './Paginator.module.css';
import cn from "classnames";

type PropsType = {
    totalItemsCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (page: number) => void,
    partSize?: number
}

const Paginator: React.FC<PropsType> = ({
    totalItemsCount, pageSize, currentPage, onPageChanged, partSize = 10
}) => {
    let pagesCount: number = Math.ceil(totalItemsCount / pageSize);

    let pages: Array<number> = [];
    for(let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let partCount: number = Math.ceil(pagesCount / partSize);
    let [partNumber, setPartNumber] = useState<number>(1);
    let leftPartPageNumber: number = (partNumber - 1) * partSize + 1;
    let rightPartPageNumber: number = partNumber * partSize;

    return (
        <div className={StyleSheet.paginator}>
            <div className={StyleSheet.pages}>
                {(partNumber > 1) ? <button className={StyleSheet.btn} onClick={() => {
                    setPartNumber(partNumber - 1)
                }}>PREV</button> : <button disabled className={StyleSheet.dsblbtn}>PREV</button>}

                {pages
                    .filter(p => p >= leftPartPageNumber && p <= rightPartPageNumber)
                    .map(p => {
                        return <span className={cn({[StyleSheet.selectedPage]: currentPage === p}, StyleSheet.pageNumber)}
                                     key={p} onClick={(e) => {onPageChanged(p)}}>{p}</span>
                    })}

                {(partCount > partNumber) ? <button className={StyleSheet.btn} onClick={() => {
                    setPartNumber(partNumber + 1)
                }}>NEXT</button> : <button disabled className={StyleSheet.dsblbtn}>NEXT</button>}
            </div>

        </div>
    )
};

export default Paginator;
