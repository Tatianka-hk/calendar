const API = {
    GENERAL: {
        postFetch: async (url: string, body: any) => {
            const token = localStorage.getItem("token");
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token ?? ""}`,
                },
                body: JSON.stringify(body),
            });
            return res;
        },
        getFetch: async (url: string) => {
            const token = localStorage.getItem("token");
            console.log(token);
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
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
    EVENTS: {
        PREFIX: "/api/app/events",
        getEvents: async () => {
            const res = await API.GENERAL.getFetch("/api/app/events");
            return res;
        },
        createEvent: async (event: any) => {
            const res = await API.GENERAL.postFetch(
                "/api/app/events/create",
                event
            );
            return res;
        },
    },
};

export default API;
