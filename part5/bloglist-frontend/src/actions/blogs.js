import blogService from '../services/blogs';

const INITIALIZE_BLOGS = 'INITIALIZE_BLOGS';
const ADD_BLOG = 'ADD_BLOG';
const DELETE_BLOG = 'DELETE_BLOG';
const ADD_LIKE = 'ADD_LIKE';

// initializeBlogs action creator.
const initializeBlogs = blogs => ({
    type: INITIALIZE_BLOGS,
    blogs
});

// handleIntialBlogs thunk action creator.
const handleInitialBlogs = () => {
    return (dispatch) => {
        blogService.getAll()
            .then(blogs => {
                dispatch(initializeBlogs(blogs));
            })
    }
};

// Add blog action creator.
const addBlog = (blog) => ({
    type: ADD_BLOG,
    blog
});

// delete Blog action creator.
const deleteBlog = id => ({
    type: DELETE_BLOG,
    id
});

const addLike = id => ({
    type: ADD_LIKE,
    id
})
 


export { 
    handleInitialBlogs as default,
    addBlog, 
    deleteBlog,
    addLike,
    INITIALIZE_BLOGS,
    ADD_BLOG,
    DELETE_BLOG,
    ADD_LIKE
};