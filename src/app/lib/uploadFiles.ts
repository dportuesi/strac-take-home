'use client'

export async function uploadFiles(file: File, accessToken: string) {
    const url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=media';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            method: 'POST',
            body: formData,
        });

        // Handle successful upload
        const data = await response.json();
        console.log('File uploaded successfully:', data);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}