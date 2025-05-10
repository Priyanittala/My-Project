import { Button } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from '../Navbar/AdminNavbar';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Blue-green theme colors
const themeColors = {
  background: '#e0f7f5',    // light teal
  tableHeader: '#00796b',   // teal dark
  tableHeaderText: '#fff',
  tableRow: '#b2dfdb',      // lighter teal
  tableText: '#004d40',     // dark teal
  buttonBackground: '#00796b',
  buttonText: '#fff',
  danger: '#d32f2f',
};

function GetAllQuiz() {
  var gg = JSON.parse(localStorage.getItem("user"));
  const [Data, setData] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "http://localhost:7018/api/Quiz/getAllQuizzes",
        {
          headers: {
            Authorization: 'Bearer ' + gg.accessToken
          }
        }
      );
      setData(result.data);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ backgroundColor: themeColors.background, minHeight: "100vh", paddingBottom: "60px" }}>
      <AdminNavbar />
      <h1 className="headingd" style={{
        marginLeft: "521px",
        marginTop: "48px",
        color: themeColors.tableHeader,
        fontWeight: 700
      }}>
        Quizzes created by you are:
      </h1>
      <div className='quizzy' style={{ marginTop: "83px", marginLeft: "13px" }}>
        {Data.length === 0 ?
          <h1 className="nothing"
            style={{
              marginLeft: "492px",
              marginTop: "139px",
              color: themeColors.danger
            }}>
            No quizzes created as of now
          </h1>
          :
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 4 }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: themeColors.tableHeader }}>
                  <TableCell sx={{
                    backgroundColor: themeColors.tableHeader,
                    color: themeColors.tableHeaderText,
                    fontWeight: 700
                  }}>Quiz Name</TableCell>
                  <TableCell align="right" sx={{
                    backgroundColor: themeColors.tableHeader,
                    color: themeColors.tableHeaderText,
                    fontWeight: 700
                  }}>Modify Something</TableCell>
                  <TableCell align="right" sx={{
                    backgroundColor: themeColors.tableHeader,
                    color: themeColors.tableHeaderText,
                    fontWeight: 700
                  }}>Delete this quiz</TableCell>
                  <TableCell align="right" sx={{
                    backgroundColor: themeColors.tableHeader,
                    color: themeColors.tableHeaderText,
                    fontWeight: 700
                  }}>Add a question to this quiz</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Data.length > 0 && Data.map((item, idx) => (
                  <TableRow
                    key={item.id}
                    sx={{
                      backgroundColor: idx % 2 === 0 ? themeColors.tableRow : "#fff"
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{ color: themeColors.tableText, fontWeight: 600 }}>
                      {item.heading}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        className='play'
                        style={{
                          background: themeColors.buttonBackground,
                          color: themeColors.buttonText,
                          border: "none",
                          fontWeight: 600
                        }}
                        onClick={() => {
                          history("/modify-quiz", {
                            state: {
                              quiz_id: item.id,
                              heading_of_quiz: item.heading
                            }
                          });
                        }}>
                        Modify something in this quiz
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        className="Deletingquiz"
                        style={{
                          marginLeft: "7px",
                          background: themeColors.danger,
                          color: "#fff",
                          border: "none",
                          fontWeight: 600
                        }}
                        onClick={async () => {
                          await axios.get(
                            `http://localhost:7018/api/Quiz/deleteAQuiz/${item.id}`,
                            {
                              headers: {
                                Authorization: 'Bearer ' + gg.accessToken
                              }
                            }
                          );
                          await axios.get(
                            `http://localhost:7018/api/Quiz/DeleteScoreQuiz/${item.heading}`,
                            {
                              headers: {
                                Authorization: 'Bearer ' + gg.accessToken
                              }
                            }
                          );
                          window.location.reload();
                        }}>
                        Delete this Quiz
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        style={{
                          background: themeColors.tableHeader,
                          color: themeColors.buttonText,
                          border: "none",
                          fontWeight: 600
                        }}
                        onClick={() => history("/add-a-question", {
                          state: {
                            quiz_id: item.id,
                            heading_of_quiz: item.heading
                          }
                        })}>
                        Add one question to this quiz
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
      </div>
    </div>
  );
}

export default GetAllQuiz;
