import React, { useState, useRef } from 'react';

const JessAvatar = () => {
  const [stage, setStage] = useState('landing'); // landing, listening, speaking, captured, thankyou
  const [conversation, setConversation] = useState([]);
  const [leadData, setLeadData] = useState({ name: '', phone: '', email: '' });
  const [isListening, setIsListening] = useState(false);
  const audioRef = useRef(null);

  const handleStartConversation = () => {
    setStage('listening');
    setIsListening(true);
    // Placeholder for Web Speech API integration
    setTimeout(() => {
      setIsListening(false);
      setStage('speaking');
      // Simulate Jess response
      setTimeout(() => {
        setConversation([
          { role: 'jess', text: "Hey there! I'm Jess. Quick question—what brought you here today?" }
        ]);
        setStage('listening');
      }, 1000);
    }, 3000);
  };

  const handleCaptureInfo = () => {
    if (leadData.name && leadData.phone && leadData.email) {
      setStage('captured');
    }
  };

  const handleSignup = () => {
    // Redirect to GHL booking/payment link
    window.location.href = process.env.REACT_APP_GHL_SIGNUP_LINK || '#';
  };

  return (
    <div className="jess-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Outfit', sans-serif;
          background: #000000;
          color: #ffffff;
        }

        .jess-container {
          min-height: 100vh;
          background: #000000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        /* Background glow effect */
        .jess-container::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(0, 180, 255, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .jess-container::after {
          content: '';
          position: absolute;
          bottom: -50%;
          left: -50%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255, 0, 255, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .jess-content {
          position: relative;
          z-index: 1;
          max-width: 600px;
          width: 100%;
          text-align: center;
        }

        /* Landing Stage */
        .landing-stage {
          animation: fadeIn 0.6s ease-out;
        }

        .avatar-placeholder {
          width: 300px;
          height: 300px;
          margin: 0 auto 40px;
          background: linear-gradient(135deg, rgba(0, 180, 255, 0.15) 0%, rgba(255, 0, 255, 0.15) 100%);
          border: 2px solid #00b4ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 30px rgba(0, 180, 255, 0.4), 0 0 60px rgba(255, 0, 255, 0.2);
        }

        .avatar-placeholder::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, transparent 30%, rgba(0, 180, 255, 0.15) 50%, transparent 70%);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .avatar-icon {
          position: relative;
          z-index: 2;
          font-size: 80px;
        }

        .avatar-status {
          position: absolute;
          bottom: 20px;
          right: 20px;
          width: 16px;
          height: 16px;
          background: #00ff00;
          border-radius: 50%;
          box-shadow: 0 0 10px #00ff00;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .landing-title {
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 16px;
          background: linear-gradient(90deg, #00b4ff 0%, #ff00ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .landing-subtitle {
          font-size: 18px;
          color: #b0c0d8;
          margin-bottom: 40px;
          line-height: 1.5;
        }

        /* Buttons */
        .primary-btn {
          background: linear-gradient(90deg, #00b4ff 0%, #ff00ff 100%);
          color: #000000;
          border: none;
          padding: 16px 48px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 180, 255, 0.4), 0 0 10px rgba(255, 0, 255, 0.2);
          font-family: 'Outfit', sans-serif;
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 180, 255, 0.6), 0 0 20px rgba(255, 0, 255, 0.4);
        }

        .primary-btn:active {
          transform: translateY(0);
        }

        .secondary-btn {
          background: transparent;
          color: #00b4ff;
          border: 2px solid #00b4ff;
          padding: 14px 40px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Outfit', sans-serif;
        }

        .secondary-btn:hover {
          background: rgba(0, 180, 255, 0.1);
          box-shadow: 0 4px 20px rgba(0, 180, 255, 0.3);
          border-color: #ff00ff;
          color: #ff00ff;
        }

        /* Listening State */
        .listening-stage {
          animation: fadeIn 0.6s ease-out;
        }

        .listening-indicator {
          width: 300px;
          height: 300px;
          margin: 0 auto 40px;
          background: linear-gradient(135deg, rgba(0, 180, 255, 0.2) 0%, rgba(255, 0, 255, 0.2) 100%);
          border: 2px solid #00b4ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 40px rgba(0, 180, 255, 0.5), 0 0 60px rgba(255, 0, 255, 0.3);
        }

        .listening-indicator::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px solid #00b4ff;
          border-radius: 50%;
          animation: pulse-ring 1.5s ease-out infinite;
        }

        .listening-indicator::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px solid #ff00ff;
          border-radius: 50%;
          animation: pulse-ring-delay 1.5s ease-out infinite;
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }

        @keyframes pulse-ring-delay {
          0% { transform: scale(0.6); opacity: 1; }
          100% { transform: scale(1.2); opacity: 0; }
        }

        .listening-icon {
          position: relative;
          z-index: 2;
          font-size: 60px;
        }

        .listening-text {
          font-size: 18px;
          color: #00b4ff;
          margin-top: 30px;
          font-weight: 500;
        }

        /* Lead Capture */
        .capture-stage {
          animation: fadeIn 0.6s ease-out;
        }

        .form-group {
          margin-bottom: 20px;
          text-align: left;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          color: #b0c0d8;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .form-group input {
          width: 100%;
          padding: 12px 16px;
          background: rgba(20, 30, 60, 0.8);
          border: 1px solid rgba(0, 180, 255, 0.4);
          border-radius: 6px;
          color: #ffffff;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: #00b4ff;
          box-shadow: 0 0 15px rgba(0, 180, 255, 0.3);
        }

        /* Thank You */
        .thankyou-stage {
          animation: fadeIn 0.6s ease-out;
        }

        .thankyou-icon {
          font-size: 80px;
          margin-bottom: 20px;
        }

        .thankyou-title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #00b4ff;
        }

        .thankyou-text {
          font-size: 16px;
          color: #b0c0d8;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 600px) {
          .landing-title {
            font-size: 32px;
          }

          .landing-subtitle {
            font-size: 16px;
          }

          .avatar-placeholder,
          .listening-indicator {
            width: 240px;
            height: 240px;
          }

          .primary-btn {
            width: 100%;
            padding: 18px 32px;
          }
        }
      `}</style>

      {stage === 'landing' && (
        <div className="jess-content landing-stage">
          <div className="avatar-placeholder">
            <div className="avatar-icon">👩</div>
            <div className="avatar-status"></div>
          </div>
          <h1 className="landing-title">Meet Jess</h1>
          <p className="landing-subtitle">
            Let's talk about how to turn your cold leads into booked appointments.
          </p>
          <button className="primary-btn" onClick={handleStartConversation}>
            Start Conversation
          </button>
        </div>
      )}

      {stage === 'listening' && (
        <div className="jess-content listening-stage">
          <div className="listening-indicator">
            <div className="listening-icon">🎤</div>
          </div>
          <p className="listening-text">Listening...</p>
        </div>
      )}

      {stage === 'speaking' && (
        <div className="jess-content listening-stage">
          <div className="listening-indicator">
            <div className="listening-icon">💬</div>
          </div>
          <p className="listening-text">Jess is speaking...</p>
        </div>
      )}

      {stage === 'captured' && (
        <div className="jess-content capture-stage">
          <div className="avatar-placeholder">
            <div className="avatar-icon">✓</div>
          </div>
          <h2 className="landing-title" style={{ fontSize: '28px' }}>
            You're all set!
          </h2>
          <p className="landing-subtitle">
            Let's get you started. Choose your plan and book your onboarding call.
          </p>
          <button className="primary-btn" onClick={handleSignup}>
            See Plans & Sign Up
          </button>
        </div>
      )}

      {stage === 'thankyou' && (
        <div className="jess-content thankyou-stage">
          <div className="thankyou-icon">🎉</div>
          <h2 className="thankyou-title">You're in!</h2>
          <p className="thankyou-text">
            Check your email for next steps. Your onboarding call is scheduled for tomorrow.
          </p>
          <button className="secondary-btn" onClick={() => setStage('landing')}>
            Start Over
          </button>
        </div>
      )}
    </div>
  );
};

export default JessAvatar;
