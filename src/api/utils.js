

export function decodeJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(jsonPayload);
}


export function getCurrentDateTime() {
    const now = new Date();

    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = now.getDate().toString().padStart(2, '0');
    const year = now.getFullYear();

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}


export const isEmailAddress = (emailString) => {
    if (emailString.includes('@') && emailString.includes('.')) {
      return true;
    }
    return false;
};

export function verifyPasswordStrength(password) {
    const minLength = 8;
    let failureMessages = [];

    if (password.length < minLength) {
        failureMessages.push("Length must be 8 or more characters");
    }
    if (!/[A-Z]/.test(password)) {
        failureMessages.push("Needs at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
        failureMessages.push("\nNeeds at least one lowercase letter.");
    }
    if (!/\d/.test(password)) {
        failureMessages.push("Needs at least one digit.");
    }
    if (!/[!@#$%^&*]/.test(password)) {
        failureMessages.push("Needs at least one special character.");
    }
    if (failureMessages.length === 0) {
        return true;
    }
    return failureMessages;
};
