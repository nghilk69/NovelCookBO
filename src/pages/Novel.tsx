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
import {API_URL, Status} from "../variables/constant";
import {ViewImage} from "./view-image";
export const PostIcon = BookIcon;
const ImagesShowInTable = (props: any) => {
    return props?.record?.image?.length > 0 ? (
        <div className="d-flex align-items-center justify-content-center">
            <img src={`${API_URL}/Containers/images/download/${props?.record?.image}`} alt="" className="custom-image"/>
        </div>
    ): null;
};

export const NovelList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="uniqueName" />
            <TextField source="author" />
            <TextField source="description" />
            <TextField source="status" />
            <TextField source="sourceLink" />
            <TextField source="bookmarked" />
            <TextField source="active" />
            <ViewImage
                label={'Image'}
                source="image"
                containerId="images"
            />
            <EditButton />
        </Datagrid>
    </List>
);

export const NovelEdit = () => (
    <Edit title={"Edit"}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="uniqueName" />
            <TextInput source="author" />
            <TextInput source="description" />
            <SelectInput
                source="status"
                choices={[
                    {id: 'Ongoing', status: 'Ongoing' },
                    {id:'Complete', status: 'Complete' },
                ]}
            />
            <TextInput source="sourceLink" />
            <BooleanInput source="active" />
            <FileInput source="image" label="Image Novel" accept="image/*">
                <ImageField source="image" title="image" />
            </FileInput>
        </SimpleForm>
    </Edit>
);

export const NovelCreate = () => (
    <Create title="Create a Post">
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="uniqueName" />
            <TextInput source="author" />
            <TextInput source="description" />
            <SelectInput
                source="status"
                choices={[
                    {id: 'Ongoing', name: 'Ongoing' },
                    {id: 'Complete', name: 'Complete' },
                ]}
            />
            <TextInput source="sourceLink" />
            <FileInput source="image" label="Related files" accept="image/*">
                <FileField source="image" title="image" />
            </FileInput>
        </SimpleForm>
    </Create>
);