import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname, searchParams, origin } = request.nextUrl;

    if (pathname === '/secret') {
        const key = searchParams.get('key');
        if (key) {
            const response = NextResponse.redirect(new URL('/', origin));
            response.cookies.set('key', key, { path: '/' });
            return response;
        } else {
            return new NextResponse('Key is required', { status: 400 });
        }
    }

    if (pathname === '/iframe') {
        const key = searchParams.get('key');
        if (key) {
            const iframeUrl = new URL('/home', origin);
            iframeUrl.searchParams.set('key', key);
            return NextResponse.json({ iframeUrl: iframeUrl.toString() });
        } else {
            return new NextResponse('Key is required', { status: 400 });
        }
    }

    if (pathname === '/') {
        const key = request.cookies.get('key');
        if (!key) {
            return NextResponse.redirect(new URL('/404', origin));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/secret', '/iframe'],
};
