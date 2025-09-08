import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // eslint-disable-next-line no-console
  console.log('request:', request);
  return NextResponse.next(); // 继续请求
}
