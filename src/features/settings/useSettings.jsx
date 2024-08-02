import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const { isLoading, error, settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  console.log(settings, "my hook");
  console.log(getSettings, "the api");

  if (error) {
    console.error("Error fetching settings:", error);
  }

  return { isLoading, error, settings };
}
