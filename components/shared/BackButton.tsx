// components/BackButton.tsx
"use client"; // Indique que ce composant est un Client Component

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Assurez-vous d'importer votre composant Button

export default function BackButton() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // Retourne à la page précédente
  };

  return (
    <div className="md:flex max-w-5xl w-full">
      <Button variant="ghost" className="shad-button_ghost" onClick={handleGoBack}>
        <Image
          src={"/assets/icons/back.svg"}
          alt="back"
          width={24}
          height={24}
        />
        <p className="small-medium lg:base-medium">Back</p>
      </Button>
    </div>
  );
}