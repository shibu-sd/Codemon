import React from 'react';
import { Container, Card, CardContent, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

function Blogs({ isAuthenticated }) {
    if (isAuthenticated) {

        const navigate = useNavigate();

        const blogs = [
            { title: 'Harry Potter and Voldemort', content: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
            
            1914 translation by H. Rackham
            "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
            
            Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."`, contributor: 'John Doe' },
            { title: 'Blog 2', content: '...', contributor: 'Jane Doe' },
        ];

        return (
            <>
                <Button startIcon={<AddIcon fontSize="large"></AddIcon>} variant="contained" color="success" size="large" sx={{ float: 'right', mt: 4, mr : 3, fontSize : 18 }} onClick={() => {navigate("/createblogs")}}>
                    Create 
                </Button>
                <Container maxWidth="" sx={{ mt: 12 }}>
                    {blogs.map((blog, index) => (
                        <Card key={index} style={{ marginBottom: '32px' }}>
                            <CardContent>
                                <Typography variant="h4">{blog.title}</Typography>
                                - <Typography variant="caption" color="red" sx={{ mt: 1, fontSize: 16 }}>
                                     {blog.contributor}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontSize: 16 }}>
                                    {blog.content}
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
