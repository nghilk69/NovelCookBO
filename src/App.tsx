import React from 'react';
import logo from './logo.svg';
import './App.css';
import {fetchUtils, Resource, Admin, ListGuesser} from 'react-admin';
import crudProvider from '@fusionworks/ra-data-nest-crud'
import authProvider from "./auth/authProvider";
import {UserCreate, UserEdit, UsersList} from "./pages/Users";
import {MyLoginPage} from "./auth/login";
import apiClient from "./api"
import {API_URL} from "./variables/constant";
import {NovelCreate, NovelEdit, NovelList} from "./pages/Novel";


export const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
}
const withUpload = (requestHandler: (type: any, resource: any, params: any) => any) =>
    async (type: string, resource: string, params: { data: any, previousData: any }) => {
        if(resource === 'novel' && (type === 'UPDATE' || type === 'CREATE')) {
            const { image, ...data } = params.data;
            // if (!pictures) {
            //     return Promise.resolve({ data: params.previousData })
            // }
            if (!image) {
                return requestHandler(type, resource, params);
            }

            // const formData = new FormData();
            // formData.append('file', pictures.rawFile);
            // const json = await fetchJson(`${API_URL}/Containers/reseves/upload`, { method: 'POST', body: formData });
            if (image && image.rawFile) {
                let images: any = [];
                if (data.image && data.image.length > 0) {
                    images = data.image;
                }
                const formData = new FormData();
                formData.append('files', image.rawFile);
                const imagesJson = await fetchUtils.fetchJson(`${API_URL}/files/upload/images`, {
                    method: 'POST',
                    body: formData
                })
                images.push(imagesJson.json.filename);
                return requestHandler(type, resource, {
                    ...params, data: {
                        ...data,
                        image: images[0],
                        timeStamp: (new Date().getTime())
                    }
                });
            }
        }
        return requestHandler(type, resource, params);
    };
const App = () => (
    <Admin
        loginPage={MyLoginPage}
        dataProvider={withUpload(apiClient())}
        authProvider={authProvider}>
        <Resource name="users" list={UsersList} create={UserCreate} edit={UserEdit} />
        <Resource name="novel" list={NovelList} create={NovelCreate} edit={NovelEdit} />
    </Admin>
);

export default App;
