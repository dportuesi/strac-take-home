'use client';

import {DriveFile, getFiles} from "@/app/lib/listFiles";
import {ChangeEvent, FormEvent, useState} from "react";
import {uploadFiles} from "@/app/lib/uploadFiles";
import {useCookies} from "next-client-cookies";
import FileList from "@/app/components/FileList";

export default function Page() {
    const [file, setFile] = useState<File | undefined>()
    const [loadedFiles, setLoadedFiles] = useState<DriveFile[]>([])
    const cookies = useCookies()

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files ? event.target.files[0] : undefined
        setFile(file)
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (file !== undefined) {
            const accessToken = cookies.get("access-token");
            if (accessToken) {
                await uploadFiles(file, accessToken)
            }
        }
    }

    const loadFiles = async () => {
        const files = await getFiles();
        if (files) {
            setLoadedFiles(files)
        }
    }
    return (
        <div
            className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 mt-8 items-center sm:items-start">
                <h1 className="text-xl">
                    Drive Wrapper (Strac take home)
                </h1>
                <form onSubmit={handleSubmit}>
                    <h1>File Upload </h1>
                    <input
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                        type="file" onChange={handleChange}/>
                    <button
                        className="ml-4 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit">
                        Upload
                    </button>
                </form>
                <button type="button" onClick={() => loadFiles()}>
                    Get Files
                </button>
                <FileList loadedFiles={loadedFiles} />
            </main>
        </div>
    )
}