// ==========================================
// 1. אנימציות חשיפה בגלילה (Reveal)
// ==========================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// ==========================================
// 2. מנגנון המודל (סגירה וניקוי וידאו)
// ==========================================
const modal = document.getElementById('eventModal');
const closeBtn = document.getElementById('eventModalClose');
const backdrop = document.getElementById('eventModalBackdrop');
const modalVideo = document.getElementById('modalVideo');

function closeModal() {
    if (modal) {
        modal.classList.remove('active');
        if (modalVideo) modalVideo.src = ''; // עוצר את הסרטון כשסוגרים את המודל
    }
}

if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (backdrop) backdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ==========================================
// הפעלת תפריט המבורגר (פתיחה אלגנטית)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.querySelector('.hamburger'); 
    const navWrapper = document.querySelector('.header-nav-wrapper');

    if (hamburgerBtn && navWrapper) {
        // פתיחה וסגירה של התפריט בלחיצה
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navWrapper.classList.toggle('active');
        });

        // סגירת התפריט אוטומטית בלחיצה על אחד הקישורים
        navWrapper.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navWrapper.classList.remove('active');
            });
        });
    }
});
// ==========================================
// 3. משיכת הנתונים המרכזית: אירוע קרוב וארכיון
// ==========================================
async function loadEventsData() {
    try {
        const response = await fetch('data/events.json');
        if (!response.ok) throw new Error('שגיאה בטעינת קובץ ה-JSON');

        const debatesData = await response.json();

        const buildSideHTML = (sideData) => {
            if (!sideData) return '';
            let html = `<div class="side"><h4>${sideData.name}</h4>`;
            sideData.speakers.forEach(speaker => {
                html += `
                    <div class="speaker">
                        <img src="${speaker.img}" alt="${speaker.name}" class="speaker-img">
                        <div class="speaker-info">
                            <p>${speaker.name}</p>
                            <span>${speaker.role}</span>
                        </div>
                    </div>`;
            });
            html += `</div>`;
            return html;
        };

        // --- א. טיפול בבמה המרכזית (האירוע הקרוב) ---
        const nextEvent = debatesData.find(event => event.status === 'next');
        const launchSection = document.getElementById('launch'); 
        const navLaunchLink = document.getElementById('navLaunchLink');
        const heroLaunchBtn = document.getElementById('heroLaunchBtn');
        const heroPriceNote = document.getElementById('heroPriceNote');
        
        const headerRegisterBtn = document.getElementById('headerRegisterBtn');
        const heroMainBtn = document.getElementById('heroMainBtn');
        
        const MAILING_LIST_URL = "https://forms.gle/25DoXLvgbrUuQG6TA"; // שים פה את הלינק שלך

        if (nextEvent) {
            if (launchSection) launchSection.style.display = 'flex'; 
            if (navLaunchLink) navLaunchLink.style.display = 'inline-block';
            if (heroLaunchBtn) heroLaunchBtn.style.display = 'inline-block';
            if (heroPriceNote) heroPriceNote.style.display = 'block';

            if (heroMainBtn) {
                heroMainBtn.classList.remove('btn-secondary');
                heroMainBtn.textContent = "להרשמה לאירוע הקרוב";
                heroMainBtn.href = nextEvent.registerLink || "#";
            }
            if (headerRegisterBtn) {
                headerRegisterBtn.textContent = "להרשמה";
                headerRegisterBtn.href = nextEvent.registerLink || "#";
            }

            const launchDateEl = document.getElementById('launchDate');
            const launchTitleEl = document.getElementById('launchTitle');
            const launchMotionEl = document.getElementById('launchMotion');

            if (launchDateEl) launchDateEl.textContent = `האירוע הקרוב • ${nextEvent.date}`;
            if (launchTitleEl) launchTitleEl.textContent = nextEvent.title;
            if (launchMotionEl) launchMotionEl.textContent = nextEvent.motion;
            
            const locationTextEl = document.getElementById('launchLocationText');
            const locationLinkEl = document.getElementById('launchLocationLink');
            if(locationTextEl) locationTextEl.textContent = nextEvent.locationName || "מוזיאון הכנסת, ירושלים";
            if(locationLinkEl) locationLinkEl.href = nextEvent.locationLink || "https://maps.google.com/?q=מוזיאון+הכנסת+ירושלים";
            
            const launchSides = document.getElementById('launchSides');
            if (launchSides && nextEvent.sides) {
                launchSides.innerHTML = buildSideHTML(nextEvent.sides.sideA) + buildSideHTML(nextEvent.sides.sideB);
            }
        } else {
            if (launchSection) launchSection.style.display = 'none';
            if (navLaunchLink) navLaunchLink.style.display = 'none';
            if (heroLaunchBtn) heroLaunchBtn.style.display = 'none';
            if (heroPriceNote) heroPriceNote.style.display = 'none';

            if (heroMainBtn) {
                heroMainBtn.classList.add('btn-secondary');
                heroMainBtn.textContent = "הצטרפו לרשימת התפוצה";
                heroMainBtn.href = MAILING_LIST_URL;
            }
            if (headerRegisterBtn) {
                headerRegisterBtn.textContent = "רשימת תפוצה";
                headerRegisterBtn.href = MAILING_LIST_URL;
            }
        }
        

        // --- ב. טיפול בארכיון אירועי עבר והמודל ---
        const track = document.getElementById('archiveTrack');
        const template = document.getElementById('archive-card-template');
        const pastEvents = debatesData.filter(event => event.status === 'past');

        if (track && template) {
            // מנקה כרטיסיות ישנות כדי למנוע כפילויות בריענונים
            document.querySelectorAll('.event-card-img:not(template .event-card-img)').forEach(el => el.remove());

            pastEvents.forEach(event => {
                const clone = template.content.cloneNode(true);
                const card = clone.querySelector('.event-card-img');
                const dateEl = clone.querySelector('.event-date');
                const titleEl = clone.querySelector('.event-card-title');

                // הזרקת הנתונים לתוך אלמנט הקישור עצמו
                if (card) {
                    card.style.backgroundImage = `url('${event.coverImage}')`;
                }
                if (dateEl) {
                    dateEl.textContent = event.date;
                }
                if (titleEl) {
                    titleEl.innerHTML = `הכנס המשיק:<br>${event.title}`;
                }

                // מאזין ללחיצה על הכרטיסייה
                if (card) {
                    card.addEventListener('click', (e) => {
                        e.preventDefault();

                        const modalTitleEl = document.getElementById('modalTitle');
                        const modalVideoEl = document.getElementById('modalVideo');
                        const modalMotionEl = document.getElementById('modalMotion');

                        if (modalTitleEl) modalTitleEl.textContent = event.title;
                        if (modalVideoEl) modalVideoEl.src = event.youtubeLink || '';
                        if (modalMotionEl) modalMotionEl.textContent = event.motion;

                        const dashboard = document.getElementById('modalResultsDashboard');
                        if (dashboard) {
                            if (event.results) {
                                dashboard.style.display = 'flex'; 
                                
                                const chartImg = document.getElementById('resChartImg');
                                const nameA = document.getElementById('resNameA');
                                const votesA = document.getElementById('resVotesA');
                                const nameB = document.getElementById('resNameB');
                                const votesB = document.getElementById('resVotesB');

                                if (chartImg) chartImg.src = event.results.svgImage;
                                if (nameA) nameA.textContent = event.sides?.sideA?.name || "";
                                if (votesA) {
                                    votesA.textContent = event.results.sideA.votes;
                                    votesA.style.color = event.results.sideA.color;
                                }
                                if (nameB) nameB.textContent = event.sides?.sideB?.name || "";
                                if (votesB) {
                                    votesB.textContent = event.results.sideB.votes;
                                    votesB.style.color = event.results.sideB.color;
                                }
                            } else {
                                dashboard.style.display = 'none'; 
                            }
                        }

                        const sidesContainer = document.getElementById('modalSides');
                        if (sidesContainer) {
                            sidesContainer.innerHTML = '';
                            if (event.sides) {
                                sidesContainer.innerHTML = buildSideHTML(event.sides.sideA) + buildSideHTML(event.sides.sideB);
                            }
                        }

                        if (modal) modal.classList.add('active');
                    });
                }

                track.prepend(clone);
            });
            
        }
    

    } catch (error) {
        console.error("בעיה במשיכת הנתונים:", error);
    }
    
}

document.addEventListener('DOMContentLoaded', loadEventsData);