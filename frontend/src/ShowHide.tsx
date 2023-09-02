import { Box, Zoom } from "@mui/material";
import { ReactElement, ReactNode } from "react";

export default function ShowHide (props: {children: ReactElement, in: boolean}) {
    if (props.in) {
        return (
            <Zoom in={props.in}>
                {props.children}
            </Zoom>
        )
    } else {
        return null;
    }

}