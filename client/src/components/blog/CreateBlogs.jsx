import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Container, Button, Typography, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function CreateBlogs({ isAuthenticated }) {
    const navigate = useNavigate();
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

    const [username, setUsername] = useState("");
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/me`, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
                const data = response.data;
                setUsername(data.user.username);
            }
            catch (error) {
                console.log(error);
            }
        }

        getUser();
    }, [])

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/publishblog`, { "title": blogData.title, "description": blogData.description, "author": username },
                { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });

            console.log(response);
            alert("Blog published successfully");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    if (isAuthenticated) {
        return (
            <Container maxWidth="" sx={{ mt: 5 }}>
                <Typography variant="h4" sx={{ mt: 5 }}>
                    Publish a new Blog
                </Typography>
                <TextField type="text" placeholder="Title" fullWidth name="title" value={blogData.title} onChange={handleInputChange} required sx={{ mt: 3, mb: 3 }} />
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
                    style={{ height: 500 }}
                />

                <Button type="submit" startIcon={<AddIcon />} variant="contained" color="success" size="large" sx={{ mt: 9, fontSize: 18 }} onClick={handleSubmit}>
                    Publish
                </Button>
            </Container>
        );
    }

    return null;
}

export default CreateBlogs;
