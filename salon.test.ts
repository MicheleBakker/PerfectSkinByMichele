import { describe, it, expect } from 'vitest';
import { salon, openingHours, whatsappUrl, directionsUrl } from './salon';

describe('Salon contact details', () => {
  it('uses the supplied Instagram account', () => {
    expect(salon.instagram).toBe('https://www.instagram.com/perfectskinbymichele/');
  });
  it('uses only the supplied street and house number as the route destination', () => {
    expect(salon.address).toBe('Claravisserstraat 33');
    const url = new URL(directionsUrl(salon.address));
    expect(url.origin + url.pathname).toBe('https://www.google.com/maps/dir/');
    expect(url.searchParams.get('api')).toBe('1');
    expect(url.searchParams.get('destination')).toBe('Claravisserstraat 33');
  });
});

describe('WhatsApp appointments', () => {
  it('uses the real salon number from one central phone setting', () => {
    expect(salon.phone).toBe('06 22863731');
    expect(salon.whatsapp).toBe('31622863731');
  });
  it('returns no link when the number is absent', () => {
    expect(whatsappUrl('')).toBeNull();
  });
  it('encodes the exact general appointment message', () => {
    const url = new URL(whatsappUrl(salon.whatsapp) || 'https://invalid.example');
    expect(url.origin + url.pathname).toBe('https://wa.me/31622863731');
    expect(url.searchParams.get('text')).toBe('Hallo Michele! Ik wil graag een afspraak maken bij Perfect Skin by Michele.');
  });
  it.each(['Powderbrows', 'Wimperlifting', 'Wenkbrauw shaping', 'Skincare', 'Cupping'])('includes the chosen treatment %s', treatment => {
    const url = new URL(whatsappUrl(salon.whatsapp, treatment) || 'https://invalid.example');
    expect(url.pathname).toBe('/31622863731');
    expect(url.searchParams.get('text')).toBe(`Hallo Michele! Ik wil graag een afspraak maken voor ${treatment}.`);
  });
  it('rejects invalid phone placeholders', () => { expect(whatsappUrl('316XXXXXXXX')).toBeNull(); });
});
describe('Opening hours', () => {
  it.each(['Maandag', 'Dinsdag', 'Donderdag', 'Vrijdag'])('%s opens 09:00–14:00', day => {
    expect(openingHours.find(row => row.day === day)?.hours).toBe('09:00 – 14:00');
  });
  it('includes Wednesday evening', () => { expect(openingHours.find(row => row.day === 'Woensdag')?.hours).toBe('09:00 – 14:00 en 19:00 – 22:00'); });
  it.each(['Zaterdag', 'Zondag'])('%s is closed', day => { expect(openingHours.find(row => row.day === day)?.hours).toBe('Gesloten'); });
});
