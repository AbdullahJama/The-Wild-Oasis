import { QueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabins } from "../../services/apiCabins";

export function useEditCabin() {
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabins(newCabinData, id),
    onSuccess: () => {
      toast.success(" Cabin Successfully Edited");
      QueryClient.invalidateQueries({ queryKey: ["Cabins"] });
      reset();
    },
    onError: () => {
      toast.error("Faild to Create a Cabin ");
    },
  });
  return { editCabin, isEditing };
}
