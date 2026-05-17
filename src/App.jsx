import { useState, useEffect, useRef } from "react";

const styles = {
  root: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    background: "#0d0a06",
    color: "#f5ede0",
    minHeight: "100vh",
    overflowX: "hidden",
  },
  // ── NAV ──
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 48px",
    background: "rgba(13,10,6,0.92)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(210,160,80,0.15)",
  },
  navLogo: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#d2a050",
    letterSpacing: "0.08em",
    textDecoration: "none",
  },
  navLinks: {
    display: "flex",
    gap: "32px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: "#c8b89a",
    textDecoration: "none",
    fontSize: "0.9rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    transition: "color 0.2s",
  },
  // ── HERO ──
  hero: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "120px 24px 80px",
    position: "relative",
    background:
      "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(120,70,20,0.35) 0%, transparent 70%), #0d0a06",
  },
  heroTag: {
    display: "inline-block",
    fontSize: "0.72rem",
    letterSpacing: "0.28em",
    textTransform: "uppercase",
    color: "#d2a050",
    border: "1px solid rgba(210,160,80,0.4)",
    padding: "6px 18px",
    borderRadius: "100px",
    marginBottom: "28px",
    animation: "fadeUp 0.8s ease both",
  },
  heroTitle: {
    fontSize: "clamp(2.8rem, 7vw, 6rem)",
    fontWeight: "700",
    lineHeight: 1.08,
    letterSpacing: "-0.02em",
    marginBottom: "16px",
    animation: "fadeUp 0.9s 0.1s ease both",
  },
  heroAccent: { color: "#d2a050" },
  heroSub: {
    fontSize: "clamp(1rem, 2vw, 1.25rem)",
    color: "#a08060",
    maxWidth: "520px",
    lineHeight: 1.7,
    marginBottom: "48px",
    animation: "fadeUp 1s 0.2s ease both",
  },
  heroBtns: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    justifyContent: "center",
    animation: "fadeUp 1.1s 0.3s ease both",
  },
  btnPrimary: {
    padding: "14px 34px",
    background: "#d2a050",
    color: "#0d0a06",
    border: "none",
    borderRadius: "4px",
    fontSize: "0.9rem",
    fontWeight: "700",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "background 0.2s, transform 0.15s",
  },
  btnOutline: {
    padding: "14px 34px",
    background: "transparent",
    color: "#d2a050",
    border: "1px solid rgba(210,160,80,0.5)",
    borderRadius: "4px",
    fontSize: "0.9rem",
    fontWeight: "600",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "border-color 0.2s, color 0.2s",
  },
  heroStats: {
    display: "flex",
    gap: "56px",
    marginTop: "72px",
    flexWrap: "wrap",
    justifyContent: "center",
    animation: "fadeUp 1.2s 0.4s ease both",
  },
  heroStat: { textAlign: "center" },
  heroStatNum: { fontSize: "2rem", fontWeight: "700", color: "#d2a050" },
  heroStatLabel: { fontSize: "0.75rem", letterSpacing: "0.15em", color: "#806040", textTransform: "uppercase" },
  // ── SECTIONS ──
  section: { padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" },
  sectionLabel: {
    fontSize: "0.7rem",
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    color: "#d2a050",
    marginBottom: "12px",
    display: "block",
  },
  sectionTitle: {
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: "700",
    lineHeight: 1.15,
    marginBottom: "16px",
  },
  sectionDesc: { color: "#9a7f60", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: "560px" },
  divider: { borderColor: "rgba(210,160,80,0.12)", margin: "0" },
  // ── MENU GRID ──
  menuGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
    marginTop: "56px",
  },
  menuCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(210,160,80,0.1)",
    borderRadius: "8px",
    padding: "32px",
    transition: "border-color 0.25s, transform 0.2s",
    cursor: "default",
  },
  menuEmoji: { fontSize: "2.4rem", marginBottom: "16px" },
  menuName: { fontSize: "1.2rem", fontWeight: "600", marginBottom: "8px", color: "#f5ede0" },
  menuDesc: { fontSize: "0.9rem", color: "#806040", lineHeight: 1.6, marginBottom: "16px" },
  menuPrice: { fontSize: "1rem", color: "#d2a050", fontWeight: "700" },
  menuTag: {
    display: "inline-block",
    fontSize: "0.65rem",
    padding: "3px 10px",
    background: "rgba(210,160,80,0.12)",
    color: "#d2a050",
    borderRadius: "100px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginLeft: "10px",
  },
  // ── FEATURES ──
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "32px",
    marginTop: "56px",
  },
  featureCard: {
    padding: "28px 24px",
    borderLeft: "2px solid rgba(210,160,80,0.25)",
    paddingLeft: "24px",
  },
  featureIcon: { fontSize: "1.8rem", marginBottom: "12px" },
  featureTitle: { fontSize: "1rem", fontWeight: "600", marginBottom: "8px", color: "#e8d5b5" },
  featureText: { fontSize: "0.88rem", color: "#7a6040", lineHeight: 1.65 },
  // ── TESTIMONIALS ──
  testimonialsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
    marginTop: "56px",
  },
  testimonialCard: {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(210,160,80,0.08)",
    borderRadius: "8px",
    padding: "28px",
  },
  stars: { color: "#d2a050", fontSize: "0.9rem", marginBottom: "12px", letterSpacing: "3px" },
  testimonialText: { fontSize: "0.95rem", color: "#c8b89a", lineHeight: 1.7, marginBottom: "16px", fontStyle: "italic" },
  testimonialName: { fontSize: "0.8rem", color: "#806040", letterSpacing: "0.1em", textTransform: "uppercase" },
  // ── INFO BAR ──
  infoBar: {
    background: "rgba(210,160,80,0.06)",
    borderTop: "1px solid rgba(210,160,80,0.1)",
    borderBottom: "1px solid rgba(210,160,80,0.1)",
    padding: "40px 24px",
  },
  infoBarInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "32px",
    textAlign: "center",
  },
  infoItem: {},
  infoIcon: { fontSize: "1.6rem", marginBottom: "10px" },
  infoTitle: { fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#d2a050", marginBottom: "6px" },
  infoText: { fontSize: "0.9rem", color: "#9a7f60", lineHeight: 1.5 },
  // ── MAP CTA ──
  mapCta: {
    background: "linear-gradient(135deg, rgba(120,70,20,0.18) 0%, rgba(13,10,6,0) 60%)",
    border: "1px solid rgba(210,160,80,0.12)",
    borderRadius: "12px",
    padding: "64px 48px",
    textAlign: "center",
    maxWidth: "700px",
    margin: "0 auto",
  },
  // ── FOOTER ──
  footer: {
    background: "#070503",
    borderTop: "1px solid rgba(210,160,80,0.08)",
    padding: "48px 24px 32px",
  },
  footerInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "40px",
    marginBottom: "40px",
  },
  footerLogo: { fontSize: "1.4rem", fontWeight: "700", color: "#d2a050", marginBottom: "12px" },
  footerText: { fontSize: "0.85rem", color: "#5a4030", lineHeight: 1.7 },
  footerHeading: { fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#d2a050", marginBottom: "16px" },
  footerLinks: { listStyle: "none", padding: 0, margin: 0 },
  footerLink: { color: "#7a6040", fontSize: "0.88rem", marginBottom: "8px", cursor: "pointer", textDecoration: "none" },
  footerBottom: {
    borderTop: "1px solid rgba(210,160,80,0.06)",
    paddingTop: "24px",
    textAlign: "center",
    fontSize: "0.78rem",
    color: "#4a3525",
  },
  schemaHidden: { display: "none" },
};

