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
    TextInput, ImageField, FileInput,
} from 'react-admin';
import {ViewImage} from "./view-image";


export const ReviewList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="review" />
            <ViewImage
                label={'Image'}
                source="image"
                containerId="images"
            />
            <EditButton />
        </Datagrid>
    </List>
);

export const ReviewEdit = () => (
    <Edit title={"Edit"}>
        <SimpleForm redirect="/review">
            <TextInput source="name" />
            <TextInput source="review" />
            <FileInput source="image" label="Image Novel" accept="image/*">
                <ImageField source="image" title="image" />
            </FileInput>
        </SimpleForm>
    </Edit>
);

export const ReviewCreate = () => (
    <Create title="Create a review">
        <SimpleForm redirect="/review">
            <TextInput source="name" />
            <TextInput source="review" />
            <FileInput source="image" label="Image Novel" accept="image/*">
                <ImageField source="image" title="image" />
            </FileInput>
        </SimpleForm>
    </Create>
);