'use server'

import {getCookies} from "next-client-cookies/server";

// TODO add more properties as needed
export interface DriveFile {
    title: string | null | undefined
    mimeType: string | null |undefined
}

export async function getFiles(): Promise<DriveFile[] | undefined> {
    try {
        const cookies = getCookies();
        const accessToken = cookies.get('access-token')
        const res = await fetch(`https://www.googleapis.com/drive/v2/files?access_token=${accessToken}`)
        const json = await res.json()
        // Instead of slicing, this should be done at the api level
        return json.items.map((file: DriveFile) => ({
            title: file.title,
            mimeType: file.mimeType
        })).slice(0, 10)
    } catch (e) {
        console.log(e)
        return undefined
    }
}