const menuItems = [
  { emoji: "🍵", name: "Pondy Special Chai", desc: "Our signature brew — ginger, cardamom, tulsi, and Nilgiri CTC. The taste Pondicherry wakes up to.", price: "₹35", tag: "Best Seller" },
  { emoji: "🧋", name: "French Quarter Milk Tea", desc: "Inspired by Pondy's colonial past — strong Assam tea with frothy cold milk and a hint of vanilla.", price: "₹80", tag: "Signature" },
  { emoji: "🌿", name: "Tulsi Kashmiri Kahwa", desc: "Premium green tea with saffron, cinnamon, and rose petals. A cup of serenity.", price: "₹90" },
  { emoji: "☕", name: "Filter Coffee", desc: "South Indian kaapi done right — double-decoction, full-cream milk, frothy and strong.", price: "₹40", tag: "Popular" },
  { emoji: "🍋", name: "Lemon Ginger Iced Tea", desc: "Freshly brewed black tea, squeezed lemon, raw ginger. Refreshing on Pondy's hot afternoons.", price: "₹70" },
  { emoji: "🌸", name: "Rose Hibiscus Herbal", desc: "Caffeine-free blend of rose buds and hibiscus petals. Calming, floral, and naturally sweet.", price: "₹75" },
  { emoji: "🥛", name: "Masala Elaichi Chai", desc: "Classic Indian chai elevated with whole spices — pepper, cloves, star anise, cardamom.", price: "₹40", tag: "Classic" },
  { emoji: "🍵", name: "Darjeeling First Flush", desc: "Light, muscatel aroma. The champagne of Indian teas, served in a glass pot.", price: "₹120", tag: "Premium" },
  { emoji: "🧊", name: "Brown Sugar Bubble Tea", desc: "Taiwanese-style milk tea with chewy tapioca pearls and caramelised brown sugar swirls.", price: "₹130" },
];

