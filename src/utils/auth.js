const AUTH_STORAGE_KEY = "doctor_mom_2_user";

export const getStoredUser = () => {
    try {
        const raw = localStorage.getItem(AUTH_STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (error) {
        return null;
    }
};

export const setStoredUser = (user) => {
    try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        window.dispatchEvent(new Event("doctormom-auth-change"));
    } catch (error) {
        // ignore storage errors
    }
};

export const clearStoredUser = () => {
    try {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        window.dispatchEvent(new Event("doctormom-auth-change"));
    } catch (error) {
        // ignore storage errors
    }
};
