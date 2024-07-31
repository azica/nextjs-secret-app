import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const key = url.searchParams.get('key');
    const iframe = url.searchParams.get('iframe');

    if (!key) {
        return new NextResponse('Key is required', { status: 400 });
    }

    if (iframe === 'true') {
        const iframeUrl = new URL('/iframe.html', url.origin);
        iframeUrl.searchParams.set('key', key);
        return NextResponse.json({ iframeUrl: iframeUrl.toString() });
    }

    const response = NextResponse.redirect(new URL('/', url.origin));
    response.cookies.set('key', key, { httpOnly: true, path: '/' });
    return response;
}
