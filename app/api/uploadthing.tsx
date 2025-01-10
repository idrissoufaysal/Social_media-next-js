// // Fichier `pages/api/upload.ts`
// import { NextRequest, NextResponse } from 'next/server';
// import { UploadButton } from '@/utils/uploadthing'; // Configure uploadthing pour l'upload d'image


// export default async function handler(req: NextRequest, res: NextResponse) {
//   if (req.method === 'POST') {
//     try {
//       const image = req.json;  // Assurez-vous que `req.file` contient l'image
//       const imageUrl = await uploadImage(image);  // Fonction d'upload utilisant uploadthing
//       return NextResponse.json({url:imageUrl},{status:200})
//     } catch (error) {
//       return res.status(500).json({ error: 'Erreur lors de l\'upload de l\'image' });
//     }
//   } else {
    
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

