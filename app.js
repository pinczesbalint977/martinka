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












