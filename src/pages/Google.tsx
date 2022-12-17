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
    TextInput
} from 'react-admin';


export const GoogleList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="domain" />
            <TextField source="codeAnalytics" />
            <TextField source="codeAds" />
            <EditButton />
        </Datagrid>
    </List>
);

export const GoogleEdit = () => (
    <Edit title={"Edit"}>
        <SimpleForm redirect="/google">
            <TextInput source="domain" />
            <TextInput source="codeAnalytics" />
            <TextInput source="codeAds" />
        </SimpleForm>
    </Edit>
);

export const GoogleCreate = () => (
    <Create title="Create a review">
        <SimpleForm redirect="/review">
            <TextInput source="domain" />
            <TextInput source="codeAnalytics" />
            <TextInput source="codeAds" />
        </SimpleForm>
    </Create>
);