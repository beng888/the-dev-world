import { useRef } from "react";

export default function useCompRenders() {
  const renders = useRef(0);
  console.log("renders", renders.current++);
}
