Certainly, Danny. I'll write a JavaScript function that takes a string variable named `password` and checks it against common password strength criteria. This function will verify if the password meets the following requirements:

1. Minimum length (e.g., 8 characters).
2. At least one uppercase letter.
3. At least one lowercase letter.
4. At least one digit.
5. At least one special character (e.g., `!@#$%^&*`).

Here's an example of how such a function can be structured:

```javascript
function isPasswordStrong(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    if (password.length < minLength) {
        return "Password must be at least 8 characters long.";
    }
    if (!hasUpperCase) {
        return "Password must include at least one uppercase letter.";
    }
    if (!hasLowerCase) {
        return "Password must include at least one lowercase letter.";
    }
    if (!hasNumber) {
        return "Password must include at least one digit.";
    }
    if (!hasSpecialChar) {
        return "Password must include at least one special character.";
    }

    return "Password is strong.";
}

// Example usage
console.log(isPasswordStrong("ExamplePassword1!")); // Output: Password is strong.
```

This function uses regular expressions to test for the presence of uppercase letters, lowercase letters, digits, and special characters. The `test()` method returns `true` if there is a match in the string, and `false` otherwise.

This function is a good starting point, but you might want to adapt it to fit specific requirements or policies you have in place. For instance, you could include checks for commonly used or weak passwords, or implement more sophisticated rules for password strength.
