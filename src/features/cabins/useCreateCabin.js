import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabins } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabins,
    onSuccess: () => {
      toast.success("New Cabin Successfully Created");
      queryClient.invalidateQueries({ queryKey: ["Cabins"] });
    },
    onError: () => {
      toast.error("Faild to Create a Cabin ");
    },
  });
  return { createCabin, isCreating };
}
