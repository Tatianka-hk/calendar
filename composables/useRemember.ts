import { ref, onMounted, onUnmounted } from "vue";

export default function useRemember() {
    const values = new Map<string, ReturnType<typeof ref>>();
    const isBrowser = typeof window !== "undefined";

    const getRemember = (key: string) => {
        if (!isBrowser) return;
        if (!values.has(key)) {
            const stored = localStorage.getItem(`storage-${key}`);
            const reactiveRef = ref(stored);
            values.set(key, reactiveRef);
        }
        return values.get(key)!;
    };

    const setRemember = (key: string, value: string) => {
        if (!isBrowser) return;
        localStorage.setItem(`storage-${key}`, value);
        if (values.has(key)) {
            values.get(key)!.value = value;
        }
        const storageEvent = new StorageEvent("storage", {
            key: `storage-${key}`,
            newValue: value,
            oldValue: values.get(key)?.value || null,
            url: window.location.href,
        });
        window.dispatchEvent(storageEvent);
    };

    const handleStorageChange = (e: StorageEvent) => {
        console.log(e);
        if (e.key && values.has(e.key)) {
            values.get(e.key)!.value = e.newValue;
        }
    };

    onMounted(() => {
        window.addEventListener("storage", handleStorageChange);
    });

    onUnmounted(() => {
        window.removeEventListener("storage", handleStorageChange);
    });

    return { getRemember, setRemember };
}
