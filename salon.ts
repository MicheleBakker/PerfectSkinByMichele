const phone = '06 22863731';

export const salon = {
  name: 'Perfect Skin by Michele',
  whatsapp: `31${phone.replace(/\s/g, '').slice(1)}`,
  phone,
  email: '',
  instagram: 'https://www.instagram.com/perfectskinbymichele/',
  address: 'Claravisserstraat 33',
  michelePhoto: '',
};

export const openingHours = [
  { day: 'Maandag', hours: '09:00 – 14:00' },
  { day: 'Dinsdag', hours: '09:00 – 14:00' },
  { day: 'Woensdag', hours: '09:00 – 14:00 en 19:00 – 22:00' },
  { day: 'Donderdag', hours: '09:00 – 14:00' },
  { day: 'Vrijdag', hours: '09:00 – 14:00' },
  { day: 'Zaterdag', hours: 'Gesloten' },
  { day: 'Zondag', hours: 'Gesloten' },
];

export function whatsappUrl(number: string, treatment?: string) {
  const digits = number.replace(/[\s()+-]/g, '');
  if (!/^[1-9]\d{7,14}$/.test(digits)) return null;
  const message = treatment
    ? `Hallo Michele! Ik wil graag een afspraak maken voor ${treatment}.`
    : 'Hallo Michele! Ik wil graag een afspraak maken bij Perfect Skin by Michele.';
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function directionsUrl(address: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}