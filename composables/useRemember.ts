import { ref, onMounted, onUnmounted } from "vue";

export default function useRemember() {
    const values = new Map<string, ReturnType<typeof ref>>();
    const isBrowser = typeof window !== "undefined";

    const getRemember = (key: string) => {
        if (!isBrowser) return;
        const fullKey = `storage-${key}`;
        if (!values.has(fullKey)) {
            const stored = localStorage.getItem(fullKey);
            const reactiveRef = ref(stored);
            values.set(fullKey, reactiveRef);
        }
        return values.get(fullKey)?.value!;
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
        if (e.key && values.has(e.key)) {
            console.log("siii", e.newValue);
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
