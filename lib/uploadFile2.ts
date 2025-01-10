import { supabase } from './supabase'

export const uploadFile = async (file: File) => {
  try {
    if (!file) throw new Error('Aucun fichier fourni');

    // Créer un nom de fichier unique avec timestamp
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `uploads/${fileName}` // Ajout d'un dossier pour mieux organiser

    // Vérifier la taille du fichier (exemple: limite à 2MB)
    if (file.size > 2 * 1024 * 1024) {
      throw new Error('Le fichier est trop volumineux');
    }

    // Upload du fichier
    const { data, error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) throw uploadError

    // Obtenir l'URL publique
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)

    return publicUrl
  } catch (error) {
    console.error('Erreur lors de l\'upload:', error)
    throw error
  }
}