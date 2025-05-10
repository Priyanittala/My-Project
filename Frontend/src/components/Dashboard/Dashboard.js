import Navbar from '../Navbar/Navbar';

function Dashboard() {
  const gg = JSON.parse(localStorage.getItem("user"));

  // Blue-green theme colors
  const themeColors = {
    background: '#e0f7f5', // light teal
    primary: '#00796b',    // teal dark
    textPrimary: '#004d40',
  };

  return (
    <div
      className="Dashboard"
      style={{
        backgroundColor: themeColors.background,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Navbar />

      <h1
        style={{
          color: themeColors.primary,
          fontWeight: '700',
          fontSize: '2.5rem',
          marginTop: '40px', // Reduced margin
          textAlign: 'center',
          maxWidth: '600px',
        }}
      >
        Welcome to User Dashboard, {gg.username}!
      </h1>
    </div>
  );
}

export default Dashboard;
