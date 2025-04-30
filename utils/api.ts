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
        getFetch: async (url: string, token: string) => {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error(`Fetch error: ${res.status}`);
            }

            return res.json();
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
        checkToken: async (token: string) => {
            const res = await API.GENERAL.getFetch("/api/simple", token);
            return res;
        },
    },
};

export default API;
