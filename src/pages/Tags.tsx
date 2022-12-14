// in posts.js
import * as React from "react";
import {
    List,
    Datagrid,
    Edit,
    Create,
    SimpleForm,
    TextField,
    EditButton,
    TextInput,
} from 'react-admin';


export const TagsList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <EditButton />
        </Datagrid>
    </List>
);

export const TagsEdit = () => (
    <Edit title={"Edit"}>
        <SimpleForm redirect="/tag">
            <TextInput source="name" />
            <TextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const TagsCreate = () => (
    <Create title="Create a Tag">
        <SimpleForm redirect="/tag">
            <TextInput source="name" />
            <TextInput source="description" />
        </SimpleForm>
    </Create>
);