import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminNavbar from '../Navbar/AdminNavbar';

function Dashboard() {
  const gg = JSON.parse(localStorage.getItem("user"));
  const history = useNavigate();

  // Blue-green theme colors
  const themeColors = {
    background: '#e0f7f5', // light teal
    primary: '#00796b',    // teal dark
    buttonBackground: '#00796b',
    buttonHover: '#004d40',
    textPrimary: '#004d40',
  };

  return (
    <div style={{ backgroundColor: themeColors.background, minHeight: '100vh', paddingBottom: '50px' }}>
      <AdminNavbar />

      <div className="container py-5">
        <h1
          className="text-center mb-5"
          style={{ color: themeColors.primary, fontWeight: '700' }}
        >
          Welcome to Admin Dashboard, {gg.username}!
        </h1>

        <div className="row justify-content-center g-4">
          <div className="col-md-3 d-flex justify-content-center">
            <Button
              onClick={() => history('/create-quiz')}
              style={{
                backgroundColor: themeColors.buttonBackground,
                borderColor: themeColors.buttonBackground,
                fontWeight: '600',
                padding: '12px 24px',
                width: '100%',
                maxWidth: '200px',
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = themeColors.buttonHover}
              onMouseOut={e => e.currentTarget.style.backgroundColor = themeColors.buttonBackground}
            >
              Create a Quiz
            </Button>
          </div>

          <div className="col-md-3 d-flex justify-content-center">
            <Button
              onClick={() => history('/see-all-quiz')}
              style={{
                backgroundColor: themeColors.buttonBackground,
                borderColor: themeColors.buttonBackground,
                fontWeight: '600',
                padding: '12px 24px',
                width: '100%',
                maxWidth: '200px',
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = themeColors.buttonHover}
              onMouseOut={e => e.currentTarget.style.backgroundColor = themeColors.buttonBackground}
            >
              See Created Quizzes
            </Button>
          </div>

          <div className="col-md-3 d-flex justify-content-center">
            <Button
              onClick={() => history('/student-stats')}
              style={{
                backgroundColor: themeColors.buttonBackground,
                borderColor: themeColors.buttonBackground,
                fontWeight: '600',
                padding: '12px 24px',
                width: '100%',
                maxWidth: '200px',
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = themeColors.buttonHover}
              onMouseOut={e => e.currentTarget.style.backgroundColor = themeColors.buttonBackground}
            >
              Show Quizzes Stats
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
