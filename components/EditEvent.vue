<template>
    <FormDialog :onSave="editEvent" :onCancel="props.onClose">
        <div class="flex justify-end">
            <Button width="66" @click="deleteEvent"><DeleteIcon /></Button>
        </div>
        <Field
            type="text"
            placeholder="Input name"
            label="Name"
            :value="name"
            @update:modelValue="name = $event"
        />
        <Field
            type="text"
            placeholder="Input description"
            label="Description"
            :value="description"
            @update:modelValue="description = $event"
        />
        <Field
            type="datetime-local"
            placeholder="Input date and time"
            label="Date and time"
            :value="datetime"
            @update:modelValue="datetime = $event"
        />
    </FormDialog>
</template>
<script lang="ts" setup>
import { FormDialog, Field, Button } from "~/ui";
import { ref } from "vue";
import { DeleteIcon } from "../assets/icons";
import { API } from "../utils";
import { useSnackbar } from "~/composables";
interface Props {
    onClose: () => void;
    id: number;
    name: string;
    description: string;
    date: string;
    time: string;
}
const { showSnackbar } = useSnackbar();
const props = defineProps<Props>();
const name = ref<string>(props.name);
const description = ref<string>(props.description);
const emit = defineEmits(["edit"]);
const transformToDateLocaleString = () => {
    const date = props.date.split("T")[0];
    return `${date}T${props.time}`;
};
const datetime = ref<string>(transformToDateLocaleString());

const editEvent = async () => {
    const date = datetime.value.split("T")[0];
    const time = datetime.value.split("T")[1];
    const event = {
        _id: props.id,
        name: name.value,
        description: description.value,
        date: date,
        time: time,
    };
    await API.EVENTS.editEvent(event);
    showSnackbar("Event edited successfully", "success");
    props.onClose();
    emit("edit");
};

const deleteEvent = async () => {
    const res = await API.EVENTS.deleteEvent(props.id);
    showSnackbar("Event deleted successfully", "success");
    props.onClose();
    emit("edit");
};
</script>
