import React from 'react'

import {ArticlesFeedSkeleton} from "widgets";

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export function ProfilePageSkeleton() {
    return (
        <div className="home-page">
            <Stack
                direction="row"
                alignItems="center"
                spacing={10}
            >
                <Skeleton variant="circular" width={150} height={150}/>

                <Stack>
                    <Skeleton
                        variant="text"
                        width={200}
                        height={50}
                    />
                    <Skeleton
                        variant="text"
                        width={200}
                        height={50}
                    />
                </Stack>
            </Stack>

            <ArticlesFeedSkeleton/>
        </div>
    )
}
