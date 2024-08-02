import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabins } from "../../services/apiCabins";
import { isAfter } from "date-fns/fp";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  console.log(isEditSession);

  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  //create cabin
  const { isCreating, createCabin } = useCreateCabin();

  //edit cabin
  const { isEditing, EditCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      EditCabin(
        { newCabinData: { ...data, image }, id: editId },
        { onSuccess: () => reset() }
      );
    } else {
      createCabin({ ...data, image }, { onSuccess: () => reset() });
    }

    console.log(data);
  }

  function onError(errors) {
    console.log(errors, "error message");
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin Name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="MaxCapacity" error={errors.MaxCapacity?.message}>
        <Input
          type="number"
          id="MaxCapacity"
          {...register("MaxCapacity", {
            required: "This is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="regularPrice" error={errors.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="discount" error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This is required",
            validate: (value) =>
              value <= +getValues().regularPrice ||
              "Discount should be less than the regular price",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="description" error={errors.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isEditSession ? "Edit Cabin" : "Create New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
