const navlinks = document.querySelector(".navlinks");
const home = document.querySelector(".home");
const service = document.querySelector(".service");
const about = document.querySelector(".about");
const machine = document.querySelector(".machine");
const contact = document.querySelector(".contact");
const hambi = document.querySelector(".hambi")


function togglemenu(){

    navlinks.classList.add("active");
    hambi.classList.add("hambiactive");
}

function removetoggle(){

    navlinks.classList.remove("active");
    hambi.classList.remove("hambiactive")
}





document.querySelectorAll('.flip-card').forEach(card => {
  const toggle = () => {
    card.classList.toggle('is-flipped');
    const flipped = card.classList.contains('is-flipped');
    card.setAttribute('aria-pressed', flipped ? 'true' : 'false');
  };

  card.addEventListener('click', toggle);

  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
    if (e.key === 'Escape') {
      card.classList.remove('is-flipped');
      card.setAttribute('aria-pressed', 'false');
    }
  });
});




  const video = document.getElementById('myVideo');

  // biztosítsuk, hogy néma legyen
  video.muted = true;
  video.volume = 0;

  // Beállítás: hány százalék legyen látható ahhoz, hogy elinduljon
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // csak egyszer játsszuk le
        if (video.paused) {
          video.play().catch(err => {
            // ha valami miatt blokkolva van, semmi pánik
            console.log('Playback blocked:', err);
          });
        }
        obs.unobserve(video); // többé ne figyeljük — így csak egyszer játszik le
      }
    });
  }, { threshold: 0.8 }); // 50% láthatóságnál indul

  observer.observe(video);





  Vue.config.devtools = true;

Vue.component('card', {
  template: `
    <div class="card-wrap"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="card">
      <div class="card"
        :style="cardStyle">
        <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
        <div class="card-info">
          <slot name="header"></slot>
          <slot name="content"></slot>
        </div>
      </div>
    </div>`,
  mounted() {
    this.width = this.$refs.card.offsetWidth;
    this.height = this.$refs.card.offsetHeight;
  },
  props: ['dataImage'],
  data: () => ({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    mouseLeaveDelay: null
  }),
  computed: {
    mousePX() {
      return this.mouseX / this.width;
    },
    mousePY() {
      return this.mouseY / this.height;
    },
    cardStyle() {
      const rX = this.mousePX * 20;
      const rY = this.mousePY * -20;
      return {
        transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
      };
    },
    cardBgTransform() {
      const tX = this.mousePX * -30;
      const tY = this.mousePY * -30;
      return {
        transform: `translateX(${tX}px) translateY(${tY}px)`
      }
    },
    cardBgImage() {
      return {
        backgroundImage: `url(${this.dataImage})`
      }
    }
  },
  methods: {
    handleMouseMove(e) {
      this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width/2;
      this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height/2;
    },
    handleMouseEnter() {
      clearTimeout(this.mouseLeaveDelay);
    },
    handleMouseLeave() {
      this.mouseLeaveDelay = setTimeout(()=>{
        this.mouseX = 0;
        this.mouseY = 0;
      }, 1000);
    }
  }
});

const app = new Vue({
  el: '#app'
});









// Süti kezelő — Komatech
(function () {
  const KEY = 'komatech_cookie_consent';

  // DOM elemek
  const banner = document.getElementById('cookieBanner');
  const acceptAll = document.getElementById('cookieAcceptAll');
  const onlyEssential = document.getElementById('cookieEssential');
  const settingsBtn = document.getElementById('cookieSettingsBtn');
  const settingsModal = document.getElementById('cookieSettings');
  const analyticsChk = document.getElementById('analyticsChk');
  const marketingChk = document.getElementById('marketingChk');
  const saveSettings = document.getElementById('saveSettings');
  const closeSettings = document.getElementById('closeSettings');

  // olvassuk a jelenlegi beállítást
  function readConsent() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(obj) {
    localStorage.setItem(KEY, JSON.stringify(obj));
    applyConsent(obj);
    hideBanner();
  }

  function applyConsent(obj) {
    // ide tudsz betenni feltételes script betöltést,
    // pl. ha (obj.analytics) akkor indítod a analytics kódot
    // mert most nincs külső kód, csak bemutató:
    if (obj.analytics) {
      console.log('Analytics engedélyezve — ide töltsd be az analytics scriptet.');
    } else {
      console.log('Analytics tiltva');
    }
    if (obj.marketing) {
      console.log('Marketing engedélyezve — ide töltsd be a marketing scriptet.');
    } else {
      console.log('Marketing tiltva');
    }
  }

  function showBanner() {
    if (!banner) return;
    banner.setAttribute('aria-hidden', 'false');
  }
  function hideBanner() {
    if (!banner) return;
    banner.setAttribute('aria-hidden', 'true');
  }

  // események
  if (acceptAll) acceptAll.addEventListener('click', function () {
    saveConsent({ essential: true, analytics: true, marketing: true, timestamp: Date.now() });
  });

  if (onlyEssential) onlyEssential.addEventListener('click', function () {
    saveConsent({ essential: true, analytics: false, marketing: false, timestamp: Date.now() });
  });

  if (settingsBtn && settingsModal) settingsBtn.addEventListener('click', function () {
    // töltsük a checkboxokat a jelenlegi állapot szerint
    const c = readConsent() || { analytics: false, marketing: false };
    analyticsChk.checked = !!c.analytics;
    marketingChk.checked = !!c.marketing;
    settingsModal.setAttribute('aria-hidden', 'false');
  });

  if (closeSettings) closeSettings.addEventListener('click', function () {
    settingsModal.setAttribute('aria-hidden', 'true');
  });

  if (saveSettings) saveSettings.addEventListener('click', function () {
    const obj = {
      essential: true,
      analytics: !!analyticsChk.checked,
      marketing: !!marketingChk.checked,
      timestamp: Date.now()
    };
    saveConsent(obj);
    settingsModal.setAttribute('aria-hidden', 'true');
  });

  // inicializálás: ha van consent, alkalmazzuk; különben mutatjuk a bannert
  const existing = readConsent();
  if (existing) {
    applyConsent(existing);
    hideBanner();
  } else {
    showBanner();
  }

  // accessibility: ESC bezárja a modal-t
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      settingsModal && settingsModal.setAttribute('aria-hidden', 'true');
    }
  });

})();



