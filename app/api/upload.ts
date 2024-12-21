import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '@/lib/cloudinary';

type Data = {
  url?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      const { data } = req.body; // Base64-encoded string
      if (!data) {
        res.status(400).json({ error: 'No image data provided' });
        return;
      }

      const uploadResponse = await cloudinary.uploader.upload(data, {
        folder: 'profiles', // Optional: Specify a folder in Cloudinary
      });

      res.status(200).json({ url: uploadResponse.secure_url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Image upload failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
