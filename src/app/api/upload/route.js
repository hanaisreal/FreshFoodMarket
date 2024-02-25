import { S3Client } from "@aws-sdk/client-s3";}

export async function POST(req) {
    const data = await req.formData();
    if(data.get('file')){
        const file = data.get('file')
    }


    console.log(data)
  return Response.json(true)
}