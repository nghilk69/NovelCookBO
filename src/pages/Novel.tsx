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
    SelectInput, FileField, FileInput, BooleanInput, SelectArrayInput
} from 'react-admin';
import BookIcon from '@mui/icons-material/Book';
import { ImageField } from "react-admin";
import {API_URL, Status} from "../variables/constant";
import {ViewImage} from "./view-image";
import { ReferenceInput } from "react-admin";
import { ReferenceArrayInput } from "react-admin";
import { useCreate } from "react-admin";
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
        <SimpleForm redirect="/novel">
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="author" />
            <TextInput source="description" />
            <SelectInput
                source="status"
                choices={[
                    {id: 'Ongoing', status: 'Ongoing' },
                    {id:'Complete', status: 'Complete' },
                ]}
            />
            <ReferenceArrayInput source="tags"
                                 perPage={null}
                                 reference="tag"
                                 label="tags"
                                 sort={{field: "name", order: "DESC"}}
                                 fullWidth>
                <SelectArrayInput optionText="name"/>
            </ReferenceArrayInput>
            <ReferenceArrayInput source="categories"
                                 perPage={null}
                                 reference="category"
                                 label="Categories"
                                 sort={{field: "name", order: "DESC"}}
                                 fullWidth>
                <SelectArrayInput optionText="name"/>
            </ReferenceArrayInput>
            <TextInput source="sourceLink" />
            <BooleanInput source="active" />
            <FileInput source="image" label="Image Novel" accept="image/*">
                <ImageField source="image" title="image" />
            </FileInput>
        </SimpleForm>
    </Edit>
);

export const NovelCreate = () => {
    const [create] = useCreate();
    const postSave = (data: any) => {

        const sender = {
            name: data.name,
            description: data.description,
            author: data.author,
            status: data.status,
            active: data.active,
            sourceLink: data.sourceLink,
            tags: data.tags.map((value: any) => value.name),
            categories: data.categories.map((value: any) => value.name),
            image: data.image
        }
        create('novel', { sender });
    };
    return (<Create title="Create a Novel">
        <SimpleForm redirect="/novel" >
            <TextInput source="name"/>
            <TextInput source="author"/>
            <TextInput source="description"/>
            <SelectInput
                source="status"
                choices={[
                    {id: 'Ongoing', name: 'Ongoing'},
                    {id: 'Complete', name: 'Complete'},
                ]}
            />
            <ReferenceArrayInput source="tags"
                                 perPage={null}
                                 reference="tag"
                                 label="tags"
                                 sort={{field: "name", order: "DESC"}}
                                 fullWidth>
                <SelectArrayInput optionText="name"/>
            </ReferenceArrayInput>
            <ReferenceArrayInput source="categories"
                                 perPage={null}
                                 reference="category"
                                 label="Categories"
                                 sort={{field: "name", order: "DESC"}}
                                 fullWidth>
                <SelectArrayInput optionText="name"/>
            </ReferenceArrayInput>
            <TextInput source="sourceLink"/>
            <FileInput source="image" label="Related files" accept="image/*">
                <FileField source="image" title="image"/>
            </FileInput>
        </SimpleForm>
    </Create>)
};