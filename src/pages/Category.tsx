// in posts.js
import * as React from "react";
import {
    List,
    Datagrid,
    Edit,
    Create,
    SimpleForm,
    DateField,
    TextField,
    EditButton,
    TextInput,
    DateInput,
    SelectInput, FileField, FileInput, BooleanInput
} from 'react-admin';
import BookIcon from '@mui/icons-material/Book';
import { ImageField } from "react-admin";
import {API_URL} from "../variables/constant";
import {ViewImage} from "./view-image";
export const PostIcon = BookIcon;


export const CategoryList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <EditButton />
        </Datagrid>
    </List>
);

export const CategoryEdit = () => (
    <Edit title={"Edit"}>
        <SimpleForm redirect="/category">
            <TextInput source="name" />
            <TextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const CategoryCreate = () => (
    <Create title="Create a Category">
        <SimpleForm redirect="/category">
            <TextInput source="name" />
            <TextInput source="description" />
        </SimpleForm>
    </Create>
);