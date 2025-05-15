const API = {
    GENERAL: {
        postFetch: async (url: string, body: any) => {
            if (typeof window === "undefined") {
                return null;
            }
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
            if (typeof window === "undefined") {
                return null;
            }
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
            if (typeof window === "undefined") {
                return null;
            }
            const selectedDay = localStorage.getItem("selectedDay");
            const res = await API.GENERAL.getFetch(
                `${API.EVENTS.PREFIX}/get?day=${selectedDay}`
            );
            return res;
        },
        createEvent: async (event: any) => {
            const res = await API.GENERAL.postFetch(
                `${API.EVENTS.PREFIX}/create`,
                event
            );
            return res;
        },
        editALL: async (events: any) => {
            const res = await API.GENERAL.postFetch(
                `${API.EVENTS.PREFIX}/edit_all`,
                events
            );
            return res;
        },
        editEvent: async (event: any) => {
            const res = await API.GENERAL.postFetch(
                `${API.EVENTS.PREFIX}/edit`,
                event
            );
            return res;
        },
        deleteEvent: async (id: string) => {
            const res = await API.GENERAL.getFetch(
                `${API.EVENTS.PREFIX}/delete?id=${id}`
            );
            return res;
        },
    },
};

export default API;