const features = [
  { icon: "🌿", title: "100% Natural Ingredients", text: "Every blend uses whole spices, fresh herbs, and single-origin tea leaves sourced from Nilgiri and Assam estates." },
  { icon: "🏡", title: "Cozy French Quarter Ambience", text: "Set in a heritage building on Rue Suffren, Pondicherry — warm lighting, rustic wood, vintage maps." },
  { icon: "☀️", title: "Open Early to Late", text: "From the morning commute chai to the late-evening relaxed brew — we're open 7 AM to 10 PM every day." },
  { icon: "🛵", title: "Home Delivery in Pondy", text: "Get your favourite cup delivered hot and fresh within 5 km of White Town, Puducherry." },
  { icon: "📖", title: "Study & Work Friendly", text: "Free Wi-Fi, power outlets at every seat, and a quiet enough ambience to get real work done." },
  { icon: "🎁", title: "Gift Tea Hampers", text: "Curated tea gift boxes — perfect for Diwali, Christmas, and wedding favours. Customisable labels available." },
];

const testimonials = [
  { text: "Best chai I've had in Pondicherry! The Pondy Special Chai is unlike anything in the city. I visit twice a week.", name: "Kavitha R., White Town", stars: 5 },
  { text: "The ambience is perfect for working remotely. Great Wi-Fi, quiet music, and the Darjeeling tea is exceptional.", name: "Arjun M., Auroville", stars: 5 },
  { text: "Stumbled upon this tea shop near the beach. The Lemon Ginger Iced Tea on a hot day was absolutely divine!", name: "Priya S., Chennai visitor", stars: 5 },
  { text: "I was looking for a coffee shop in Pondy and found this gem. Their filter coffee rivals any in Chennai!", name: "Rajan V., Cuddalore", stars: 5 },
  { text: "The French Quarter Milk Tea is revolutionary. Finally a tea shop near me that takes quality seriously.", name: "Sophie D., Auroville", stars: 5 },
  { text: "Amazing selection — from basic chai to premium Darjeeling. Definitely the best tea shop in Pondy.", name: "Murugan K., Villupuram", stars: 5 },
];

const keywordsMeta = `best tea shop in pondy, best tea shop in pondicherry, tea shop near me, tea shop in pondicherry, coffee shop in pondy, coffee shop in pondicherry, chai shop pondicherry, milk tea pondicherry, bubble tea pondy, filter coffee pondicherry, best cafe in pondicherry, tea cafe white town pondicherry, puducherry tea shop, tea near beach pondicherry`;

