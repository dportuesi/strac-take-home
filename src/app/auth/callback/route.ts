import { NextResponse } from 'next/server';
import {OAuth2Client} from "google-auth-library";
import {getCookies} from "next-client-cookies/server";

export async function GET(request: Request) {
    const {searchParams, origin} = new URL(request.url);
    const code = searchParams.get('code');
    const nonNullCode = code ? code : ""

    try {
        const oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.REDIRECT_URL,
        )

        const res = await oAuth2Client.getToken(nonNullCode);
        oAuth2Client.setCredentials(res.tokens);
        const user = oAuth2Client.credentials
        console.log('credentials', user)
        const accessToken = user.access_token ? user.access_token : ""
        const cookies = getCookies();
        cookies.set("access-token", accessToken);

        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${user.access_token}`)
        const data = await response.json();
        console.log(data);

        return NextResponse.redirect(`${origin}/drive`)
    } catch (e) {
        console.log(e)
        return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }
}