import React from 'react'
import {Link} from 'react-router-dom'
import {pathKeys} from 'shared/lib/react-router'
import styles from './page-404.module.scss'

export const Page404 = () => {
    return (
        <div className={styles.outer}>
            <div className={styles.inner}>
                <div>
                    <h1 className="logo-font">Страница не найдена</h1>
                    <p>Кажется, что-то пошло нет так! <br/>Страница, которую вы запрашиваете, не существует.
                        Возможно она устарела, была удалена или был введен неверный адрес в адресной строке.</p>
                    <Link to={pathKeys.home()} className={styles.home}>
                        Перейти на главную
                    </Link>
                </div>
            </div>
        </div>
    )
}
