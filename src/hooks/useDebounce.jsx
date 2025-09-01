import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);




  return debouncedValue;
}

export function usePatchMutation({ onSuccess, onError }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ url, data }) => {
      return await axios.patch(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: (data) => {
      // Default behavior
      queryClient.invalidateQueries(["recent-key"]);

      if (onSuccess) onSuccess(data);
    },
    onError: (err) => {
      console.error("PATCH error:", err);
      if (onError) onError(err);
    },
  });
}


export default useDebounce;
