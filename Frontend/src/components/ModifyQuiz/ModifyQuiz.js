import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import AdminNavbar from '../Navbar/AdminNavbar';

const themeColors = {
  background: '#e0f7f5',
  primary: '#00796b',
  textPrimary: '#004d40',
  buttonBackground: '#00796b',
  danger: '#d32f2f',
};

function ModifyQuiz() {
  const location = useLocation();
  const heading_of_quiz = location.state.heading_of_quiz;
  const id_of_quiz = location.state.quiz_id;
  const history = useNavigate();
  const gg = JSON.parse(localStorage.getItem("user"));

  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:7018/api/Quiz/GetAllQuestions/${id_of_quiz}`,
          { headers: { Authorization: "Bearer " + gg.accessToken } }
        );
        setData(result.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchData();
  }, [id_of_quiz, gg.accessToken]);

  return (
    <div style={{ backgroundColor: themeColors.background, minHeight: '100vh', paddingBottom: '60px' }}>
      <AdminNavbar />

      <h1 style={{ marginLeft: '300px', marginTop: '24px', color: themeColors.primary }}>
        Modify Quiz: {heading_of_quiz}
      </h1>

      <div className="container" style={{ maxWidth: '900px', marginTop: '40px' }}>
        {Data.length > 0 ? (
          Data.map((it, index) => (
            <div key={it.id} className="question p-4 mb-4" style={questionStyles}>
              <div className="py-2 h5" style={{ color: themeColors.textPrimary }}>
                <b>{index + 1}. {it.question}</b>
                <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '8px' }}>
                  Type: {it.type?.replace('-', ' ') || 'multiple choice'}
                </div>
              </div>

              <div style={{ marginLeft: '20px', marginTop: '15px', marginBottom: '20px' }}>
                {it.type === 'true-false' ? (
                  <div>
                    {['True', 'False'].map((option, idx) => (
                      <div key={idx} style={optionStyle}>
                        {option}
                      </div>
                    ))}
                  </div>
                ) : it.type === 'single-word' ? (
                  <div style={answerStyle}>
                    <b>Correct Answer:</b> {it.answer}
                  </div>
                ) : (
                  <div>
                    {[it.option1, it.option2, it.option3, it.option4].map(
                      (option, idx) => option && (
                        <div key={idx} style={optionStyle}>
                          {option}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              <div>
                <Button
                  variant="danger"
                  onClick={async () => {
                    try {
                      await axios.get(
                        `http://localhost:7018/api/Quiz/RemoveAQuestion/${id_of_quiz}/${it.id}`,
                        { headers: { Authorization: "Bearer " + gg.accessToken } }
                      );
                      window.location.reload();
                    } catch (error) {
                      console.error("Error deleting question:", error);
                    }
                  }}
                >
                  Delete this question
                </Button>

                <Button
                  variant="success"
                  style={{ marginLeft: '16px' }}
                  onClick={() => {
                    history("/updating-a-question", { 
                      state: { 
                        question: it,
                        quiz_id: id_of_quiz,
                        question_type: it.type 
                      } 
                    });
                  }}
                >
                  Update this question
                </Button>
              </div>
            </div>
          ))
        ) : (
          <h2 style={noQuestionsStyle}>
            No questions present under this quiz as of now!
          </h2>
        )}
      </div>
    </div>
  );
}

// Style objects
const questionStyles = {
  backgroundColor: 'white',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
};

const optionStyle = {
  display: 'block',
  padding: '8px 12px',
  marginBottom: '8px',
  backgroundColor: '#b2dfdb',
  borderRadius: '6px',
  color: '#004d40',
  fontWeight: '500',
};

const answerStyle = {
  padding: '8px 12px',
  backgroundColor: '#b2dfdb',
  borderRadius: '6px',
  color: '#004d40',
  fontWeight: '500',
};

const noQuestionsStyle = {
  marginTop: '180px',
  maxWidth: '600px',
  color: '#d32f2f',
  textAlign: 'center',
  fontWeight: '600',
};

export default ModifyQuiz;
