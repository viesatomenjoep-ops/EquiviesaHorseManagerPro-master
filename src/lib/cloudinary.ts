import { Cloudinary } from '@cloudinary/url-gen';

// Installeer de Cloudinary instance voor de Equiviesa app.
// Zorg ervoor dat je VITE_CLOUDINARY_CLOUD_NAME toevoegt in je .env.local bestand!
export const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo' 
  }
});

// Tip: Gebruik de <AdvancedImage> of <AdvancedVideo> componenten 
// uit @cloudinary/react in je dashboard om media haarscherp en geoptimaliseerd in te laden!
