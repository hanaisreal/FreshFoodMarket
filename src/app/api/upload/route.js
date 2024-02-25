import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from 'uniqid';

export async function POST(req) {
    const data = await req.formData();
    if(data.get('file')){
        const file = data.get('file')

        const s3Client = new S3Client({
          region: 'us-east-1',
          credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY,
              secretAccessKey: process.env.AWS_SECRET_KEY
          }
      })

      const extension = file.name.split('.').slice(-1)[0];
      const newFileName = uniqid() + '.' + extension;

      const chunks = [];
      for await(const chunk of file.stream()){
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);

      s3Client.send(new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: newFileName,
          ACL: 'public-read',
          ContentType: file.type,
          Body: buffer,
      }));

      return Response.json('https://'+process.env.AWS_BUCKET_NAME+'.s3.amazonaws.com/'+newFileName)
  
  

    }

  return Response.json(true)
}