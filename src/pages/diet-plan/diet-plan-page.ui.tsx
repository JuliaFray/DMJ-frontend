import React from "react"
import {Grid, useMediaQuery} from "@mui/material";
import {theme} from "shared/themes/theme";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "shared/hook/hooks";
import {useGetOneDietQuery} from "shared/api/diet-api";

export const DietPlanPage: React.FC = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();

    const isMore1200px = useMediaQuery(theme.breakpoints.up('lg'));
    const mdMain = isMore1200px ? 9 : 12;
    const mdSide = 3;

    const {data, error, isLoading} = useGetOneDietQuery(id);
    console.log(data)

    return <Grid container spacing={2}>
        <Grid item md={mdMain}>

        </Grid>

    </Grid>
}
