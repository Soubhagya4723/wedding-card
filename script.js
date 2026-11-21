/**
 * ===================================================================
 * WEDDING INVITATION WEBSITE - VANILLA JAVASCRIPT
 * Couple: Ayushmati Kshyanashree & Ayushman Manas
 * Date: Friday, 4 December 2026
 * Venue: Gadajata Bhawan, Town Field, Kamakhyanagar, Dhenkanal
 * ===================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================================================
     1. PRELOADER
     =================================================================== */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => preloader.remove(), 800);
      }
    }, 500);
  });
  // Fallback timeout in case load event takes long
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
    }
  }, 2500);


  /* ===================================================================
     2. FLOATING PETALS & GOLD PARTICLES ENGINE (HTML5 CANVAS)
     =================================================================== */
  const canvas = document.getElementById('petals-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const petals = [];
    const particles = [];
    const MAX_PETALS = window.innerWidth < 768 ? 20 : 36;
    const MAX_PARTICLES = window.innerWidth < 768 ? 25 : 45;

    // Petal Class (Rose Petals)
    class Petal {
      constructor() {
        this.reset();
        this.y = Math.random() * height; // initial random distribution
      }

      reset() {
        this.x = Math.random() * width;
        this.y = -20;
        this.size = Math.random() * 12 + 10;
        this.speedY = Math.random() * 1.2 + 0.8;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.angle = Math.random() * Math.PI * 2;
        this.angularSpeed = Math.random() * 0.03 - 0.015;
        this.flip = Math.random() * Math.PI;
        this.flipSpeed = Math.random() * 0.03 + 0.01;
        // Rose petal color variations (crimson, rose, gold edge)
        const colors = [
          'rgba(244, 177, 145, ',
          'rgba(238, 162, 127, ',
          'rgba(251, 212, 192, ',
          'rgba(138, 154, 91, ' // olive leaf
        ];
        this.baseColor = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.35;
      }

      update() {
        this.y += this.speedY;
        this.x += Math.sin(this.angle) * 1.2 + this.speedX;
        this.angle += this.angularSpeed;
        this.flip += this.flipSpeed;

        if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.scale(1, Math.cos(this.flip));

        ctx.beginPath();
        // Beautiful organic curved petal shape
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size * 0.6, -this.size * 0.4, this.size * 0.8, this.size * 0.6, 0, this.size);
        ctx.bezierCurveTo(-this.size * 0.8, this.size * 0.6, -this.size * 0.6, -this.size * 0.4, 0, 0);
        ctx.fillStyle = this.baseColor + this.opacity + ')';
        ctx.fill();

        ctx.restore();
      }
    }

    // Gold Sparkle Particle Class
    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 2 + 0.8;
        this.alpha = Math.random() * 0.6 + 0.2;
        this.alphaSpeed = Math.random() * 0.02 + 0.005;
        this.speedY = -(Math.random() * 0.6 + 0.2); // floats gently upwards
      }

      update() {
        this.y += this.speedY;
        this.alpha += Math.sin(Date.now() * 0.003 + this.x) * 0.01;
        if (this.y < -10) {
          this.y = height + 10;
          this.x = Math.random() * width;
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 228, 210, ${Math.max(0.1, Math.min(0.9, this.alpha))})`;
        ctx.shadowColor = '#f5bc9f';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < MAX_PETALS; i++) petals.push(new Petal());
    for (let i = 0; i < MAX_PARTICLES; i++) particles.push(new Particle());

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      for (let i = 0; i < petals.length; i++) {
        petals[i].update();
        petals[i].draw();
      }
      requestAnimationFrame(renderCanvas);
    }
    renderCanvas();
  }


  /* ===================================================================
     3. AUDIO CONTROLLER WITH WEB AUDIO API SYNTHESIZER FALLBACK
     =================================================================== */
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const weddingAudio = document.getElementById('weddingAudio');
  let isPlaying = false;
  let webAudioSynth = null;

  // Romantic Ambient Synthesizer using Web Audio API
  class RomanticSynth {
    constructor() {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.isPlaying = false;
      this.timer = null;
      // Beautiful chord progression in C Major (Cmaj7 -> Amin7 -> Fmaj7 -> Gadd9)
      this.chords = [
        [261.63, 329.63, 392.00, 493.88], // C, E, G, B
        [220.00, 261.63, 329.63, 392.00], // A, C, E, G
        [174.61, 220.00, 261.63, 329.63], // F, A, C, E
        [196.00, 246.94, 293.66, 392.00]  // G, B, D, G
      ];
      this.chordIdx = 0;
      this.noteIdx = 0;
    }

    playPluck(freq, time) {
      if (!this.isPlaying) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      // Acoustic Harp/Chime Bell Envelope
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.12, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + 2.0);
    }

    start() {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.isPlaying = true;
      let nextNoteTime = this.ctx.currentTime + 0.1;

      const scheduleNotes = () => {
        if (!this.isPlaying) return;
        const currentChord = this.chords[this.chordIdx];
        const freq = currentChord[this.noteIdx];

        this.playPluck(freq, nextNoteTime);

        this.noteIdx++;
        if (this.noteIdx >= currentChord.length) {
          this.noteIdx = 0;
          this.chordIdx = (this.chordIdx + 1) % this.chords.length;
        }

        nextNoteTime += 0.55; // note cadence
        this.timer = setTimeout(scheduleNotes, 550);
      };

      scheduleNotes();
    }

    stop() {
      this.isPlaying = false;
      if (this.timer) clearTimeout(this.timer);
    }
  }

  function startMusic() {
    if (weddingAudio) {
      weddingAudio.volume = 0.5;
      const playPromise = weddingAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isPlaying = true;
            musicToggleBtn.classList.add('playing');
          })
          .catch(() => {
            // Audio element blocked or file missing -> Use built-in Romantic Web Audio Synth!
            if (!webAudioSynth) webAudioSynth = new RomanticSynth();
            webAudioSynth.start();
            isPlaying = true;
            musicToggleBtn.classList.add('playing');
          });
      }
    } else {
      if (!webAudioSynth) webAudioSynth = new RomanticSynth();
      webAudioSynth.start();
      isPlaying = true;
      musicToggleBtn.classList.add('playing');
    }
  }

  function pauseMusic() {
    if (weddingAudio) {
      weddingAudio.pause();
    }
    if (webAudioSynth) {
      webAudioSynth.stop();
    }
    isPlaying = false;
    musicToggleBtn.classList.remove('playing');
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      if (isPlaying) {
        pauseMusic();
      } else {
        startMusic();
      }
    });
  }


  /* ===================================================================
     4. ENVELOPE OPENING MODAL & INTERACTION
     =================================================================== */
  const openInvitationBtn = document.getElementById('openInvitationBtn');
  const envelopeModal = document.getElementById('envelopeModal');
  const closeEnvelopeBtn = document.getElementById('closeEnvelopeBtn');
  const envelopeBackdrop = document.getElementById('envelopeBackdrop');
  const envelopeBox = document.getElementById('envelopeBox');
  const waxSealBtn = document.getElementById('waxSealBtn');
  const unfoldInvitationBtn = document.getElementById('unfoldInvitationBtn');

  function openEnvelopeModal() {
    if (!envelopeModal) return;
    envelopeModal.hidden = false;
    envelopeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeEnvelopeModal() {
    if (!envelopeModal) return;
    envelopeModal.classList.remove('active');
    setTimeout(() => {
      envelopeModal.hidden = true;
      document.body.style.overflow = '';
    }, 400);
  }

  function triggerEnvelopeOpen() {
    if (envelopeBox) {
      envelopeBox.classList.add('opened');
      // Start background music seamlessly on user invitation open
      if (!isPlaying) {
        startMusic();
      }
    }
  }

  if (openInvitationBtn) {
    openInvitationBtn.addEventListener('click', () => {
      openEnvelopeModal();
    });
  }

  if (waxSealBtn) {
    waxSealBtn.addEventListener('click', triggerEnvelopeOpen);
  }

  if (unfoldInvitationBtn) {
    unfoldInvitationBtn.addEventListener('click', () => {
      closeEnvelopeModal();
      const welcomeSection = document.getElementById('welcome-msg');
      if (welcomeSection) {
        welcomeSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (closeEnvelopeBtn) closeEnvelopeBtn.addEventListener('click', closeEnvelopeModal);
  if (envelopeBackdrop) envelopeBackdrop.addEventListener('click', closeEnvelopeModal);


  /* ===================================================================
     5. STICKY NAVBAR & MOBILE MENU
     =================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileMenuBtn.classList.toggle('active', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking on any navigation link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }



  /* ===================================================================
     6. LIVE COUNTDOWN TIMER
     =================================================================== */
  const countdownGrid = document.getElementById('countdownGrid');
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (countdownGrid && daysEl && hoursEl && minutesEl && secondsEl) {
    // 4 December 2026, 19:00 IST (reception & dinner)
    const weddingDateStr = countdownGrid.dataset.weddingDate || '2026-12-04T19:00:00';
    const targetDate = new Date(weddingDateStr).getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        const sub = document.querySelector('.countdown-sub');
        if (sub) sub.textContent = '🎉 Today is the auspicious wedding day! 🎉';
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minutesEl.textContent = String(minutes).padStart(2, '0');
      secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }


  /* ===================================================================
     7. CALENDAR INTEGRATION (GOOGLE CALENDAR & ICAL DOWNLOAD)
     =================================================================== */
  const weddingEventDetails = {
    title: "Wedding of Ayushmati Kshyanashree & Ayushman Manas",
    location: "Gadajata Bhawan, Town Field, Kamakhyanagar, Dhenkanal, Odisha",
    description: "Marriage & Panigrahan of Ayushmati Kshyanashree & Ayushman Manas. Reception & dinner from 7:00 PM. Map: https://maps.app.goo.gl/4De8m6Pbz3ek85Rx5",
    start: "20261204T190000",
    end: "20261204T235900"
  };

  const addToCalendarBtn = document.getElementById('addToCalendarBtn');
  if (addToCalendarBtn) {
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(weddingEventDetails.title)}&dates=${weddingEventDetails.start}/${weddingEventDetails.end}&details=${encodeURIComponent(weddingEventDetails.description)}&location=${encodeURIComponent(weddingEventDetails.location)}`;
    addToCalendarBtn.href = gCalUrl;
  }

  const downloadIcsBtn = document.getElementById('downloadIcsBtn');
  if (downloadIcsBtn) {
    downloadIcsBtn.addEventListener('click', () => {
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Kshyanashree & Manas//Wedding Invitation//EN',
        'BEGIN:VEVENT',
        `SUMMARY:${weddingEventDetails.title}`,
        `DESCRIPTION:${weddingEventDetails.description}`,
        `LOCATION:${weddingEventDetails.location}`,
        `DTSTART:${weddingEventDetails.start}`,
        `DTEND:${weddingEventDetails.end}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'Kshyanashree-Manas-Wedding.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // Individual Function Calendar Buttons
  const functionEvents = [
    { title: "Mangalakrutya & Haldi - Kshyanashree & Manas", start: "20261203T090000", end: "20261203T130000", loc: "Behera Residence, PHD Colony, Anantapur, Kamakhyanagar" },
    { title: "Mehndi Ceremony - Kshyanashree & Manas", start: "20261203T180000", end: "20261203T220000", loc: "Behera Residence, PHD Colony, Anantapur, Kamakhyanagar" },
    { title: "Marriage & Panigrahan + Reception - Kshyanashree & Manas", start: "20261204T190000", end: "20261204T235900", loc: "Gadajata Bhawan, Town Field, Kamakhyanagar, Dhenkanal" }
  ];

  document.querySelectorAll('.event-cal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.dataset.eventIndex, 10);
      const ev = functionEvents[idx];
      if (ev) {
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(ev.title)}&dates=${ev.start}/${ev.end}&details=${encodeURIComponent("Wedding Festivity of Kshyanashree & Manas")}&location=${encodeURIComponent(ev.loc)}`;
        window.open(url, '_blank');
      }
    });
  });


  /* ===================================================================
     8. PHOTO GALLERY FILTERING & LIGHTBOX
     =================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxSub = document.getElementById('lightboxSub');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');

  let currentGalleryIndex = 0;
  const visibleGalleryItems = [];

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
      updateVisibleItems();
    });
  });

  function updateVisibleItems() {
    visibleGalleryItems.length = 0;
    galleryItems.forEach(item => {
      if (item.style.display !== 'none') {
        visibleGalleryItems.push(item);
      }
    });
  }
  updateVisibleItems();

  function openLightbox(index) {
    if (!lightboxModal || visibleGalleryItems.length === 0) return;
    currentGalleryIndex = (index + visibleGalleryItems.length) % visibleGalleryItems.length;
    const currentItem = visibleGalleryItems[currentGalleryIndex];

    lightboxImg.src = currentItem.dataset.src;
    lightboxImg.alt = currentItem.dataset.caption;
    lightboxTitle.textContent = currentItem.dataset.caption;
    const lightboxCounter = document.getElementById('lightboxCounter');
    if (lightboxCounter) lightboxCounter.textContent = String(currentGalleryIndex + 1).padStart(2, '0') + ' / ' + String(visibleGalleryItems.length).padStart(2, '0');
    lightboxSub.textContent = currentItem.dataset.sub;

    lightboxModal.hidden = false;
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    setTimeout(() => {
      lightboxModal.hidden = true;
      document.body.style.overflow = '';
    }, 300);
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      updateVisibleItems();
      const idx = visibleGalleryItems.indexOf(item);
      openLightbox(idx !== -1 ? idx : 0);
    });
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(currentGalleryIndex - 1);
    });
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(currentGalleryIndex + 1);
    });
  }

  // Keyboard navigation for Lightbox
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal || lightboxModal.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openLightbox(currentGalleryIndex - 1);
    if (e.key === 'ArrowRight') openLightbox(currentGalleryIndex + 1);
  });

  // Touch swipe support for Lightbox
  let touchStartX = 0;
  let touchEndX = 0;
  if (lightboxModal) {
    lightboxModal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) {
        openLightbox(currentGalleryIndex + 1); // Swipe left -> next
      } else if (touchEndX > touchStartX + 50) {
        openLightbox(currentGalleryIndex - 1); // Swipe right -> prev
      }
    }, { passive: true });
  }


  /* ===================================================================
     9. BLESSINGS FORM SUBMISSION TO soubhagyakumar373@gmail.com
     =================================================================== */
  const rsvpForm = document.getElementById('weddingRsvpForm');
  const rsvpSuccessModal = document.getElementById('rsvpSuccessModal');
  const successGuestName = document.getElementById('successGuestName');
  const successGuestMessage = document.getElementById('successGuestMessage');
  const successDetails = document.getElementById('successDetails');
  const rsvpResetBtn = document.getElementById('rsvpResetBtn');
  const nameError = document.getElementById('nameError');
  const wishesError = document.getElementById('wishesError');
  const rsvpSubmitBtn = document.getElementById('rsvpSubmitBtn');

  const TARGET_EMAIL = 'soubhagyakumar373@gmail.com';

  // Check if Blessings were already submitted in this browser
  const savedBlessing = localStorage.getItem('wedding_blessing_kshyanashree_manas');
  if (savedBlessing) {
    try {
      const data = JSON.parse(savedBlessing);
      displayBlessingSuccess(data);
    } catch (e) {
      console.error(e);
    }
  }

  function validateBlessingForm() {
    let isValid = true;
    const nameInput = document.getElementById('guestName');
    const wishesInput = document.getElementById('guestWishes');

    if (!nameInput.value.trim()) {
      if (nameError) {
        nameError.textContent = 'Please enter your name or family name.';
        nameError.style.display = 'block';
      }
      nameInput.focus();
      isValid = false;
    } else if (nameError) {
      nameError.style.display = 'none';
    }

    if (!wishesInput.value.trim()) {
      if (wishesError) {
        wishesError.textContent = 'Please write your warm wishes and blessings.';
        wishesError.style.display = 'block';
      }
      if (isValid) wishesInput.focus();
      isValid = false;
    } else if (wishesError) {
      wishesError.style.display = 'none';
    }

    // Mobile number is optional, but if given it must look like a real number (10 digits, optional +91 / 0)
    const phoneInput = document.getElementById('guestPhone');
    const phoneError = document.getElementById('phoneError');
    if (phoneInput) {
      const digits = phoneInput.value.replace(/[\s\-()]/g, '').replace(/^(\+91|0091|0)/, '');
      if (phoneInput.value.trim() && !/^[6-9]\d{9}$/.test(digits)) {
        if (phoneError) {
          phoneError.textContent = 'Please enter a valid 10-digit mobile number.';
          phoneError.style.display = 'block';
        }
        if (isValid) phoneInput.focus();
        isValid = false;
      } else if (phoneError) {
        phoneError.style.display = 'none';
      }
    }

    return isValid;
  }

  function displayBlessingSuccess(data) {
    if (!rsvpForm || !rsvpSuccessModal) return;
    rsvpForm.style.display = 'none';
    rsvpSuccessModal.hidden = false;

    if (successGuestName) successGuestName.textContent = data.name || 'Dear Well-Wisher';
    if (successGuestMessage) {
      successGuestMessage.textContent = 'WhatsApp has opened with your blessing. Just tap Send there to deliver it to the family!';
    }

    if (successDetails) {
      // Show the guest's own message back to them (built with textContent so typed text is never treated as HTML)
      successDetails.textContent = '';
      const quote = document.createElement('p');
      quote.className = 'success-quote';
      quote.textContent = '“' + (data.message || '') + '”';
      const from = document.createElement('p');
      from.className = 'success-from';
      from.textContent = '— ' + (data.name || '');
      successDetails.append(quote, from);
    }
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateBlessingForm()) return;

      const nameVal = document.getElementById('guestName').value.trim();
      const phoneVal = document.getElementById('guestPhone') ? document.getElementById('guestPhone').value.trim() : '';
      const contactVal = phoneVal;
      const messageVal = document.getElementById('guestWishes').value.trim();

      // Open WhatsApp chat to the family with the blessing already typed in.
      // Done immediately on the click (before any waiting) so browsers don't block the new tab.
      const WHATSAPP_NUMBER = '919348222788';
      const waText =
        '🌸 *Wedding Blessings for Kshyanashree & Manas* 🌸\n\n' +
        messageVal + '\n\n' +
        '— ' + nameVal + (phoneVal ? '\n📱 ' + phoneVal : '');
      const waUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(waText);
      const waWindow = window.open(waUrl, '_blank', 'noopener');
      if (!waWindow) window.location.href = waUrl;

      const blessingData = {
        name: nameVal,
        contact: contactVal,
        message: messageVal,
        recipient: TARGET_EMAIL,
        timestamp: new Date().toLocaleString()
      };

      // Show sending state on button
      if (rsvpSubmitBtn) {
        rsvpSubmitBtn.disabled = true;
        rsvpSubmitBtn.innerHTML = '<span class="btn-icon btn-spinner" aria-hidden="true"></span><span>Sending...</span>';
      }

      // Try sending via FormSubmit AJAX API
      try {
        const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            'Sender Name': nameVal,
            'Mobile Number': phoneVal || 'Not provided',
            'Blessings & Wishes': messageVal,
            '_subject': `🌸 New Wedding Blessing from ${nameVal} for Kshyanashree & Manas!`,
            '_to': TARGET_EMAIL
          })
        });

        // Store locally
        localStorage.setItem('wedding_blessing_kshyanashree_manas', JSON.stringify(blessingData));
      } catch (err) {
        console.warn('FormSubmit AJAX fetch notice, saving locally and preparing fallback:', err);
        localStorage.setItem('wedding_blessing_kshyanashree_manas', JSON.stringify(blessingData));
      }

      // Trigger celebratory chime
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.0001, ctx.currentTime + idx * 0.12);
          gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + idx * 0.12 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 0.8);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.12);
          osc.stop(ctx.currentTime + idx * 0.12 + 0.9);
        });
      } catch (audioErr) {}

      displayBlessingSuccess(blessingData);

      if (rsvpSubmitBtn) {
        rsvpSubmitBtn.disabled = false;
        rsvpSubmitBtn.innerHTML = '<span class="btn-icon"><svg class="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 6.5l5.5 4.2M20.5 6.5L15 10.7"/><path d="M12 16.2s-3-1.9-3-3.9a1.6 1.6 0 0 1 3-.8 1.6 1.6 0 0 1 3 .8c0 2-3 3.9-3 3.9z"/></svg></span><span>Send on WhatsApp</span>';
      }
    });
  }

  if (rsvpResetBtn) {
    rsvpResetBtn.addEventListener('click', () => {
      localStorage.removeItem('wedding_blessing_kshyanashree_manas');
      if (rsvpSuccessModal) rsvpSuccessModal.hidden = true;
      if (rsvpForm) {
        rsvpForm.style.display = 'block';
        document.getElementById('guestWishes').value = '';
      }
    });
  }


  /* ===================================================================
     10. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     =================================================================== */
  const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-zoom');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    revealElements.forEach(el => el.classList.add('reveal-active'));
  }


  /* ===================================================================
     11. FOOTER ACTIONS: WHATSAPP SHARE, COPY LINK & BACK TO TOP
     =================================================================== */
  const whatsappShareBtn = document.getElementById('whatsappShareBtn');
  if (whatsappShareBtn) {
    const shareMessage = `🌸 *Royal Wedding Invitation* 🌸\n\nWith the divine blessings of our ancestors and parents, we cordially invite you to celebrate the auspicious wedding ceremonies of *Ayushmati Kshyanashree & Ayushman Manas* on Friday, 4th December 2026 at Gadajata Bhawan, Kamakhyanagar.\n\nLocation: https://maps.app.goo.gl/4De8m6Pbz3ek85Rx5\n\nView the full royal invitation & itinerary: ${window.location.href}`;
    whatsappShareBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
  }

  const copyLinkBtn = document.getElementById('copyLinkBtn');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const originalText = copyLinkBtn.innerHTML;
        copyLinkBtn.innerHTML = '<span>✓ Link Copied!</span>';
        setTimeout(() => {
          copyLinkBtn.innerHTML = originalText;
        }, 2200);
      }).catch(() => {
        alert('Invitation link: ' + window.location.href);
      });
    });
  }

  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});

