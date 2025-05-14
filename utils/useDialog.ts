import { ref } from "vue";

export default function useDialog() {
    const opened = ref<boolean>(false);
    const openDialog = () => {
        opened.value = true;
    };
    const closeDialog = () => (opened.value = false);
    return { opened, openDialog, closeDialog };
}
