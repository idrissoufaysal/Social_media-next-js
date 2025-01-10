import NextAuth from "next-auth";
import { authConfig } from "@/lib/authConfig";

// // Assurez-vous d'exporter une méthode spécifique, ici ce sera POST pour NextAuth
// export async function POST(request: Request) {
//   const handler = NextAuth(authConfig);
  
//   return handler(request);
// }




// export const GET = POST; // Pour réutiliser la même logique pour la méthode GET


const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
