const API = {
    GENERAL: {
        postFetch: async (url: string, body: any) => {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            return res;
        },
        getFetch: async (url: string) => {
            const res = await fetch(url);
            return res;
        },
    },
    AUTH: {
        signUp: async (email: string, password: string) => {
            const res = await API.GENERAL.postFetch("/api/auth/signup", {
                email,
                password,
            });
            return res;
        },
        signIn: async (email: string, password: string) => {
            const res = await API.GENERAL.postFetch("/api/auth/signin", {
                email,
                password,
            });
            return res;
        },
    },
};

export default API;
