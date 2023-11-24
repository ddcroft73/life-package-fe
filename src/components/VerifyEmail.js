import React from 'react';
import './VerifyEmail.css'; // Make sure to create a corresponding CSS file with the desired styles

const VerifyEmail = () => {
    return (
        <div className="verify-email-container">
            <h1>Life Package,  Email Verification</h1>
            <p className="verification-message">
                Thank you for registering with us. We have sent a verification email to the
                address provided. Please check your email and click on the verification link
                to complete your registration.
            </p>
            <p className="additional-instruction">
                If you don't receive the email within a few minutes, please check your spam folder
                or <a href="/resend">click here</a> to resend the verification email.
            </p>
        </div>
    );
};

export default VerifyEmail;
