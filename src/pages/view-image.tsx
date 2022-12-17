import React, { useEffect, useState } from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {ImageField, useRecordContext} from 'react-admin';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { API_URL } from '../variables/constant';
import {makeStyles} from "@material-ui/core/styles";


export const ViewImage = (props: any) => {
    const [open, setOpen] = useState(false);
    const record = useRecordContext(props);
    const handleClose = () => {
        setOpen(false);
    }
    const handleClickOpen = (e: any) => {
        e.stopPropagation();
        console.log(record,'dasd');
        if (!record?.image) {
            return;
        }
        setOpen(true);
    };
    return (
        <div>
            <img style={{width: "193px", height: '280px', objectFit: 'cover'}} src={`${API_URL}/files/download/images?file=${record?.image}`} alt=""/>
        </div>
    )
}
