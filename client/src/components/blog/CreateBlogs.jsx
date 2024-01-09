import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Container, Button, Typography, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function CreateBlogs({ isAuthenticated }) {
    const [blogData, setBlogData] = useState({
        title: '',
        description: '',
    });

    const handleInputChange = (e) => {
        setBlogData({
            ...blogData,
            [e.target.name]: e.target.value,
        });
    };

    const handleDescriptionChange = (value) => {
        setBlogData({
            ...blogData,
            description: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Blog submitted:', blogData);
    };

    if (isAuthenticated) {
        return (
            <Container maxWidth="" sx={{ mt: 5 }}>
                <Typography variant="h4" sx={{ mt: 5 }}>
                    Publish a new Blog
                </Typography>
                <TextField type="text" placeholder="Title" fullWidth name="title" value={blogData.title} onChange={handleInputChange} required sx={{ mt: 3, mb : 3}}/>
                <ReactQuill
                    value={blogData.description}
                    onChange={handleDescriptionChange}
                    modules={{
                        toolbar: [
                            [{ header: [1, 2, false] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            ['link'],
                            ['clean'],
                        ],
                    }}
                    formats={[
                        'header',
                        'bold',
                        'italic',
                        'underline',
                        'strike',
                        'blockquote',
                        'list',
                        'bullet',
                        'link'
                    ]}
                    style={{height : 500}}
                />

                <Button type="submit" startIcon={<AddIcon />} variant="contained" color="success" size="large" sx={{ mt: 9, fontSize: 18 }} onClick={handleSubmit}>
                    Publish
                </Button>

                {/* <div dangerouslySetInnerHTML={{ __html: blogData.description }} /> */}

            </Container>
        );
    }

    return null;
}

export default CreateBlogs;
