export const WHATSAPP_NUMBER = '5521996606109';
export const DISCORD_INVITE_URL = 'https://discord.gg/VgqfYC97tE';

export const getWhatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
