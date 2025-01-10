import { pinata } from "@/utils/config";

export const uploadFile = async (file: File) => {
  if (!file) {
    throw new Error("Aucun fichier sélectionné");
  }


  try {
    // Récupération de la clé JWT depuis votre API
    const keyRequest = await fetch("/api/key");
    if (!keyRequest.ok) {
      throw new Error("Échec de récupération de la clé API");
    }
    const keyData = await keyRequest.json();

    const formData = new FormData();
    formData.append('file', file);

    // Ajout des métadonnées
    const metadata = JSON.stringify({
      name: file.name,
      keyvalues: {
        fileType: file.type,
        size: file.size
      }
    });
    formData.append('pinataMetadata', metadata);

    // Options de pinning
    const options = JSON.stringify({
      cidVersion: 1,
      wrapWithDirectory: false
    });
    formData.append('pinataOptions', options);

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${keyData.JWT}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        `Erreur Pinata (${response.status}): ${errorData?.error?.details || response.statusText}`
      );
    }

    const result = await response.json();
    
    if (!result.IpfsHash) {
      throw new Error("Hash IPFS manquant dans la réponse");
    }
    
    const imageUrl = `https://moccasin-defensive-anglerfish-751.mypinata.cloud/ipfs/${result.IpfsHash}`;
    
    console.log("URL générée:", imageUrl);
    
    if (imageUrl.includes('ipfs/ipfs/') || imageUrl.includes('ipfs/https://')) {
      throw new Error("URL mal formée");
    }
    
    return imageUrl;

  } catch (error) {
    console.error("Erreur lors de l'upload:", error);
    throw error instanceof Error 
      ? error 
      : new Error("Erreur inattendue lors de l'upload");
  }
};
