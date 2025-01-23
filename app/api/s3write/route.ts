// app/api/s3write/route.ts
import { S3Client } from "bun";
import { NextResponse } from 'next/server';

// Initialize S3 client
const client = new S3Client({
  accessKeyId: "admin",
  secretAccessKey: "T7Hty3@^wLAHLU",
  endpoint: "http://192.168.0.71:9000",
  bucket: "test",
});

// Set default client
Bun.s3 = client;

export async function POST(request: Request) {
  try {
    const { content } = await request.json();
    
    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const file = Bun.s3.file("my-file.txt");
    await file.write(content);

    return NextResponse.json(
      { message: 'Successfully wrote to S3' },
      { status: 200 }
    );
  } catch (error) {
    console.error('S3 write error:', error);
    return NextResponse.json(
      { error: 'Failed to write to S3' },
      { status: 500 }
    );
  }
}
