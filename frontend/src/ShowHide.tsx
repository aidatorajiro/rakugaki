import { Zoom } from "@mui/material";
import { ReactElement } from "react";

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