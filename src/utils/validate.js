const validateForm = (email, password) => {
    const isEmailValid = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);
    //one Uppercase, one special character and minimum 8 characters long
    const isPasswordValid = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    if (!isEmailValid) return "Email not Valid!";
    if (!isPasswordValid) return "Password not Valid!";
    return null;
};

export default validateForm;
