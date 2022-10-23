// in posts.js
import * as React from "react";
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput } from 'react-admin';
import BookIcon from '@mui/icons-material/Book';
export const PostIcon = BookIcon;

export const UsersList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="email" />
            <TextField source="gender" />
            <EditButton />
        </Datagrid>
    </List>
);

export const UserEdit = () => (
    <Edit title={"Edit"}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput disabled source="email" />
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextField source="gender" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = () => (
    <Create title="Create a Post">
        <SimpleForm>
            <TextInput source="email" />
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextField source="gender" />
        </SimpleForm>
    </Create>
);