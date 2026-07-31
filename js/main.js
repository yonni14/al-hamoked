// ==========================================
// 1. מילון התרגומים הסטטיים
// ==========================================
const staticTranslations = {
    he: {
        nav_vision: "חזון",
        nav_archive: "ארכיון",
        nav_launch: "האירוע הקרוב",
        nav_future: "במורד הדרך",
        nav_contact: "צרו קשר",
        nav_register: "להרשמה",
        hero_mailing_btn: "הצטרפו לרשימת התפוצה",
        hero_title: "על המוקד.",
        hero_sub: "פורום הדיבייט הציבורי בישראל.<br>זירה אינטלקטואלית להתמודדות ישירה עם הסוגיות המורכבות ביותר.",
        hero_main_btn: "להרשמה לאירוע הקרוב",
        hero_launch_btn: "לפרטים על האירוע הקרוב",
        hero_price_note: "כרטיס כניסה כולל מקום שמור בכניסה לאירוע, למעגלי השיח, וכיבוד קל",
        vision_title: "האמת נחשפת בקונפליקט.",
        vision_text: "על המוקד הוא פורום דיבייט סטודנטיאלי צעיר, המהווה זירה עצמאית לניהול דיון ענייני וביקורתי בסוגיות הליבה הציבוריות. הפורום שואף לחדש את פניו של השיח הדמוקרטי בישראל, ומשיק את פעילותו במקום שבו הכל התחיל – מליאת הכנסת ההיסטורית בירושלים (מוזיאון הכנסת). בהשראת מועדוני הדיבייט המובילים והוותיקים של Oxford ו-Cambridge, אנו מציגים על הבמה זירה המבוססת על טיעונים מנומקים ותרבות נאום מובנית ומזמינים את הקהל לקחת חלק ישיר בעימות הרעיוני ובהכרעת הדיון.",
        archive_sidebar_title: "ארכיון האירועים",
        launch_motion_label: "הנושא המרכזי",
        modal_motion: "נושא הדיון",
        modal_votes: "קולות",
        modal_full_debate: "הדיבייט המלא",
        launch_details_hint: "+ לחצו לפרטים על נושא הדיון",
        future_title: "במוקד: עימותים קרובים",
        contact_label: "צרו קשר",
        form_name_placeholder: "הכנס שם מלא",
        form_message_placeholder: "איך נוכל לעזור?",
        contact_title: "רוצים להציע נושא/דובר או להצטרף לצוות?",
        contact_subtitle: "+ לחצו כאן לפתיחת טופס הפנייה",
        form_name: "שם מלא",
        form_subject: "נושא הפנייה",
        form_subject_opt1: "הצעת נושא/דובר",
        form_subject_opt2: "הצטרפות לצוות",
        form_subject_opt3: "אחר",
        form_message: "הודעה",
        form_submit: "שליחה",
        footer_title: "יש עוד אירועים בקרוב!<br>בואו נהיה בקשר:",
        footer_copyright: "על המוקד © 2026"
    },
    en: {
        nav_vision: "Vision",
        nav_archive: "Archive",
        nav_launch: "Next Event",
        nav_future: "Upcoming",
        nav_contact: "Contact Us",
        nav_register: "Register",
        hero_mailing_btn: "Join our Mailing List",
        hero_title: "THE SPOTLIGHT.",
        hero_sub: "Israel's Public Debate Forum.\nAn intellectual arena for tackling the most complex issues.",
        hero_main_btn: "Register for Next Event",
        hero_launch_btn: "Event Details",
        hero_price_note: "Ticket includes reserved seating, discussion circles, and light refreshments",
        vision_title: "Truth Emerges in Conflict.",
        vision_text: "THE SPOTLIGHT is a vibrant student debate forum, providing an independent arena for substantive and critical discussion on core public issues. The forum aims to revitalize democratic discourse in Israel, launching its activity right where it all began – the historical Knesset Chamber in Jerusalem (The Knesset Museum). Inspired by the premier debate societies of Oxford and Cambridge, we present an arena grounded in reasoned arguments and structured speech, inviting the audience to take a direct part in the ideological conflict and in settling the debate.",
        archive_sidebar_title: "Event Archive",
        launch_motion_label: "Main Topic",
        modal_motion: "Motion",
        modal_votes: "Votes",
        modal_full_debate: "Full Debate",
        launch_details_hint: "+ Click for motion details",
        future_title: "In Focus: Upcoming Debates",
        contact_label: "Contact Us",
        contact_title: "Want to suggest a topic/speaker or join the team?",
        contact_subtitle: "+ Click here to open the contact form",
        form_name: "Full Name",
        form_name_placeholder: "Enter full name",
        form_message_placeholder: "How can we help?",
        form_subject: "Subject",
        form_subject_opt1: "Suggest Topic/Speaker",
        form_subject_opt2: "Join the Team",
        form_subject_opt3: "Other",
        form_message: "Message",
        form_submit: "Send",
        footer_title: "More events coming soon!\nLet's stay in touch:",
        footer_copyright: "THE SPOTLIGHT © 2026"
    },
    ar: {
        nav_vision: "رؤية",
        nav_archive: "أرشيف",
        nav_launch: "الحدث القادم",
        nav_future: "مستقبلا",
        nav_contact: "اتصل بنا",
        nav_register: "تسجيل",
        hero_mailing_btn: "انضموا إلى القائمة البريدية",
        hero_title: "في البؤرة",
        hero_sub: "منتدى النقاش العام في إسرائيل.\nساحة فكرية للتعامل المباشر مع أكثر القضايا تعقيداً.",
        hero_main_btn: "التسجيل للحدث القادم",
        hero_launch_btn: "تفاصيل الحدث",
        hero_price_note: "تذكرة الدخول تشمل مقعداً محجوزاً، دوائر النقاش، ومرطبات",
        vision_title: "الحقيقة تظهر في الصراع.",
        vision_text: "في البؤرة هو منتدى نقاش طلابي شاب، يشكل ساحة مستقلة لإدارة نقاش موضوعي ونقدي حول القضايا العامة الجوهرية. يطمح المنتدى إلى تجديد وجه الحوار الديمقراطي في إسرائيل، ويطلق نشاطه من المكان الذي بدأ فيه كل شيء – قاعة الكنيست التاريخية في القدس (متحف الكنيست). بإلهام من أندية المناظرة الرائدة والعريقة في أوكسفورد وكامبريدج، نقدم على المسرح ساحة قائمة على الحجج المعللة وثقافة الخطابة المنظمة، وندعو الجمهور للمشاركة المباشرة في الصراع الفكري وفض النقاش.",
        archive_sidebar_title: "أرشيف الأحداث",
        launch_motion_label: "الموضوع الرئيسي",
        modal_motion: "موضوع النقاش",
        modal_votes: "أصوات",
        modal_full_debate: "النقاش الكامل",
        launch_details_hint: "+ اضغط لمعرفة تفاصيل النقاش",
        future_title: "في التركيز: مناظرات قادمة",
        contact_label: "اتصل بنا",
        contact_title: "هل تريد اقتراح موضوع/متحدث أو الانضمام للفريق؟",
        contact_subtitle: "+ اضغط هنا لفتح نموذج الاتصال",
        form_name: "الاسم الكامل",
        form_subject: "الموضوع",
        form_name_placeholder: "أدخل الاسم الكامل",
        form_message_placeholder: "كيف يمكننا المساعدة؟",
        form_subject_opt1: "اقتراح موضوع/متحدث",
        form_subject_opt2: "الانضمام للفريق",
        form_subject_opt3: "آخر",
        form_message: "الرسالة",
        form_submit: "إرسال",
        footer_title: "المزيد من الأحداث قريباً!\nدعونا نبقى على تواصل:",
        footer_copyright: "في البؤرة © 2026"
    }
};

