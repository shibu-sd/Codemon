import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function Footer() {
  return (
    <footer>
      <Box sx={{ backgroundColor: 'black', color: 'white', paddingY: 4, textAlign: 'center' }}>
        <Container>
          <Typography variant="h6" gutterBottom>
            Made with ❤️ in India
          </Typography>
          <Typography>
            At Codemon our commitment is to empower you on your coding journey and enhance your programming skills. <br />
            With a rich collection of challenging problems, we strive to be your go-to platform <br />
            Join Codemon today and elevate your coding game! <br />
          </Typography>
          <hr style={{ width: '50%', marginTop: 30, borderTop: '1px solid white' }} />
          <Typography sx={{ marginTop: 5 }}>
            © 2024 Codemon. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
