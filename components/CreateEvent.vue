<template>
    <FormDialog :onSave="createEvent" :onCancel="props.onClose">
        <Field
            type="text"
            placeholder="Input name"
            label="Name"
            v-model="name"
        />
        <Field
            type="text"
            placeholder="Input description"
            label="Description"
            v-model="description"
        />
        <Field
            type="datetime-local"
            placeholder="Input date and time"
            label="Date and time"
            v-model="datetime"
        />
    </FormDialog>
</template>
<script lang="ts" setup>
import { FormDialog, Field } from "~/ui";
import { ref } from "vue";
interface Props {
    onClose: () => void;
}
const props = defineProps<Props>();
const name = ref<string>("");
const description = ref<string>("");
const datetime = ref<string>("");

const createEvent = () => {
    //delete datetime to date and time
    const date = datetime.value.split("T")[0];
    const time = datetime.value.split("T")[1];
    console.log(date, time);
    const event = {
        name: name.value,
        description: description.value,
        date: date,
        time: time,
    };
    API.EVENTS.createEvent(event);
};
</script>