// ==========================================
// 2. ניהול החלפת שפות
// ==========================================
function switchLanguage(lang) {
    // עדכון כיוון המסמך
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'en') ? 'ltr' : 'rtl';

    // עדכון טקסטים סטטיים
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (staticTranslations[lang] && staticTranslations[lang][key]) {
            el.innerHTML = staticTranslations[lang][key];
        }
    });

    // עדכון Placeholders בטפסים
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (staticTranslations[lang] && staticTranslations[lang][key]) {
            el.placeholder = staticTranslations[lang][key];
        }
    });

    // סנכרון כל כפתורי בחירת השפה במסך (דסקטופ והמבורגר)
    document.querySelectorAll('.lang-selector').forEach(s => s.value = lang);

    // טעינת הנתונים הדינמיים מה-JSON בהתאם לשפה
    loadEventsData(lang);
}

// ==========================================
// 3. משיכת נתונים דינמיים (JSON) ורינדור
// ==========================================
async function loadEventsData(lang = 'he') {
    try {
        const response = await fetch(`data/events_${lang}.json`);
        if (!response.ok) throw new Error(`שגיאה בטעינת קובץ events_${lang}.json`);

        const debatesData = await response.json();

        // פונקציית עזר לבניית צד בדיבייט
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

        // --- א. האירוע הקרוב (Launch) ---
        const nextEvent = debatesData.find(event => event.status === 'next');
        const elements = {
            section: document.getElementById('launch'),
            navLink: document.getElementById('navLaunchLink'),
            heroBtn: document.getElementById('heroLaunchBtn'),
            priceNote: document.getElementById('heroPriceNote'),
            mainBtn: document.getElementById('heroMainBtn'),
            headerBtn: document.getElementById('headerRegisterBtn')
        };

        const MAILING_LIST_URL = "https://forms.gle/25DoXLvgbrUuQG6TA";

        if (nextEvent) {
            if (elements.section) elements.section.style.display = 'flex';
            if (elements.navLink) elements.navLink.style.display = 'inline-block';
            if (elements.heroBtn) elements.heroBtn.style.display = 'inline-block';
            if (elements.priceNote) elements.priceNote.style.display = 'block';

            if (elements.mainBtn) {
                elements.mainBtn.classList.remove('btn-secondary');
                elements.mainBtn.textContent = staticTranslations[lang]?.hero_main_btn || "להרשמה לאירוע הקרוב";
                elements.mainBtn.href = nextEvent.registerLink || "#";
            }
            if (elements.headerBtn) {
                elements.headerBtn.style.display = 'inline-block';
                elements.headerBtn.textContent = staticTranslations[lang]?.nav_register || "להרשמה";
                elements.headerBtn.href = nextEvent.registerLink || "#";
            }

            // עדכון פרטי האירוע
            const els = ['launchDate', 'launchTitle', 'launchMotion', 'launchLocationText', 'launchLocationLink', 'launchSides'];
            els.forEach(id => window[id] = document.getElementById(id));

            if (window.launchDate) window.launchDate.textContent = `${staticTranslations[lang]?.nav_launch || 'האירוע הקרוב'} • ${nextEvent.date}`;
            if (window.launchTitle) window.launchTitle.textContent = nextEvent.title;
            if (window.launchMotion) window.launchMotion.textContent = nextEvent.motion;

            if (window.launchLocationText) window.launchLocationText.textContent = nextEvent.locationName || staticTranslations[lang]?.default_location || "מוזיאון הכנסת, ירושלים";
            if (window.launchLocationLink) window.launchLocationLink.href = nextEvent.locationLink || "https://maps.google.com/?q=מוזיאון+הכנסת+ירושלים";
            if (window.launchSides && nextEvent.sides) window.launchSides.innerHTML = buildSideHTML(nextEvent.sides.sideA) + buildSideHTML(nextEvent.sides.sideB);

        } else {
            // מצב שאין אירוע קרוב
            ['section', 'navLink', 'heroBtn', 'priceNote', 'headerBtn'].forEach(key => {
                if (elements[key]) elements[key].style.display = 'none';
            });

            if (elements.mainBtn) {
                elements.mainBtn.classList.add('btn-secondary');
                elements.mainBtn.textContent = staticTranslations[lang]?.hero_mailing_btn || "הצטרפו לרשימת התפוצה";
                elements.mainBtn.href = MAILING_LIST_URL;
            }
        }

        // --- ב. ארכיון אירועי עבר ---
        const track = document.getElementById('archiveTrack');
        const template = document.getElementById('archive-card-template');
        const pastEvents = debatesData.filter(event => event.status === 'past');

        if (track && template) {
            // ניקוי כרטיסיות דינמיות בלבד (משאיר את תבנית המקור וכרטיסיות סטטיות כמו התקשורת)
            document.querySelectorAll('.event-card-img:not(template .event-card-img):not(.static-card)').forEach(el => el.remove());

            pastEvents.forEach(event => {
                const clone = template.content.cloneNode(true);
                const card = clone.querySelector('.event-card-img');
                const dateEl = clone.querySelector('.event-date');
                const titleEl = clone.querySelector('.event-card-title');

                if (card) card.style.backgroundImage = `url('${event.coverImage}')`;
                if (dateEl) dateEl.textContent = event.date;
                if (titleEl) titleEl.innerHTML = `${event.eventType || ''}<br>${event.title}`;

                if (card) {
                    card.addEventListener('click', (e) => {
                        e.preventDefault();

                        // עדכון פרטי המודל
                        document.getElementById('modalTitle').textContent = event.title;
                        document.getElementById('modalVideo').src = event.youtubeLink || '';
                        document.getElementById('modalMotion').textContent = event.motion;

                        // עדכון תוצאות הצבעה
                        const dashboard = document.getElementById('modalResultsDashboard');
                        if (dashboard && event.results) {
                            dashboard.style.display = 'flex';
                            document.getElementById('resChartImg').src = event.results.svgImage;
                            document.getElementById('resNameA').textContent = event.sides?.sideA?.name || "";
                            document.getElementById('resVotesA').textContent = event.results.sideA.votes;
                            document.getElementById('resVotesA').style.color = event.results.sideA.color;
                            document.getElementById('resNameB').textContent = event.sides?.sideB?.name || "";
                            document.getElementById('resVotesB').textContent = event.results.sideB.votes;
                            document.getElementById('resVotesB').style.color = event.results.sideB.color;
                        } else if (dashboard) {
                            dashboard.style.display = 'none';
                        }

                        // עדכון צדדים בדיבייט במודל
                        const sidesContainer = document.getElementById('modalSides');
                        if (sidesContainer && event.sides) {
                            sidesContainer.innerHTML = buildSideHTML(event.sides.sideA) + buildSideHTML(event.sides.sideB);
                        }

                        document.getElementById('eventModal').classList.add('active');
                    });
                }
                track.prepend(clone);
            });
        }

        // --- ג. אירועים עתידיים ---
        const futureContainer = document.getElementById('futureEventsContainer');
        const futureEvents = debatesData.filter(event => event.status === 'future');

        if (futureContainer) {
            futureContainer.innerHTML = '';

            futureEvents.forEach(event => {
                let speakersHTML = '';
                if (event.keynote) {
                    speakersHTML = `
                        <div class="draft" style="margin: 20px 0; padding: 20px; background: rgba(0,0,0,0.03); border-radius: 8px;">
                            <strong style="display:block; margin-bottom: 10px; color: var(--accent-red);">keynote speaker:</strong>
                            <div class="future-speaker">
                                <img src="${event.keynote.img}" alt="${event.keynote.name}" class="future-speaker-img" loading="lazy">
                                <div>
                                    <p style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0;">${event.keynote.name}</p>
                                    <span style="font-size: 1.1rem; color: #475569;">${event.keynote.role}</span>
                                </div>
                            </div>
                        </div>`;
                } else if (event.sides) {
                    speakersHTML = `
                        <div class="draft" style="margin: 20px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div style="padding: 15px; background: rgba(0,0,0,0.03); border-radius: 8px;">
                                <strong style="color: var(--accent-red); display:block; margin-bottom:10px;">${event.sides.sideA.name}</strong>
                                ${event.sides.sideA.speakers.map(s => `
                                    <div class="future-speaker">
                                        <img src="${s.img}" alt="${s.name}" class="future-speaker-img" loading="lazy">
                                        <div>
                                            <p style="font-weight: bold; margin-bottom:0;">${s.name}</p>
                                            <span style="font-size: 0.9rem; color: #475569;">${s.role}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            <div style="padding: 15px; background: rgba(0,0,0,0.03); border-radius: 8px;">
                                <strong style="color: var(--accent-red); display:block; margin-bottom:10px;">${event.sides.sideB.name}</strong>
                                ${event.sides.sideB.speakers.map(s => `
                                    <div class="future-speaker">
                                        <img src="${s.img}" alt="${s.name}" class="future-speaker-img" loading="lazy">
                                        <div>
                                            <p style="font-weight: bold; margin-bottom:0;">${s.name}</p>
                                            <span style="font-size: 0.9rem; color: #475569;">${s.role}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>`;
                }

                const eventRow = document.createElement('div');
                eventRow.className = 'event-row';
                eventRow.onclick = function () { this.classList.toggle('open'); };
                eventRow.innerHTML = `
                    <div class="event-header">
                        <div class="event-header-titles">
                            <span class="event-date">${event.date || ''}</span>
                            <h3>${event.title}</h3>
                        </div>
                        <div class="toggle-icon">+</div>
                    </div>
                    <div class="event-details">
                        <div class="event-details-content">
                            <p>${event.motion}</p>
                            <p style="font-weight: 700; color: var(--accent-red); margin: 15px 0;">${event.speakersStatus}</p>
                            ${speakersHTML}
                            <span class="status">${event.registrationStatus}</span>
                        </div>
                    </div>
                `;
                futureContainer.appendChild(eventRow);
            });
        }
    } catch (error) {
        console.error("בעיה במשיכת הנתונים:", error);
    }
}

// ==========================================
// 4. אינטראקציות וניהול אירועי ממשק
// ==========================================

// אנימציות חשיפה בגלילה (Reveal)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ניהול מודל (סגירה וניקוי וידאו)
const modal = document.getElementById('eventModal');
const modalVideo = document.getElementById('modalVideo');

function closeModal() {
    if (modal) {
        modal.classList.remove('active');
        if (modalVideo) modalVideo.src = '';
    }
}

document.getElementById('eventModalClose')?.addEventListener('click', closeModal);
document.getElementById('eventModalBackdrop')?.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });


// ==========================================
// 5. אתחול ראשוני (פועל בעליית העמוד)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    // א. טעינת נתונים ותרגום ראשוני (פותר את הבעיה של ארכיון ריק בהתחלה)
    switchLanguage('he');

    // ב. מאזינים למחליף שפה
    document.querySelectorAll('.lang-selector').forEach(selector => {
        selector.addEventListener('change', (e) => switchLanguage(e.target.value));
    });

    // ג. הפעלת תפריט המבורגר במובייל
    const hamburgerBtn = document.querySelector('.hamburger');
    const navWrapper = document.querySelector('.header-nav-wrapper');

    if (hamburgerBtn && navWrapper) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navWrapper.classList.toggle('active');
        });

        navWrapper.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navWrapper.classList.remove('active');
            });
        });
    }
});