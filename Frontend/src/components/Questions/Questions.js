import '../Questions/Questions.css';
import Navbar from '../Navbar/Navbar';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Question() {
    const location = useLocation();
    const history = useNavigate();
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);

    const { heading, id: id_of_quiz, questions: array_of_questions } = location.state.tem;

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleMarkAnswer = (question) => {
        const userAnswer = answers[question.id];
        if (!userAnswer) {
            alert("Please select an answer before marking!");
            return;
        }

        // Normalize answers for comparison
        const normalize = (str) => str.trim().toLowerCase();
        if (normalize(userAnswer) === normalize(question.answer)) {
            setScore(prev => prev + 1);
            alert("Correct answer!");
        } else {
            alert(`Wrong answer! Correct answer is: ${question.answer}`);
        }
    };

    const handleSubmit = () => {
        history('/score', {
            state: {
                score: score,
                heading_of_quiz: heading,
                id: id_of_quiz
            }
        });
    };

    return (
        <div>
            <Navbar/>
            <h1 className='heading' style={{ marginLeft: "404px", marginTop: "19px" }}>
                You have to answer these questions
            </h1>

            {array_of_questions.map(it => (
                <div className="question ml-sm-5 pl-sm-5 pt-2" key={it.id}>
                    <div className="py-2 h5"><b>{it.id}. {it.question}</b></div>
                    <div className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                        {it.type === 'true-false' ? (
                            <>
                                {['True', 'False'].map(option => (
                                    <label className="options" key={option}>
                                        {option}
                                        <input
                                            type="radio"
                                            name={`radio-${it.id}`}
                                            value={option}
                                            checked={answers[it.id] === option}
                                            onChange={(e) => handleAnswerChange(it.id, e.target.value)}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                ))}
                            </>
                        ) : it.type === 'single-word' ? (
                            <input
                                type="text"
                                value={answers[it.id] || ''}
                                onChange={(e) => handleAnswerChange(it.id, e.target.value)}
                                placeholder="Type your answer here"
                                style={{
                                    padding: '8px',
                                    width: '100%',
                                    maxWidth: '400px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc'
                                }}
                            />
                        ) : (
                            // Default to multiple-choice
                            [it.option1, it.option2, it.option3, it.option4].map((option, idx) => (
                                <label className="options" key={idx}>
                                    {option}
                                    <input
                                        type="radio"
                                        name={`radio-${it.id}`}
                                        value={option}
                                        checked={answers[it.id] === option}
                                        onChange={(e) => handleAnswerChange(it.id, e.target.value)}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            ))
                        )}
                    </div>
                    <Button 
                        onClick={(e) => {
                            e.preventDefault();
                            handleMarkAnswer(it);
                        }}
                        style={{ marginTop: '10px' }}
                    >
                        Mark this option
                    </Button>
                </div>
            ))}

            <Button 
                className='submitting' 
                style={{ marginLeft: "569px", marginTop: "39px" }}
                onClick={handleSubmit}
            >
                Click here to submit the quiz and see score
            </Button>
        </div>
    );
}

export default Question;
