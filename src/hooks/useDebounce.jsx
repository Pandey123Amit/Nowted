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


export default useDebounce;
