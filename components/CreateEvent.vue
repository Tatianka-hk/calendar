<template>
    <FormDialog :onSave="createEvent" :onCancel="props.onClose">
        <Field
            type="text"
            placeholder="Input name"
            label="Name"
            v-model="name"
            :value="name"
        />
        <Field
            type="text"
            placeholder="Input description"
            label="Description"
            v-model="description"
            :value="description"
        />
        <Field
            type="datetime-local"
            placeholder="Input date and time"
            label="Date and time"
            v-model="datetime"
            :value="datetime"
        />
    </FormDialog>
</template>
<script lang="ts" setup>
import { FormDialog, Field } from "~/ui";
import { ref } from "vue";
import { useSnackbar } from "~/composables";
const { showSnackbar } = useSnackbar();
interface Props {
    onClose: () => void;
}
const props = defineProps<Props>();
const name = ref<string>("");
const description = ref<string>("");
const datetime = ref<string>("");

const createEvent = async () => {
    const date = datetime.value.split("T")[0];
    const time = datetime.value.split("T")[1];
    const event = {
        name: name.value,
        description: description.value,
        date: date,
        time: time,
    };
    const res = await API.EVENTS.createEvent(event);
    const data = await res.json();
    if (data.statusCode != 200) {
        showSnackbar(data.statusMessage, "error");
    }
};
</script>
