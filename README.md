# 💍 Royal Wedding Invitation Website

A luxury, romantic, and royal Indian wedding invitation website crafted with **pure HTML5, CSS3, and Vanilla JavaScript** (Zero frameworks or external build dependencies required).

---

## 🌟 Highlights & Features

1. **Royal Aesthetic & Palette:**
   - **Colors:** Deep Velvet Maroon (`#4A0E17`), Lustrous Gold foil gradients (`#D4AF37`), Ivory/Warm Cream (`#FAF7F2`).
   - **Typography:** Google Fonts: *Great Vibes* (Script calligraphy), *Playfair Display* & *Cinzel* (Royal serif), and *Poppins* (Modern body text).
   - **Full Mobile Responsiveness:** Flawless experience on smartphones, tablets, and wide desktop screens.

2. **Hero / Royal Opening Screen:**
   - Fullscreen royal archway backdrop with subtle parallax.
   - Auspicious invocation: `|| श्री गणेशाय नमः ||`.
   - Couple monogram badge (`A & R`) and glowing gold script couple names.
   - Interactive **"Open Royal Invitation"** button.

3. **3D Envelope Opening Animation:**
   - Clicking *"Open Royal Invitation"* reveals a realistic 3D envelope with a royal wax seal.
   - Clicking the seal flips the envelope flap open with realistic 3D perspective, glides the gold-bordered invitation letter out, and starts background music.

4. **Floating Rose Petals & Golden Sparkles Engine:**
   - High-performance HTML5 Canvas animation with 60 FPS natural swaying rose petals and twinkling stardust.

5. **Audio & Background Music Player:**
   - Floating music button with spinning vinyl disc and animated equalizer wave bars.
   - Dual-engine audio: plays `audio/wedding-ambient.mp3` or `.wav`, and features an automatic built-in **Web Audio API Romantic Synthesizer** (harp & chime arpeggios in C Major / A Minor) as a fallback so music plays right out of the box!

6. **Couple Section & Love Story Timeline:**
   - Profile cards for Bride & Groom with parents' names, sweet bios, and personal quotes.
   - Interactive vertical timeline: *"A Serendipitous Beginning"*, *"When Friendship Blossomed"*, *"The Royal Proposal"*, and *"The Sacred Vows"*.

7. **Live Countdown Timer:**
   - Real-time countdown to **15 February 2027, 6:30 PM** (Days, Hours, Minutes, Seconds).
   - One-click **"Add to Google Calendar"** and **"Save to Apple / Outlook (iCal)"** buttons.

8. **Wedding Festivities Itinerary:**
   - Individual luxury cards for **Haldi**, **Mehndi**, **Sangeet & Cocktail**, **Wedding (Holy Pheras)**, and **Grand Reception**.
   - Includes custom SVG icons, date, time, venue, attire themes, and separate calendar buttons.

9. **Photo Gallery & Full Lightbox:**
   - Filterable photo grid (*All Photos, Romantic, Festive, Candids*).
   - Lightbox popup with high-resolution view, captions, Prev/Next navigation, keyboard controls (`Esc`, `←`, `→`), and mobile touch swipe.

10. **Royal Venue & Maps:**
    - Detailed destination guide for *The Grand Heritage Palace, Jaipur*.
    - Airport & Railway travel distances and valet parking guidance.
    - Embedded Google Map with an animated offline fallback card and direct Google Maps navigation button.

11. **Interactive RSVP Form:**
    - Guest name, phone/WhatsApp, email, guest count, and attendance status (*Joyfully Accepts* / *Regretfully Declines*).
    - Checkbox selection for specific ceremonies.
    - Personal blessings message area.
    - Form validation, celebratory chime sound, and falling floral confetti.
    - Persistent storage using `localStorage` so returning guests can see or edit their RSVP status.

12. **Royal Footer:**
    - Poetic quote, animated pulsing heart, and family sign-off from *The Sharma & Kapoor Families*.
    - **"Share on WhatsApp"** button with a pre-filled invitation template.
    - **"Copy Invitation Link"** and smooth **"Back to Top"** button.

---

## 📁 Project Structure

```text
wedding-invitation-card/
├── index.html            # Main website structure & semantic markup
├── style.css             # Luxury royal styling, CSS variables & animations
├── script.js             # Vanilla JS: Canvas petals, Audio, Countdown, Lightbox, RSVP
├── README.md             # Documentation & customization guide
├── images/               # High quality SVG placeholder graphics & illustrations
│   ├── hero-bg.svg       # Royal palace archway & lanterns background
│   ├── bride.svg         # The Radiant Bride portrait
│   ├── groom.svg         # The Dashing Groom portrait
│   ├── couple-story.svg  # Couple silhouette under moonlight arch
│   ├── mandala.svg       # Ornate royal mandala divider
│   ├── wax-seal.svg      # Royal wax seal monogram
│   ├── haldi.svg         # Turmeric bowl & marigold icon
│   ├── mehndi.svg        # Henna paisley icon
│   ├── sangeet.svg       # Dhol & musical notes icon
│   ├── wedding.svg       # Sacred havan kund & garland icon
│   ├── reception.svg     # Champagne flutes & chandeliers icon
│   ├── venue.svg         # Grand palace architecture
│   └── gallery-1..6.svg  # 6 distinct romantic moment illustrations
└── audio/                # Wedding background music
    ├── wedding-ambient.mp3
    ├── wedding-ambient.wav
    └── README.txt        # Audio replacement instructions
```

---

## 🛠️ How to Customize

### 1. Couple & Wedding Details
The website is configured for:
- **Bride:** Ayushmati Kshyanashree
- **Groom:** Ayushman Manas
- **Arranged Marriage theme:** Celebrating the union of two families, elder blessings (*Ashirwad*), Rishta meeting, and sacred Saptapadi vows.
- **Date:** 15 February 2027
- **Warm Wishes & Blessings Recipient Email:** `soubhagyakumar373@gmail.com`

To adjust any dates:
- In `index.html`, adjust the `data-wedding-date`:
  ```html
  <div class="countdown-grid" id="countdownGrid" data-wedding-date="2027-02-15T18:30:00">
  ```
  *(Format: `YYYY-MM-DDTHH:MM:SS`)*

### 2. Photos
The couple's real photos are saved in `/images/`:
- Bride photo: `images/bride.jpg` (Ayushmati Kshyanashree)
- Groom photo: `images/groom.jpg` (Ayushman Manas)
- Gallery images: `images/bride.jpg`, `images/groom.jpg`, and royal ceremonies illustrations (`images/gallery-1.svg` to `images/gallery-6.svg`)

### 3. Replace Music
Drop your favorite romantic song (Shehnai, Violin, Piano, or Bollywood instrumental) into the `/audio/` folder named `wedding-ambient.mp3`.

---

## 🚀 How to Run Locally

You can run this project with any local web server:

### Option 1: Python
```bash
python -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

### Option 2: Node.js (npx serve)
```bash
npx serve .
```

### Option 3: Double Click
You can also open `index.html` directly in any web browser (Chrome, Edge, Safari, Firefox).
