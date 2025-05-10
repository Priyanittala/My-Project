import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import AdminNavbar from '../Navbar/AdminNavbar';

function CreateQuiz() {
  const history = useNavigate();
  const [Heading, setHeading] = useState('');
  const [Questions, setQuestions] = useState([]);
  const [Question, setQuestion] = useState('');
  const [Option1, setOption1] = useState('');
  const [Option2, setOption2] = useState('');
  const [Option3, setOption3] = useState('');
  const [Option4, setOption4] = useState('');
  const [Answer, setAnswer] = useState('');
  const [Type, setType] = useState('multiple-choice');
  var gg = JSON.parse(localStorage.getItem("user"));

  const handleAddingQuestion = (e) => {
    e.preventDefault();

    // Validation
    if (!Question || !Answer) {
      alert("Please fill all required fields!");
      return;
    }
    if (Type === "multiple-choice" && (!Option1 || !Option2 || !Option3 || !Option4)) {
      alert("Please fill all MCQ options!");
      return;
    }

    const questionObj = {
      question: Question,
      type: Type,
      option1: Type === "multiple-choice" ? Option1 : Type === "true-false" ? "True" : null,
      option2: Type === "multiple-choice" ? Option2 : Type === "true-false" ? "False" : null,
      option3: Type === "multiple-choice" ? Option3 : null,
      option4: Type === "multiple-choice" ? Option4 : null,
      answer: Answer
    };

    setQuestions([...Questions, questionObj]);
    setQuestion('');
    setOption1('');
    setOption2('');
    setOption3('');
    setOption4('');
    setAnswer('');
    setType('multiple-choice');
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setOption1('');
    setOption2('');
    setOption3('');
    setOption4('');
    setAnswer('');
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    if (!Heading || Questions.length === 0) {
      alert("Please provide a quiz heading and at least one question!");
      return;
    }
    try {
      const result = await axios.post(
        `http://localhost:7018/api/Quiz/createQuiz`,
        {
          heading: Heading,
          questions: Questions
        },
        {
          headers: {
            Authorization: 'Bearer ' + gg.accessToken
          }
        }
      );
      alert("Quiz created successfully!");
      history('/Admin-page');
    } catch (error) {
      alert("Failed to create quiz. Check your data and try again.");
      console.error(error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="gaming" style={{ marginBottom: "41px" }}>
        <h1 style={{ marginLeft: "402px", marginTop: "41px" }}>
          Create a Quiz by filling below form
        </h1>
        <form>
          <div className="hoto" style={{ paddingRight: "286px", marginRight: "-34px" }}>
            <div className="different" style={{ marginLeft: "402px", marginTop: "20px" }}>
              <label>Heading of Quiz</label>
              <input type="text" className="form-control" placeholder="name of quiz" value={Heading} onChange={(e) => setHeading(e.target.value)} />

              <label>Question Type</label>
              <select className="form-control" value={Type} onChange={handleTypeChange} style={{ marginBottom: "10px" }}>
                <option value="multiple-choice">MCQ</option>
                <option value="true-false">True / False</option>
                <option value="single-word">One Word</option>
              </select>

              <label>Question</label>
              <input type="text" className="form-control" placeholder="enter the question" value={Question} onChange={(e) => setQuestion(e.target.value)} />

              {Type === "multiple-choice" && (
                <>
                  <label>Option1</label>
                  <input type="text" className="form-control" placeholder="option 1" value={Option1} onChange={(e) => setOption1(e.target.value)} />
                  <label>Option2</label>
                  <input type="text" className="form-control" placeholder="option 2" value={Option2} onChange={(e) => setOption2(e.target.value)} />
                  <label>Option3</label>
                  <input type="text" className="form-control" placeholder="option 3" value={Option3} onChange={(e) => setOption3(e.target.value)} />
                  <label>Option4</label>
                  <input type="text" className="form-control" placeholder="option 4" value={Option4} onChange={(e) => setOption4(e.target.value)} />
                  <label>Answer</label>
                  <select className="form-control" value={Answer} onChange={(e) => setAnswer(e.target.value)}>
                    <option value="">Select correct answer</option>
                    {[Option1, Option2, Option3, Option4].map((opt, idx) =>
                      opt ? <option key={idx} value={opt}>{opt}</option> : null
                    )}
                  </select>
                </>
              )}

              {Type === "true-false" && (
                <>
                  <label>Answer</label>
                  <select className="form-control" value={Answer} onChange={(e) => setAnswer(e.target.value)}>
                    <option value="">Select correct answer</option>
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                </>
              )}

              {Type === "single-word" && (
                <>
                  <label>Answer</label>
                  <input type="text" className="form-control" placeholder="answer" value={Answer} onChange={(e) => setAnswer(e.target.value)} />
                </>
              )}
            </div>
          </div>
          {/* Button Row */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "31px",
            marginLeft: "402px",
            maxWidth: "500px"
          }}>
            <Button
              variant="primary"
              onClick={handleAddingQuestion}
              style={{ minWidth: "220px" }}
            >
              Add question under this quiz
            </Button>
            <Button
              type="submit"
              className="btn btn-success"
              onClick={handleCreateQuiz}
              style={{ minWidth: "180px" }}
            >
              Create the quiz
            </Button>
          </div>
        </form>
        {/* Preview Section */}
        {Questions.length > 0 && (
          <div style={{ marginTop: "40px", marginLeft: "402px" }}>
            <h3>Preview Questions:</h3>
            {Questions.map((q, idx) => (
              <div key={idx} style={{
                backgroundColor: "#e0f7f5",
                padding: "16px",
                marginBottom: "16px",
                borderRadius: "8px"
              }}>
                <p><strong>Q{idx + 1}:</strong> {q.question}</p>
                <p><strong>Type:</strong> {q.type}</p>
                {q.type === "multiple-choice" && (
                  <ul>
                    {[q.option1, q.option2, q.option3, q.option4].map((opt, i) =>
                      opt ? <li key={i}>{opt}</li> : null
                    )}
                  </ul>
                )}
                <p><strong>Answer:</strong> {q.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateQuiz;
