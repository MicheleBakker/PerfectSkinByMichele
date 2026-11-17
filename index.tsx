import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowRight, ArrowDown, ArrowUp, Heart, Sparkles, Leaf, Menu, X, MessageCircle, Clock3, Instagram, Phone, Mail, MapPin, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { salon, openingHours, whatsappUrl, directionsUrl } from '@/lib/salon';
import { treatments } from '@/lib/treatments';
import hero from '@/assets/beauty-hero.jpg';
import skincare from '@/assets/skincare.jpg';

const description = 'Ontdek Powderbrows, Wimperlifting, Wenkbrauw shaping, Skincare en Cupping bij Perfect Skin by Michele. Persoonlijke aandacht, uitsluitend op afspraak.';
export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Perfect Skin by Michele | Beauty & Skincare' },
    { name: 'description', content: description },
    { property: 'og:title', content: 'Perfect Skin by Michele | Beauty & Skincare' },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

const navigation = [['home', 'Home'], ['behandelingen', 'Behandelingen'], ['over-michele', 'Over Michele'], ['openingstijden', 'Openingstijden'], ['galerij', 'Galerij'], ['contact', 'Contact']];
function Wordmark() {
  return <a className="wordmark" href="#home" aria-label="Perfect Skin by Michele — naar home"><span className="wordmark-main">Perfect Skin</span><span className="wordmark-sub">by Michele</span></a>;
}
function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [category, setCategory] = useState('Alles');
  const [appointment, setAppointment] = useState<string | null>(null);
  const [photo, setPhoto] = useState<(typeof treatments)[number] | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  function book(treatment?: string) {
    const url = whatsappUrl(salon.whatsapp, treatment);
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
    else setAppointment(treatment || 'algemeen');
  }
  const shown = category === 'Alles' ? treatments : treatments.filter(item => item.name === category);
  const contacts = [
    { label: 'WhatsApp', value: salon.phone, href: whatsappUrl(salon.whatsapp) || '', icon: MessageCircle },
    { label: 'Instagram', value: '@perfectskinbymichele', href: salon.instagram, icon: Instagram },
    { label: 'Telefoon', value: salon.phone, href: salon.phone ? `tel:${salon.phone.replace(/\s/g, '')}` : '', icon: Phone },
    { label: 'E-mail', value: salon.email, href: salon.email ? `mailto:${salon.email}` : '', icon: Mail },
    { label: 'Salonadres', value: salon.address, href: salon.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(salon.address)}` : '', icon: MapPin },
  ];
  return <>
    <header className="site-header"><div className="header-inner">
      <Wordmark />
      <nav className="desktop-nav" aria-label="Hoofdnavigatie">{navigation.map(([id,label]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>{label}</a>)}</nav>
      <Button variant="salon" className="header-appointment" onClick={() => book()}><MessageCircle /> Maak een afspraak</Button>
      <Button variant="ghost" size="icon" className="mobile-toggle" aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
    </div>{menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobiele navigatie">{navigation.map(([id,label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}<Button variant="salon" onClick={() => { setMenuOpen(false); book(); }}><MessageCircle /> Maak een afspraak</Button></nav>}</header>
    <main>
      <section id="home" className="hero">
        <img className="hero-photo" src={hero} alt="Sfeerbeeld van een ontspannen vrouw tijdens een verzorgende gezichtsbehandeling" width={1920} height={1024} fetchPriority="high" />
        <div className="hero-content reveal">
          <div className="eyebrow">Beauty, skincare & persoonlijke aandacht</div>
          <h1>Perfect Skin<span>by Michele</span></h1>
          <p className="hero-slogan">Jouw schoonheid, mijn passie.</p>
          <p className="hero-intro">Welkom bij Perfect Skin by Michele. Een plek waar schoonheid, verzorging en persoonlijke aandacht samenkomen. Ontdek onze behandelingen en gun jezelf een moment van ontspanning.</p>
          <div className="hero-actions"><Button variant="salon" asChild><a href="#behandelingen">Bekijk behandelingen <ArrowRight /></a></Button><Button variant="salon-outline" onClick={() => book()}><MessageCircle /> Maak een afspraak</Button></div>
          <p className="hero-footnote"><Clock3 size={13} /> Uitsluitend op afspraak · Alle aandacht voor jou</p>
        </div>
        <a href="#behandelingen" className="hero-scroll"><ArrowDown size={14} /> Ontdek jouw moment</a>
      </section>
      <div className="values-strip"><span><Heart /> Persoonlijke aandacht</span><span><Sparkles /> Natuurlijke schoonheid</span><span><Leaf /> Een moment voor jezelf</span></div>
      <section id="behandelingen" className="section-space"><div className="section-inner">
        <div className="section-heading"><div className="eyebrow">Met zorg, speciaal voor jou</div><h2>Onze behandelingen</h2><p>Een frisse blik, een stralende huid. Ontdek wat bij jou past.</p></div>
        <div className="treatment-grid">{treatments.map(item => <article className="treatment-card" key={item.name}>
          <div className="treatment-image"><img src={item.image} className={item.imageClass} alt={`Sfeerbeeld bij ${item.name}, geen behandelresultaat van Michele`} width={1024} height={1024} loading="lazy" /></div>
          <h3>{item.name}</h3><p>{item.description}</p>
          <div className="treatment-meta"><span>Prijs: {item.price || 'nog in te vullen'}</span><span>Behandeltijd: {item.duration || 'nog in te vullen'}</span></div>
          <Button variant="salon-link" onClick={() => book(item.name)} aria-label={`Afspraak aanvragen voor ${item.name}`}>Afspraak aanvragen <ArrowRight /></Button>
        </article>)}</div>
        <p className="photo-disclaimer">De afbeeldingen zijn tijdelijke sfeerbeelden, geen behandelresultaten van Michele.</p>
      </div></section>
      <section id="over-michele" className="about section-space"><div className="section-inner about-grid">
        <div className="about-photo-wrap"><img src={salon.michelePhoto || skincare} className="about-photo" alt={salon.michelePhoto ? 'Michele van Perfect Skin by Michele' : 'Tijdelijk sfeerbeeld van persoonlijke huidverzorging; niet Michele'} width={1024} height={1024} loading="lazy" /><p className="about-caption">{salon.michelePhoto ? 'Michele · Perfect Skin by Michele' : 'Sfeerbeeld · Persoonlijke foto van Michele volgt'}</p></div>
        <div className="about-copy"><div className="eyebrow">De persoon achter Perfect Skin</div><h2>Ontmoet Michele</h2><p>Bij Perfect Skin by Michele draait alles om persoonlijke aandacht, verzorging en het versterken van jouw natuurlijke schoonheid. Iedere behandeling wordt met zorg en aandacht uitgevoerd.</p><div className="about-signature">Met liefde, Michele</div><Button variant="salon-outline" onClick={() => book()}>Een moment voor jezelf <ArrowRight /></Button><div className="about-note"><Heart size={16} /> Jouw wensen. Jouw schoonheid. Jouw moment.</div></div>
      </div></section>
      <section id="openingstijden" className="section-space"><div className="section-inner hours-grid">
        <div className="hours-copy"><div className="eyebrow">Tijd voor jou</div><h2>Van harte welkom</h2><p>Gun jezelf een moment van verzorging en ontspanning. Ik ontvang je graag op een tijdstip dat bij jou past.</p><Button variant="salon-outline" onClick={() => book()}><MessageCircle /> Vraag een afspraak aan</Button></div>
        <div><h3 className="mb-5 text-3xl">Openingstijden</h3><dl className="hours-list">{openingHours.map(row => <div className="hours-row" key={row.day}><dt>{row.day}</dt><dd>{row.hours}</dd></div>)}</dl><p className="hours-note"><Clock3 size={14} /> Uitsluitend op afspraak.</p></div>
      </div></section>
      <section id="galerij" className="gallery section-space"><div className="section-inner">
        <div className="section-heading"><div className="eyebrow">Een blik in onze wereld</div><h2>Schoonheid in beeld</h2><p>Een impressie van onze behandelingen en verzorging.</p></div>
        <div className="gallery-tabs" role="group" aria-label="Galerijcategorie">{['Alles', ...treatments.map(item => item.name)].map(name => <Button key={name} variant="salon-link" aria-pressed={category === name} className={category === name ? 'selected' : ''} onClick={() => setCategory(name)}>{name}</Button>)}</div>
        <div className="gallery-grid">{shown.map(item => <div className="gallery-item" key={item.name}><Button variant="ghost" className="gallery-image-button" onClick={() => setPhoto(item)} aria-label={`Vergroot sfeerbeeld ${item.name}`}><img src={item.image} alt={`Tijdelijk sfeerbeeld ${item.name}`} className={item.imageClass} width={1024} height={1024} loading="lazy" /></Button><p>{item.name}<span>Sfeerbeeld</span></p></div>)}</div>
        <p className="photo-disclaimer">Tijdelijke sfeerbeelden ter inspiratie. Echte foto's van de salon en behandelresultaten volgen.</p>
      </div></section>
      <section className="appointment-band"><div className="eyebrow">Je verdient een moment voor jezelf</div><h2>Jouw volgende beauty-moment</h2><p>Een vraag over een behandeling of klaar voor een afspraak?<br />Stuur een berichtje. Ik denk graag met je mee.</p><Button variant="salon-light" onClick={() => book()}>🤎 Maak een afspraak <ArrowRight /></Button>{!salon.whatsapp && <p className="unconfigured">WhatsApp-nummer nog in te vullen — afspraken zijn nog niet beschikbaar.</p>}</section>
      <section id="contact" className="section-space"><div className="section-inner contact-grid"><div className="contact-copy"><div className="eyebrow">Laten we kennismaken</div><h2>Neem contact op</h2><p>Je bent van harte welkom bij Perfect Skin by Michele. Neem gerust contact op voor vragen of een afspraak.</p></div><div className="contact-list">{contacts.map(({label,value,href,icon: Icon}) => <div className="contact-item" key={label}>{label === 'Instagram' && href ? <Button asChild variant="salon-link" className="contact-icon-link"><a href={href} target="_blank" rel="noopener noreferrer" aria-label="Instagram van Perfect Skin by Michele" title="Instagram van Perfect Skin by Michele"><Icon /></a></Button> : <Icon />}<div><strong>{label}</strong>{value && href ? <a href={href} target={href.startsWith('https:') ? '_blank' : undefined} rel={href.startsWith('https:') ? 'noopener noreferrer' : undefined}>{value}</a> : <p>Nog in te vullen</p>}{label === 'Salonadres' && salon.address && <Button asChild variant="salon-link" className="contact-directions"><a href={directionsUrl(salon.address)} target="_blank" rel="noopener noreferrer">Routebeschrijving <ArrowRight /></a></Button>}</div></div>)}</div></div></section>
    </main>
    <footer className="site-footer"><Wordmark /><p>© {new Date().getFullYear()} Perfect Skin by Michele · Met zorg en persoonlijke aandacht.</p><div className="footer-actions"><Button asChild variant="ghost" size="icon"><a href={salon.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram van Perfect Skin by Michele" title="Instagram van Perfect Skin by Michele"><Instagram /></a></Button><a href="#home" className="footer-top">Terug naar boven <ArrowUp size={14} /></a></div></footer>
    <Button variant="salon" className="floating-appointment" onClick={() => book()} aria-label="Afspraak aanvragen via WhatsApp" title="Afspraak aanvragen via WhatsApp"><MessageCircle /></Button>
    <Dialog open={appointment !== null} onOpenChange={open => { if (!open) setAppointment(null); }}><DialogContent><DialogTitle>Even geduld, jouw moment komt eraan</DialogTitle><DialogDescription>Het WhatsApp-nummer van Michele is nog niet ingevuld. Daarom kun je op dit moment nog geen afspraak aanvragen{appointment && appointment !== 'algemeen' ? ` voor ${appointment}` : ''}. Zodra het nummer beschikbaar is, opent deze knop direct een WhatsApp-gesprek.</DialogDescription><Button variant="salon" onClick={() => { setAppointment(null); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Naar contactgegevens <ArrowRight /></Button></DialogContent></Dialog>
    <Dialog open={photo !== null} onOpenChange={open => { if (!open) setPhoto(null); }}><DialogContent><DialogTitle>{photo?.name}</DialogTitle><DialogDescription>Tijdelijk sfeerbeeld, geen behandelresultaat van Michele.</DialogDescription>{photo && <img src={photo.image} alt={`Vergroot sfeerbeeld ${photo.name}`} width={1024} height={1024} className="w-full rounded" />}</DialogContent></Dialog>
  </>;
}