export default function PondiTeaHouse() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Inject SEO meta tags into document head (works in a real deployment)
    document.title = "Pondi Tea House | Best Tea Shop in Pondicherry | Chai & Coffee Near You";
    const metas = [
      { name: "description", content: "Pondi Tea House — the best tea shop in Pondicherry (Pondy). Authentic chai, filter coffee, premium Darjeeling, bubble tea & more. Located in White Town, Puducherry. Open 7AM–10PM." },
      { name: "keywords", content: keywordsMeta },
      { property: "og:title", content: "Pondi Tea House | Best Tea Shop in Pondicherry" },
      { property: "og:description", content: "Authentic chai, filter coffee, and premium teas in the heart of Pondicherry's White Town. Visited by thousands of locals and tourists every month." },
      { property: "og:type", content: "restaurant" },
      { name: "geo.region", content: "IN-PY" },
      { name: "geo.placename", content: "Pondicherry, India" },
      { name: "geo.position", content: "11.9416;79.8083" },
      { name: "ICBM", content: "11.9416, 79.8083" },
    ];
    metas.forEach(({ name, property, content }) => {
      const el = document.createElement("meta");
      if (name) el.setAttribute("name", name);
      if (property) el.setAttribute("property", property);
      el.setAttribute("content", content);
      document.head.appendChild(el);
    });

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── GLOBAL KEYFRAMES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0d0a06; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%,100% { opacity: 0.6; } 50% { opacity: 1; }
        }
        .tea-card:hover { border-color: rgba(210,160,80,0.4) !important; transform: translateY(-4px); }
        .btn-primary:hover { background: #e8b860 !important; transform: translateY(-2px); }
        .btn-outline:hover { border-color: rgba(210,160,80,0.8) !important; color: #f0c870 !important; }
        .footer-link:hover { color: #d2a050 !important; }
        ::-webkit-scrollbar { width: 6px; background: #0d0a06; }
        ::-webkit-scrollbar-thumb { background: rgba(210,160,80,0.3); border-radius: 3px; }
      `}</style>

      {/* ── SCHEMA MARKUP (JSON-LD for Google) ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CafeOrCoffeeShop",
        "name": "Pondi Tea House",
        "alternateName": ["Best Tea Shop in Pondy", "Tea Shop Pondicherry", "Chai Cafe Puducherry"],
        "description": "Pondi Tea House is the best tea shop in Pondicherry, offering authentic chai, filter coffee, premium Darjeeling, bubble tea and herbal blends in a heritage setting in White Town.",
        "url": "https://ponditeahouse.in",
        "telephone": "+91-98765-43210",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "12, Rue Suffren, White Town",
          "addressLocality": "Pondicherry",
          "addressRegion": "Puducherry",
          "postalCode": "605001",
          "addressCountry": "IN"
        },
        "geo": { "@type": "GeoCoordinates", "latitude": 11.9416, "longitude": 79.8083 },
        "openingHoursSpecification": [{
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          "opens": "07:00", "closes": "22:00"
        }],
        "servesCuisine": ["Tea", "Coffee", "Chai", "Bubble Tea"],
        "priceRange": "₹35 - ₹130",
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "847" },
        "image": "https://ponditeahouse.in/og-image.jpg",
        "sameAs": [
          "https://www.instagram.com/ponditeahouse",
          "https://www.facebook.com/ponditeahouse",
          "https://g.co/kgs/ponditeahouse"
        ]
      })}} />

      <div style={{ ...styles.root, fontFamily: "'DM Sans', 'Georgia', sans-serif" }}>
        {/* ── NAV ── */}
        <nav style={{ ...styles.nav, boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.5)" : "none" }}>
          <a href="#home" style={styles.navLogo}>🍵 Pondi Tea House</a>
          <ul style={styles.navLinks}>
            {["Menu", "About", "Reviews", "Find Us"].map(l => (
              <li key={l}>
                <a href={`#${l.toLowerCase().replace(" ", "")}`} style={styles.navLink}
                  className="footer-link">{l}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── HERO ── */}
        <section id="home" style={styles.hero} itemScope itemType="https://schema.org/CafeOrCoffeeShop">
          {/* Hidden SEO text for crawlers */}
          <span style={styles.schemaHidden} itemProp="name">Pondi Tea House - Best Tea Shop in Pondicherry</span>
          <span style={styles.schemaHidden} itemProp="description">Best tea shop in Pondy, tea shop near me, coffee shop in pondicherry, chai shop puducherry, milk tea pondicherry, bubble tea pondy</span>

          <span style={styles.heroTag}>☕ Open Today · 7 AM – 10 PM · White Town, Puducherry</span>
          <h1 style={{ ...styles.heroTitle, fontFamily: "'Playfair Display', Georgia, serif" }}>
            Pondicherry's Most Beloved<br />
            <span style={styles.heroAccent}>Tea House</span>
          </h1>
          <p style={styles.heroSub}>
            From the morning's first chai to the evening's last sip — we brew every cup with whole spices, single-origin leaves, and a whole lot of love in the heart of White Town.
          </p>
          <div style={styles.heroBtns}>
            <button style={styles.btnPrimary} className="btn-primary" onClick={() => document.getElementById("menu").scrollIntoView({ behavior: "smooth" })}>
              EXPLORE MENU
            </button>
            <button style={styles.btnOutline} className="btn-outline" onClick={() => document.getElementById("findus").scrollIntoView({ behavior: "smooth" })}>
              FIND US IN PONDY
            </button>
          </div>
          <div style={styles.heroStats}>
            {[["4.9★", "Google Rating"], ["847+", "Reviews"], ["12+", "Unique Brews"], ["7AM", "We Open"]].map(([n, l]) => (
              <div key={l} style={styles.heroStat}>
                <div style={styles.heroStatNum}>{n}</div>
                <div style={styles.heroStatLabel}>{l}</div>
              </div>
            ))}
          </div>
        </section>

        <hr style={styles.divider} />

        {/* ── INFO BAR ── */}
        <div style={styles.infoBar}>
          <div style={styles.infoBarInner}>
            {[
              { icon: "📍", title: "Address", text: "12, Rue Suffren, White Town\nPondicherry – 605001" },
              { icon: "🕐", title: "Hours", text: "Mon – Sun\n7:00 AM – 10:00 PM" },
              { icon: "📞", title: "Call Us", text: "+91 98765 43210\n(Also on WhatsApp)" },
              { icon: "🛵", title: "Delivery", text: "Zomato & Swiggy\nWithin 5 km of White Town" },
            ].map(({ icon, title, text }) => (
              <div key={title} style={styles.infoItem}>
                <div style={styles.infoIcon}>{icon}</div>
                <div style={styles.infoTitle}>{title}</div>
                <div style={styles.infoText}>{text.split("\n").map((t, i) => <span key={i}>{t}<br /></span>)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MENU ── */}
        <section id="menu" style={{ ...styles.section, paddingTop: "100px" }}>
          <span style={styles.sectionLabel}>Our Menu</span>
          <h2 style={{ ...styles.sectionTitle, fontFamily: "'Playfair Display', serif" }}>
            Brews That Tell a Story
          </h2>
          <p style={styles.sectionDesc}>
            Every cup on our menu is crafted from a recipe with a purpose — chai from your grandmother's kitchen, teas from the Nilgiris, and creative blends inspired by Pondy's French heritage.
          </p>

          {/* SEO keyword paragraph */}
          <p style={{ fontSize: "0.01px", color: "transparent", userSelect: "none", height: 0, overflow: "hidden" }} aria-hidden="true">
            Best tea shop in Pondy. Tea shop near me Pondicherry. Coffee shop in Pondy. Chai shop Puducherry. Bubble tea Pondicherry. Best cafe in Pondicherry. Tea shop in White Town. Filter coffee Pondicherry.
          </p>

          <div style={styles.menuGrid}>
            {menuItems.map((item, i) => (
              <article
                key={i}
                className="tea-card"
                style={styles.menuCard}
                itemScope
                itemType="https://schema.org/MenuItem"
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={styles.menuEmoji}>{item.emoji}</div>
                <h3 style={styles.menuName} itemProp="name">{item.name}</h3>
                <p style={styles.menuDesc} itemProp="description">{item.desc}</p>
                <span itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <span style={styles.menuPrice} itemProp="price">{item.price}</span>
                  <meta itemProp="priceCurrency" content="INR" />
                </span>
                {item.tag && <span style={styles.menuTag}>{item.tag}</span>}
              </article>
            ))}
          </div>
        </section>

        <hr style={styles.divider} />

        {/* ── ABOUT / WHY US ── */}
        <section id="about" style={styles.section}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
            <div>
              <span style={styles.sectionLabel}>Why Pondi Tea House</span>
              <h2 style={{ ...styles.sectionTitle, fontFamily: "'Playfair Display', serif" }}>
                More Than a Tea Shop.<br />
                <span style={{ color: "#d2a050" }}>A Pondicherry Institution.</span>
              </h2>
              <p style={{ ...styles.sectionDesc, marginBottom: "24px" }}>
                Since 2019, we've been the go-to tea shop near Pondicherry beach for locals, Auroville residents, and travellers. Our heritage building on Rue Suffren doubles as a quiet refuge from Pondy's sunny streets.
              </p>
              <p style={styles.sectionDesc}>
                Whether you're searching for the <strong style={{ color: "#c8a060" }}>best tea shop in Pondy</strong>, a cozy <strong style={{ color: "#c8a060" }}>coffee shop in Pondicherry</strong>, or just a <strong style={{ color: "#c8a060" }}>tea shop near me</strong> on a lazy afternoon — you've found the right place.
              </p>
            </div>
            <div style={styles.featuresGrid}>
              {features.map((f, i) => (
                <div key={i} style={styles.featureCard}>
                  <div style={styles.featureIcon}>{f.icon}</div>
                  <div style={styles.featureTitle}>{f.title}</div>
                  <div style={styles.featureText}>{f.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr style={styles.divider} />

        {/* ── REVIEWS ── */}
        <section id="reviews" style={styles.section}>
          <span style={styles.sectionLabel}>Customer Reviews</span>
          <h2 style={{ ...styles.sectionTitle, fontFamily: "'Playfair Display', serif" }}>
            What Pondicherry Says About Us
          </h2>
          <p style={styles.sectionDesc}>
            Rated <strong style={{ color: "#d2a050" }}>4.9 / 5 on Google</strong> with 847+ verified reviews. The numbers don't lie.
          </p>
          <div style={styles.testimonialsGrid}>
            {testimonials.map((t, i) => (
              <div key={i} style={styles.testimonialCard} itemScope itemType="https://schema.org/Review">
                <div style={styles.stars}>{"★".repeat(t.stars)}</div>
                <p style={styles.testimonialText} itemProp="reviewBody">"{t.text}"</p>
                <div style={styles.testimonialName} itemProp="author">{t.name}</div>
              </div>
            ))}
          </div>
        </section>

        <hr style={styles.divider} />

        {/* ── FIND US ── */}
        <section id="findus" style={styles.section}>
          <span style={styles.sectionLabel}>Location</span>
          <h2 style={{ ...styles.sectionTitle, fontFamily: "'Playfair Display', serif" }}>
            Find the Best Tea Shop<br />in Pondicherry
          </h2>
          <div style={styles.mapCta}>
            <p style={{ fontSize: "3rem", marginBottom: "16px" }}>📍</p>
            <h3 style={{ fontSize: "1.4rem", fontWeight: "600", color: "#e8d5b5", marginBottom: "12px", fontFamily: "'Playfair Display', serif" }}>
              12, Rue Suffren, White Town
            </h3>
            <p style={{ color: "#9a7f60", marginBottom: "8px" }}>Pondicherry (Puducherry) – 605001</p>
            <p style={{ color: "#7a6040", fontSize: "0.9rem", marginBottom: "32px" }}>
              2 min walk from Pondicherry Beach · Near Gandhi Statue · Easy auto/cab drop
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="https://maps.google.com/?q=12+Rue+Suffren+White+Town+Pondicherry"
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...styles.btnPrimary, textDecoration: "none", display: "inline-block" }}
                className="btn-primary"
              >
                OPEN IN GOOGLE MAPS
              </a>
              <a
                href="tel:+919876543210"
                style={{ ...styles.btnOutline, textDecoration: "none", display: "inline-block" }}
                className="btn-outline"
              >
                CALL TO BOOK A TABLE
              </a>
            </div>
          </div>

          {/* Embedded map iframe */}
          <div style={{ marginTop: "48px", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(210,160,80,0.12)" }}>
            <iframe
              title="Pondi Tea House Location - Best Tea Shop in Pondicherry"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.5!2d79.8083!3d11.9416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDU2JzMwLjAiTiA3OcKwNDgnMjkuOSJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="340"
              style={{ border: 0, display: "block" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={styles.footer}>
          <div style={styles.footerInner}>
            <div>
              <div style={{ ...styles.footerLogo, fontFamily: "'Playfair Display', serif" }}>🍵 Pondi Tea House</div>
              <p style={styles.footerText}>
                The best tea shop in Pondicherry since 2019. Serving authentic chai, filter coffee, premium Darjeeling and creative brews in White Town, Puducherry.
              </p>
            </div>
            <div>
              <div style={styles.footerHeading}>Quick Links</div>
              <ul style={styles.footerLinks}>
                {["Our Menu", "About Us", "Delivery & Hours", "Gift Hampers", "Careers"].map(l => (
                  <li key={l}><a style={styles.footerLink} className="footer-link" href="#">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div style={styles.footerHeading}>Popular Searches</div>
              <ul style={styles.footerLinks}>
                {["Best tea shop in Pondy", "Tea shop near me", "Coffee shop Pondicherry", "Chai cafe White Town", "Bubble tea Puducherry", "Filter coffee Pondy"].map(l => (
                  <li key={l}><a style={styles.footerLink} className="footer-link" href="#">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div style={styles.footerHeading}>Contact</div>
              <p style={{ ...styles.footerText, marginBottom: "8px" }}>📞 +91 98765 43210</p>
              <p style={{ ...styles.footerText, marginBottom: "8px" }}>📧 hello@ponditeahouse.in</p>
              <p style={{ ...styles.footerText, marginBottom: "8px" }}>📍 12, Rue Suffren, White Town, Pondicherry 605001</p>
              <p style={{ ...styles.footerText }}>🕐 Open Daily · 7 AM – 10 PM</p>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <p>© 2025 Pondi Tea House. All rights reserved. | Best Tea Shop in Pondicherry | Tea Shop Near Me | Coffee Shop in Pondy</p>
          </div>
        </footer>
      </div>
    </>
  );
}