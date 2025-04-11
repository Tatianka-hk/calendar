import { useSnackbar } from "~/composables/useSnackbar";
function isValidEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

enum modeOptions {
    signIn = "signin",
    signUp = "signup",
}
export function checkFields(
    email: string,
    password: string,
    mode: modeOptions
) {
    const { showSnackbar } = useSnackbar();
    console.log("sdj");
    if (!email) {
        showSnackbar("Email is required", "error");
        return false;
    } else if (!password) {
        showSnackbar("Password is required", "error");
        return false;
    }
    if (mode === modeOptions.signUp) {
        if (!isValidEmail(email)) {
            showSnackbar("Invalid email", "error");
            return false;
        } else if (password.length < 6) {
            showSnackbar("Password must be at least 6 characters", "error");
            return false;
        }
    }
    return true;
}
