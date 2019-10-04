import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';
import { allowAsync } from 'expo/build/ScreenOrientation/ScreenOrientation';

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'get_blogposts': 
            return action.payload;
        case 'delete_blogpost':
            return state.filter(blogpost => blogpost.id !== action.payload);
        // case 'add_blogpost':
        //     return [...state, { id: Math.floor(Math.random() * 999999),
        //                         title: action.payload.title,
        //                         content: action.payload.content }];
        case 'edit_blogPost': 
            return state.map((blogpost) => {
                return blogpost.id === action.payload.id ? action.payload : blogpost;
            })
        default:
            return state
    };
};

const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts');

        dispatch({ type: 'get_blogposts', payload: response.data })
    };
};

const addBlogPost = dispatch => {
    return async (title, content, callback) => {
        await jsonServer.post('/blogposts', { title, content });
        // dispatch({ type: 'add_blogpost', payload: { title, content } });
        callback && callback();
    };
};

const editBlogPost = dispatch => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, { title, content });
        dispatch({ type: 'edit_blogPost', payload: { id, title, content }});
        callback && callback();
    }
}

const deleteBlogPost = dispatch => {
    return async (id) => {
        await jsonServer.delete(`/blogposts/${id}`);
        // dispatch({ type: 'delete_blogpost', payload: id })
    };
};

export const { Context, Provider } = createDataContext(
    blogReducer,
    { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
    []
);
