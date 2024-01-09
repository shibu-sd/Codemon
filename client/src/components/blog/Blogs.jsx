import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Blogs({ isAuthenticated }) {

    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/blogs`, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
                const data = response.data;
                console.log(data.blogs);
                setBlogs(data.blogs)
            }
            catch (error) {
                console.log(error);
            }
        }

        getBlogs();
    }, [])

    if (isAuthenticated) {
        return (
            <>
                <Button startIcon={<AddIcon fontSize="large"></AddIcon>} variant="contained" color="success" size="large" sx={{ float: 'right', mt: 4, mr: 3, fontSize: 18 }} onClick={() => { navigate("/createblogs") }}>
                    Create
                </Button>
                <Container maxWidth="" sx={{ mt: 12 }}>
                    {blogs.map((blog, index) => (
                        <Card key={index} style={{ marginBottom: '32px' }}>
                            <CardContent>
                                <Typography variant="h4">{blog.title}</Typography>
                                - <Typography variant="caption" color="red" sx={{ mt: 1, fontSize: 16 }}>
                                    {blog.author}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                    <div dangerouslySetInnerHTML={{ __html: blog.description }} />
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Container>
            </>
        );
    }

    return null;
}

export default Blogs;
