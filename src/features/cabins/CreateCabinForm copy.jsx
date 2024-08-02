import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabins } from "../../services/apiCabins";

function CreateCabinForm() {
  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
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
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "This is required",
          })}
        />
      </FormRow>

      <FormRow2>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add Cabin</Button>
      </FormRow2>
    </Form>
  );
}

export default CreateCabinForm;
