'use server'

import {OAuth2Client} from "google-auth-library";

export async function getAuthUrl(): Promise<string> {
    const oAuth2Client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.REDIRECT_URL,
    )
    try {
        return oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive openid ',
            prompt: 'consent'
        })
    } catch (error) {
        return error as string
    }
}