import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const {origin, pathname} = new URL(request.url);

    // TODO create enums for protected/non protected routes
     if (request.cookies.has('access-token') && pathname !== '/drive') {
         return NextResponse.redirect(`${origin}/drive`)
     } else if (!request.cookies.has('access-token') && pathname !== '/' && pathname !== '/auth/callback') {
         return NextResponse.redirect(`${origin}`)
     }
}
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};