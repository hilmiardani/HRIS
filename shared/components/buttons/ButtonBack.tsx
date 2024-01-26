import Back from "icons/Back";
import { useRouter } from "next/navigation";

export default function ButtonBack() {
  const router = useRouter()
  return <button onClick={router.back}><Back /></button>
}
