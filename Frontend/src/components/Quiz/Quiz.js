import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/joy';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const themeColors = {
  background: '#e0f7f5',    // light teal background
  primary: '#00796b',       // dark teal for headings and buttons
  buttonBg: '#00796b',
  buttonHover: '#004d40',
  textPrimary: '#004d40',
  danger: '#d32f2f',
};

function Quiz() {
  const gg = JSON.parse(localStorage.getItem("user"));
  const [Data, setData] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:7018/api/Quiz/getAllQuizzes`,
          {
            headers: {
              Authorization: 'Bearer ' + gg.accessToken,
            },
          }
        );
        setData(result.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchData();
  }, [gg.accessToken]);

  return (
    <div style={{ backgroundColor: themeColors.background, minHeight: '100vh', paddingBottom: '50px' }}>
      <Navbar />

      <h1
        style={{
          marginTop: '48px',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '700px',
          color: themeColors.primary,
          fontWeight: '700',
          fontSize: '2.2rem',
          textAlign: 'center',
          padding: '0 20px',
        }}
      >
        Here are quizzes assigned to you!
      </h1>

      <div className="quizzy" style={{ maxWidth: '900px', margin: '40px auto' }}>
        {Data.length === 0 ? (
          <h2
            className="important"
            style={{
              color: themeColors.danger,
              textAlign: 'center',
              marginTop: '160px',
              fontWeight: '600',
            }}
          >
            No quizzes assigned to you as of now.
          </h2>
        ) : (
          <TableContainer
            component={Paper}
            elevation={3}
            sx={{ borderRadius: '12px', overflow: 'hidden' }}
          >
            <Table aria-label="quizzes table">
              <TableHead sx={{ backgroundColor: themeColors.primary }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: '600' }}>Quiz Name</TableCell>
                  <TableCell align="right" sx={{ color: 'white', fontWeight: '600' }}>
                    Attempt this quiz by pressing this button.
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Data.map((item) => (
                  <TableRow
                    key={item.id}
                    hover
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { backgroundColor: '#b2dfdb' },
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{ fontWeight: '500', color: themeColors.textPrimary }}>
                      {item.heading}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="solid"
                        sx={{
                          backgroundColor: themeColors.buttonBg,
                          color: 'white',
                          fontWeight: '600',
                          padding: '8px 24px',
                          borderRadius: '8px',
                          '&:hover': {
                            backgroundColor: themeColors.buttonHover,
                          },
                        }}
                        onClick={() => history("/questions", { state: { tem: item } })}
                      >
                        Play this one!
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}

export default Quiz;
