import React, {useState} from "react";
import {fetchUtils, useRecordContext} from "react-admin";
import {API_URL} from "../variables/constant";

export const ButtonReCrawl = (props: any) => {
    const [open, setOpen] = useState(false);
    const record = useRecordContext(props);

    const handleClick = async (e: any) => {
        e.stopPropagation();
        const id = record.id;
        const url = `${API_URL}/novel/${id}/reCrawl`;
        const options: any = {};
        if (!options.headers) {
            options.headers = new Headers({Accept: 'application/json'});
        }
        const token = localStorage.getItem('token');
        options.headers.set('Authorization', `Bearer ${token}`);
        const data = await fetchUtils.fetchJson(url, options);
    };
    return (
        <button onClick={handleClick} style={{color: 'blue'}}>
            Update
        </button>
)
}