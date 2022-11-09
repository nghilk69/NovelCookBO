import { stringify } from 'query-string';
import {API_URL} from '../variables/constant'
import {
    CREATE,
    DELETE,
    DELETE_MANY,
    GET_LIST,
    GET_MANY,
    GET_MANY_REFERENCE,
    GET_ONE,
    UPDATE,
    UPDATE_MANY
} from 'react-admin';
import {httpClient} from "../App";

export * from '../auth/authProvider';

export default (apiUrl = API_URL) => {
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertDataRequestToHTTP = (type: string, resource: string, params: any) => {
        let url = '';
        const options: any = {};
        const specialParams = ['pagination', 'sort', 'filter'];
        switch (type) {
            case GET_LIST: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query: any = {};
                query['where'] = { ...params.filter };
                if (field) query['order'] = [field + ' ' + order];
                if (perPage >= 0) query['limit'] = perPage;
                if ((perPage > 0) && (page >= 0)) query['skip'] = (page - 1) * perPage;

                Object.keys(params).forEach(key => {
                    if (!specialParams.includes(key) && params[key] !== undefined)
                        query[key] = params[key];
                });
                url = `${apiUrl}/${resource}?${stringify({ filter: JSON.stringify(query) })}`;
                break;
            }
            case GET_ONE:
                url = `${apiUrl}/${resource}/${params.id}`;
                break;
            case GET_MANY: {
                const listId = params.ids.map((id: any) => {
                    return { id };
                });

                let query = '';
                if (listId.length > 0) {
                    const filter = {
                        where: { or: listId }
                    };
                    query = `?${stringify({ filter: JSON.stringify(filter) })}`;
                }
                url = `${apiUrl}/${resource}${query}`;
                break;
            }
            case GET_MANY_REFERENCE: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query: any = {};
                query['where'] = { ...params.filter };
                query['where'][params.target] = params.id;
                if (field) query['order'] = [field + ' ' + order];
                if (perPage >= 0) query['limit'] = perPage;
                if ((perPage > 0) && (page >= 0)) query['skip'] = (page - 1) * perPage;

                Object.keys(params).forEach(key => {
                    if (!specialParams.includes(key) && params[key] !== undefined)
                        query[key] = params[key];
                });

                url = `${apiUrl}/${resource}?${stringify({ filter: JSON.stringify(query) })}`;
                break;
            }
            case UPDATE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'PATCH';
                options.body = JSON.stringify(params.data);
                break;
            case CREATE:
                url = `${apiUrl}/${resource}`;
                options.method = 'POST';
                options.body = JSON.stringify(params.data);
                break;
            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'DELETE';
                break;
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        return { url, options };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} Data response
     */
    const convertHTTPResponse = (response: any, type: string, resource: string, params: any) => {
        const { headers, json } = response;
        switch (type) {
            case GET_LIST:
                console.log(json)
                if (json) {
                    // if (params && params.sort && params.sort.field && params.sort.field === 'name') {
                    //     return { data: json[0]};
                    // }
                    return  { data: json[0], total: json[1] };
                }
                break;
            case GET_MANY:
                console.log(json, 'getMany');
                if (json) {
                    // if (params && params.sort && params.sort.field && params.sort.field === 'name') {
                    //     return { data: json[0]};
                    // }
                    return  { data: json[0], total: json[1] };
                }
                break
            case GET_MANY_REFERENCE:
                if (!headers.has('content-range')) {
                    throw new Error(
                        'The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?'
                    );
                }
                return {
                    data: json,
                    total: parseInt(
                        headers
                            .get('content-range')
                            .split('/')
                            .pop(),
                        10
                    )
                };
            case CREATE:
                return { data: { ...params.data, id: json.id } };
            case DELETE:
                return { data: { ...json, id: params.id } };
            default:
                return { data: json };
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a data response
     */
    return (type: string, resource: string, params: any) => {
        // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        if (type === UPDATE_MANY) {
            return Promise.all(
                params.ids.map((id: any) =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify(params.data)
                    })
                )
            ).then((responses: any[]) => ({
                data: responses.map(response => response.json)
            }));
        }
        // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        if (type === DELETE_MANY) {
            return Promise.all(
                params.ids.map((id: any) =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: 'DELETE'
                    })
                )
            ).then((responses: any[]) => ({
                data: responses.map(response => response.json)
            }));
        }

        const { url, options } = convertDataRequestToHTTP(
            type,
            resource,
            params
        );

        return httpClient(url, options).then((response: any) =>
            convertHTTPResponse(response, type, resource, params)
        );
    };
};
