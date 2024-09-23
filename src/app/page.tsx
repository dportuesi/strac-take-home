'use client'

import {useRouter} from "next/navigation";
import {getAuthUrl} from "@/app/lib/getAuthUrl";

export default function Home() {
  const router = useRouter()

  const authClicked = async () => {
    const url = await getAuthUrl()
    router.push(url)
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <button
                type="button"
                onClick={() => authClicked()}
                className="ml-4 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Sign in With Google
            </button>
        </main>
    </div>
  );
}
