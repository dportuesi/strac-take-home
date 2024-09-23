import {DriveFile} from "@/app/lib/listFiles";

interface FileListProps {
    loadedFiles: DriveFile[]
}

/**
 * List component that renders files from google drive
 * @param loadedFiles
 * @constructor
 */
export default function FileList({loadedFiles}: FileListProps) {
    return (
        <ul>
            {loadedFiles.map((item: DriveFile, index: number) => (
                <li key={index} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                    <p>{item.title}</p>
                </li>
            ))}
        </ul>
    )
}