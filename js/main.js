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
        newsletter_badge: "עדכונים שוטפים",
        newsletter_title: "רשימת התפוצה",
        newsletter_desc: "היו הראשונים להתעדכן בנושאי הדיבייט הבאים, פתיחת מכירת כרטיסים ואירועים מיוחדים.",
        newsletter_email_label: "כתובת אימייל *",
        newsletter_email_placeholder: "your@email.com",
        newsletter_submit: "אישור והרשמה",
        hero_title: "על המוקד.",
        hero_sub: "פורום הדיבייט הציבורי בישראל.<br>זירה אינטלקטואלית להתמודדות ישירה עם הסוגיות המורכבות ביותר.",
        hero_main_btn: "להרשמה לאירוע הקרוב",
        hero_launch_btn: "לפרטים על האירוע הקרוב",
        hero_price_note: "כרטיס כניסה כולל מקום שמור בכניסה לאירוע, למעגלי השיח, וכיבוד קל",
        vision_title: "האמת נחשפת בקונפליקט.",
        vision_subtitle_main: "החזון שלנו",
        vision_subtitle_secondary: "מהלך האירוע",
        vision_p1: "דמוקרטיה נשענת על יכולתם של אזרחים לשקול ראיות, לאתגר הנחות יסוד ולנהל מחלוקת נוקבת מתוך כבוד. אף כי לאורך דורות, העולם היהודי והישראלי העמיד שורה ארוכה של אנשים שהקדישו את עצמם לחקירה, לוויכוח ולחיפוש אחר האמת, הבמות המזוהות ביותר עם מפגש בין רעיונות כאלה, עם ויכוח ציבורי ועם חקירה משותפת של האמת, נמצאות בעיקר מעבר לים: באוקספורד, קיימברידג' ובמוסדות ברחבי ארצות הברית.",
        vision_p2: "מתוך שאיפה לחדש את פניו של השיח הציבורי בישראל, הקמנו את פורום 'על המוקד' - זירת דיבייט סטודנטיאלית עצמאית, שנועדה להשיב את תרבות הוויכוח הביתה. בחרנו להציב את הבמה שלנו במליאת הכנסת ההיסטורית (בית פרומין - מוזיאון הכנסת), במטרה להפוך את ירושלים ואת ערש הדמוקרטיה הישראלית לנקודת מפגש בה אנשים המחזיקים בעמדות מנוגדות יכולים לדבר ישירות זה עם זה.",
        vision_badge_debate: "01 / הדיבייט במליאה:",
        vision_p_debate: "הערב נפתח במליאה בדיבייט מובנה סביב סוגיות ליבה, בהשתתפות מעצבי מדיניות, חוקרים ואנשי ציבור. הדיון מתקיים תוך מעורבות פעילה של הקהל: הנוכחים מפנים שאלות לדוברים, מאתגרים את העמדות המוצגות על הבמה, ובסיום העימות מכריעים את התוצאה בהצבעה.",
        vision_badge_rooftop: "02 / עולים לגג:",
        vision_p_rooftop: "בתום הדיבייט, עוברים הסטודנטים והדוברים אל גג בניין הכנסת להמשך הערב. בחלק זה מתקיימות שיחות בלתי פורמליות בהן סטודנטים מכל חלקי החברה נפגשים לשיחה פנים אל פנים עם הדוברים, ומנהלים דיון ישיר האחד עם השני, לצד יין, בירות ואוכל ברמה הגבוהה ביותר.",
        archive_sidebar_title: "ארכיון האירועים",
        tab_past_events: "אירועי עבר",
        tab_gallery: "גלריה",
        launch_motion_label: "הנושא המרכזי",
        modal_motion: "נושא הדיון",
        modal_votes: "קולות",
        modal_full_debate: "הדיבייט המלא",
        launch_details_hint: "+ לחצו לפרטים על נושא הדיון",
        future_title: "במוקד: עימותים קרובים",
        contact_label: "צרו קשר",
        contact_title: "יש לכם דיבייט שהייתם רוצים לראות?",
        contact_subtitle: "+ לחצו כאן לפתיחת טופס הפנייה",
        form_name: "שם מלא *",
        form_name_placeholder: "הכנס שם מלא",
        form_debate_title: "כותרת הדיון המוצע",
        form_debate_title_placeholder: "איזה נושא הייתם רוצים לראות?",
        form_speakers: "דוברים אפשריים",
        form_speakers_placeholder: "מי מתאים לייצג את הצדדים?",
        form_message: "פרטים נוספים *",
        form_message_placeholder: "למה זה נושא מעניין? למה עם הדוברים האלה?",
        form_contact_info: "איך ניתן ליצור איתך קשר",
        form_contact_info_placeholder: "אימייל או מספר טלפון",
        form_error_missing_field: "יש למלא לפחות כותרת דיון או דוברים אפשריים.",
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
        newsletter_badge: "Stay Updated",
        newsletter_title: "Mailing List",
        newsletter_desc: "Be the first to know about upcoming debate topics, ticket sales, and special announcements.",
        newsletter_email_label: "Email Address *",
        newsletter_email_placeholder: "your@email.com",
        newsletter_submit: "Subscribe",
        hero_title: "THE SPOTLIGHT.",
        hero_sub: "Israel's Public Debate Forum.<br>An intellectual arena for tackling the most complex issues.",
        hero_main_btn: "Register for Next Event",
        hero_launch_btn: "Event Details",
        hero_price_note: "Ticket includes reserved seating, discussion circles, and light refreshments",
        vision_title: "Truth Emerges in Conflict.",
        vision_subtitle_main: "Our Vision",
        vision_subtitle_secondary: "Event Schedule",
        vision_p1: "Democracy relies on the ability of citizens to weigh evidence, challenge assumptions, and engage in sharp yet respectful disagreement. Although throughout history the Jewish and Israeli worlds have produced generations of individuals dedicated to inquiry, debate, and the pursuit of truth, the stages most synonymous with such intellectual clashes, public discourse, and collective inquiry are predominantly overseas: in Oxford, Cambridge, and institutions across the United States.",
        vision_p2: "Seeking to revitalize public discourse in Israel, we established 'THE SPOTLIGHT' — an independent student debate forum designed to bring the culture of debate back home. We chose to set our stage in the historic Knesset plenum (Beit Frumin – The Knesset Museum), aiming to make Jerusalem and the birthplace of Israeli democracy a meeting place where people with opposing views can engage in direct dialogue.",
        vision_badge_debate: "01 / The Debate:",
        vision_p_debate: "The evening begins in the plenum with a structured debate on core issues, featuring policymakers, researchers, and public figures. The debate involves active audience participation: attendees pose questions, challenge positions presented on stage, and ultimately decide the outcome by vote.",
        vision_badge_rooftop: "02 / Going Up to the Roof:",
        vision_p_rooftop: "Following the debate, students and speakers head to the rooftop of the Knesset building for the second part of the evening. Here, informal discussions take place as students from all corners of society interact face-to-face with the speakers and engage in direct dialogue with one another, accompanied by quality wine, beer, and top-tier refreshments.", archive_sidebar_title: "Event Archive",
        tab_past_events: "Past Events",
        tab_gallery: "Gallery",
        launch_motion_label: "Main Topic",
        modal_motion: "Motion",
        modal_votes: "Votes",
        modal_full_debate: "Full Debate",
        launch_details_hint: "+ Click for motion details",
        future_title: "In Focus: Upcoming Debates",
        contact_label: "Contact Us",
        contact_title: "Is there a debate you'd like to see?",
        contact_subtitle: "+ Click here to open the contact form",
        form_name: "Full Name *",
        form_name_placeholder: "Enter full name",
        form_debate_title: "Proposed Debate Title",
        form_debate_title_placeholder: "What topic would you like to see?",
        form_speakers: "Potential Speakers",
        form_speakers_placeholder: "Who should represent the sides?",
        form_message: "Additional Details *",
        form_message_placeholder: "Why is this interesting? Why these speakers?",
        form_contact_info: "How can we contact you?",
        form_contact_info_placeholder: "Email or phone number",
        form_error_missing_field: "Please fill in either a debate title or potential speakers.",
        form_submit: "Send",
        footer_title: "More events coming soon!<br>Let's stay in touch:",
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
        newsletter_badge: "تحديثات مستمرة",
        newsletter_title: "القائمة البريدية",
        newsletter_desc: "كونوا أول من يعلم بمواضيع المناظرات القادمة، فتح حجز التذاكر، والإعلانات الخاصة.",
        newsletter_email_label: "البريد الإلكتروني *",
        newsletter_email_placeholder: "your@email.com",
        newsletter_submit: "اشتراك",
        hero_title: "في البؤرة.",
        hero_sub: "منتدى النقاش العام في إسرائيل.<br>ساحة فكرية للتعامل المباشر مع أكثر القضايا تعقيداً.",
        hero_main_btn: "التسجيل للحدث القادم",
        hero_launch_btn: "تفاصيل الحدث",
        hero_price_note: "تذكرة الدخول تشمل مقعداً محجوزاً، دوائر النقاش، ومرطبات",
        vision_title: "الحقيقة تظهر في الصراع.",
        vision_subtitle_main: "رؤيتنا",
        vision_subtitle_secondary: "برنامج الحدث",
        vision_p1: "ترتكز الديمقراطية على قدرة المواطنين على فحص الأدلة، وتحدي الافتراضات، وإدارة الاختلافات الحادة بروح من الاحترام المتبادل. ورغم أن العالمين اليهودي والإسرائيلي أنتجا عبر الأجيال رواداً كرّسوا أنفسهم للبحث والمناظرة والسعي وراء الحقيقة، إلا أن المنصات الأكثر ارتباطاً بتلاقي الأفكار، والنقاش العام، والبحث المشترك عن الحقيقة، تقع في المقام الأول خارج البلاد: في أكسفورد، وكامبريدג'، ومؤسسات مختلفة في جميع أنحاء الولايات المتحدة.",
        vision_p2: "وسعياً منا لتجديد ملامح الخطاب العام في إسرائيل، أنشأنا منتدى 'في البؤرة' - ساحة مناظرات طلابية مستقلة تهدف إلى إعادة ثقافة الحوار والمناظرة إلى موطنها. اخترنا إقامة منصتنا في القاعة العامة للكنيست التاريخي (بيت فرومين - متحف الكنيست)، بهدف تحويل القدس ومهد الديمقراطية الإسرائيلية إلى نقطة التقاء يتحدث فيها أصحاب الآراء المتعارضة مباشرة مع بعضهم البعض.",
        vision_badge_debate: "01 / المناظرة في القاعة العامة:",
        vision_p_debate: "تبدأ الأمسية في القاعة بمناظرة منظمة حول القضايا الجوهرية، بمشاركة صُنّاع القرار، والباحثين، وشخصيات عامة. يجري النقاش بمشاركة فعالة من الجمهور، حيث يوجّه الحاضرون الأسئلة للمتحدثين، ويتحدون المواقف المطروحة على المنصة، وفي ختام المواجهة يحسمون النتيجة عبر التصويت.",
        vision_badge_rooftop: "02 / الصعود إلى السطح:",
        vision_p_rooftop: "في ختام المناظرة، يصعد الطلاب والمتحدثون إلى سطح مبنى الكنيست لمواصلة الأمسية. يتضمن هذا الجزء حوارات غير رسمية يلتقي فيها الطلاب من كافة أطياف المجتمع وجهاً لوجه مع المتحدثين، ويخوضون نقاشاً مباشراً مع بعضهم البعض، إلى جانب المشروبات والضيافة الراقية.",
        archive_sidebar_title: "أرشيف الأحداث",
        tab_past_events: "أحداث سابقة",
        tab_gallery: "معرض الصور",
        launch_motion_label: "الموضوع الرئيسي",
        modal_motion: "موضوع النقاش",
        modal_votes: "أصوات",
        modal_full_debate: "النقاش الكامل",
        launch_details_hint: "+ اضغط لمعرفة تفاصيل النقاش",
        future_title: "في التركيز: مناظرات قادمة",
        contact_label: "اتصل بنا",
        contact_title: "هل هناك مناظرة تود رؤيتها؟",
        contact_subtitle: "+ اضغط هنا لفتح نموذج الاتصال",
        form_name: "الاسم الكامل *",
        form_name_placeholder: "أدخل الاسم الكامل",
        form_debate_title: "عنوان المناظرة المقترح",
        form_debate_title_placeholder: "ما هو الموضوع الذي تود رؤيته؟",
        form_speakers: "متحدثون محتملون",
        form_speakers_placeholder: "من يجب أن يمثل الأطراف؟",
        form_message: "تفاصيل إضافية *",
        form_message_placeholder: "لماذا هذا الموضوع مثير للاهتمام؟",
        form_contact_info: "كيف يمكننا التواصل معك؟",
        form_contact_info_placeholder: "البريد الإلكتروني أو رقم الهاتف",
        form_error_missing_field: "يرجى ملء عنوان المناظرة أو المتحدثين المحتملين على الأقل.",
        form_submit: "إرسال",
        footer_title: "المزيد من الأحداث قريباً!<br>دعونا نبقى على تواصل:",
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
            headerBtn: document.getElementById('headerRegisterBtn'),
            cardRegisterBtn: document.getElementById('launchCardRegisterBtn')
        };


        if (nextEvent) {
            if (elements.section) elements.section.style.display = 'flex';
            if (elements.navLink) elements.navLink.style.display = 'inline-block';
            if (elements.heroBtn) elements.heroBtn.style.display = 'inline-block';
            if (elements.priceNote) elements.priceNote.style.display = 'block';

            if (elements.mainBtn) {
                // כשיש אירוע: כפתור ראשי רגיל שמפנה להרשמה לאירוע ומסיר את המודאל
                elements.mainBtn.classList.remove('btn-secondary', 'open-newsletter-btn');
                elements.mainBtn.textContent = staticTranslations[lang]?.hero_main_btn || "להרשמה לאירוע הקרוב";
                elements.mainBtn.href = nextEvent.registerLink || "#";
            }

            if (elements.headerBtn) {
                elements.headerBtn.style.display = 'inline-block';
                elements.headerBtn.textContent = staticTranslations[lang]?.nav_register || "להרשמה";
                elements.headerBtn.href = nextEvent.registerLink || "#";
            }
            if (elements.cardRegisterBtn) {
                elements.cardRegisterBtn.href = nextEvent.registerLink || "#";
            }

            // עדכון כותרות בסיס
            if (document.getElementById('launchDate')) document.getElementById('launchDate').textContent = `${staticTranslations[lang]?.nav_launch || 'האירוע הקרוב'} • ${nextEvent.date}`;
            if (document.getElementById('launchTitle')) document.getElementById('launchTitle').textContent = nextEvent.title;
            if (document.getElementById('launchLocationText')) document.getElementById('launchLocationText').textContent = nextEvent.locationName || staticTranslations[lang]?.default_location || "מוזיאון הכנסת, ירושלים";
            if (document.getElementById('launchLocationLink')) document.getElementById('launchLocationLink').href = nextEvent.locationLink || "https://maps.google.com/?q=מוזיאון+הכנסת+ירושלים";

            // פונקציית עזר לבניית ליבת האירוע (הנושא והדוברים)
            const renderEventCore = (event) => {
                let coreHTML = `<div class="t-inner-debate">`;
                if (event.motion) {
                    coreHTML += `
            <span class="motion-label" data-i18n="launch_motion_label">${staticTranslations[lang]?.launch_motion_label || "הנושא המרכזי"}</span>
            <p class="motion-text" style="font-size: 1.8rem; margin-bottom: 25px;">${event.motion}</p>`;
                }
                if (event.sides) {
                    coreHTML += `
            <div class="sides-grid">
                ${buildSideHTML(event.sides.sideA)}
                ${buildSideHTML(event.sides.sideB)}
            </div>`;
                }
                coreHTML += `</div>`;
                return coreHTML;
            };

            // רינדור ה-Timeline הדינמי
            const programGrid = document.getElementById('launchProgramGrid') || document.getElementById('launchTimeline');

            if (programGrid && nextEvent && nextEvent.timeline) {
                programGrid.innerHTML = '';

                // פונקציית עזר מובנית לבניית כרטיסיות הדוברים
                const renderSideHTML = (sideData) => {
                    if (!sideData) return '';
                    const speakersHTML = (sideData.speakers || []).map(sp => `
                        <div class="speaker">
                            <img src="${sp.img || 'assets/archive/avatar-placeholder.webp'}" alt="${sp.name || ''}" class="speaker-img">
                            <div class="speaker-info">
                                <p>${sp.name || ''}</p>
                                <span>${sp.role || ''}</span>
                            </div>
                        </div>
                    `).join('');

                    return `
                        <div class="side">
                            <h4>${sideData.title || ''}</h4>
                            <div class="speakers-list">${speakersHTML}</div>
                        </div>
                    `;
                };

                nextEvent.timeline.forEach(step => {
                    const isCore = step.type === 'debate_core' || step.type === 'keynote_core';

                    if (isCore) {
                        const sidesHTML = nextEvent.sides
                            ? `<div class="sides-grid">${renderSideHTML(nextEvent.sides.sideA)}${renderSideHTML(nextEvent.sides.sideB)}</div>`
                            : '';

                        programGrid.innerHTML += `
                            <div class="program-row is-core">
                                <!-- עמודת השעה נטו -->
                                <div class="program-time-col">
                                    <span class="program-time">${step.time || ''}</span>
                                </div>
                                <!-- עמודת התוכן: כותרת + תיאור + דיבייט -->
                                <div class="program-content-col">
                                    <h4 class="program-title">${step.title || ''}</h4>
                                    <div class="program-body">
                                        <div class="debate-core-block">
                                            <span class="motion-label">${staticTranslations[lang]?.launch_motion_label || "MAIN TOPIC"}</span>
                                            <p class="motion-text">${nextEvent.motion || ''}</p>
                                            ${sidesHTML}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    } else {
                        programGrid.innerHTML += `
                            <div class="program-row">
                                <!-- עמודת השעה נטו -->
                                <div class="program-time-col">
                                    <span class="program-time">${step.time || ''}</span>
                                </div>
                                <!-- עמודת התוכן: כותרת + תיאור -->
                                <div class="program-content-col">
                                    <h4 class="program-title">${step.title || ''}</h4>
                                    <div class="program-body">
                                        <p>${step.desc || ''}</p>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                });
            }
        } else {
            // מצב שאין אירוע קרוב: כאן ורק כאן הוא הופך לכפתור תפוצה שפותח את המודאל
            ['section', 'navLink', 'heroBtn', 'priceNote', 'headerBtn'].forEach(key => {
                if (elements[key]) elements[key].style.display = 'none';
            });

            if (elements.mainBtn) {
                elements.mainBtn.classList.add('btn-secondary', 'open-newsletter-btn');
                elements.mainBtn.textContent = staticTranslations[lang]?.hero_mailing_btn || "הצטרפו לרשימת התפוצה";
                elements.mainBtn.href = "#";
            }
        }
        // ניהול מודאל רשימת תפוצה
        const newsletterModal = document.getElementById('newsletterModal');
        const newsletterCloseBtn = document.getElementById('newsletterModalClose');
        const newsletterBackdrop = document.getElementById('newsletterModalBackdrop');

        function openNewsletterModal() {
            if (newsletterModal) {
                newsletterModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }



        function closeNewsletterModal() {
            if (newsletterModal) {
                newsletterModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }



        // האזנה לכל כפתור עם המחלקה open-newsletter-btn (עובד גם על כפתורים שמתעדכנים דינמית)
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('.open-newsletter-btn');
            if (trigger) {
                e.preventDefault();
                openNewsletterModal();
            }
        });

        if (newsletterCloseBtn) newsletterCloseBtn.addEventListener('click', closeNewsletterModal);
        if (newsletterBackdrop) newsletterBackdrop.addEventListener('click', closeNewsletterModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && newsletterModal && newsletterModal.classList.contains('active')) {
                closeNewsletterModal();
            }
        });

        const newsletterForm = document.getElementById('newsletterForm');
        const newsletterSuccessMsg = document.getElementById('newsletterSuccessMsg');
        const newsletterErrorMsg = document.getElementById('newsletterErrorMsg');
        const newsletterSubmitBtn = document.getElementById('newsletterSubmitBtn');

        if (newsletterForm) {
            newsletterForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const formData = new FormData(newsletterForm);
                newsletterSubmitBtn.disabled = true;
                newsletterSubmitBtn.style.opacity = '0.6';

                try {
                    const response = await fetch(newsletterForm.action, {
                        method: 'POST',
                        body: formData
                    });

                    if (response.ok) {
                        newsletterForm.style.display = 'none';
                        newsletterSuccessMsg.style.display = 'block';
                        if (newsletterErrorMsg) newsletterErrorMsg.style.display = 'none';

                        setTimeout(() => {
                            closeNewsletterModal();
                            newsletterForm.reset();
                            newsletterForm.style.display = 'block';
                            newsletterSuccessMsg.style.display = 'none';
                            newsletterSubmitBtn.disabled = false;
                            newsletterSubmitBtn.style.opacity = '1';
                        }, 2000);
                    } else {
                        throw new Error('Submission failed');
                    }
                } catch (err) {
                    console.error(err);
                    if (newsletterErrorMsg) newsletterErrorMsg.style.display = 'block';
                    newsletterSubmitBtn.disabled = false;
                    newsletterSubmitBtn.style.opacity = '1';
                }
            });
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
        // ד. מנגנון טאבים לארכיון
        const tabBtns = document.querySelectorAll('.archive-tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // מסיר 'active' מכל הכפתורים והמסילות
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // מוסיף 'active' לכפתור שנלחץ ולמסילה המתאימה לו
                btn.classList.add('active');
                const targetId = btn.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');
            });
        });

        // ה. ואלידציה לטופס יצירת קשר (מוודא שלפחות כותרת או דובר מולאו)
        const suggestForm = document.getElementById('suggestForm');
        if (suggestForm) {
            suggestForm.addEventListener('submit', function (e) {
                const titleVal = document.getElementById('debate_title').value.trim();
                const speakersVal = document.getElementById('speakers').value.trim();
                const errorMsg = document.getElementById('formErrorMsg');

                if (!titleVal && !speakersVal) {
                    e.preventDefault(); // עוצר את שליחת הטופס
                    errorMsg.style.display = 'block'; // מציג את השגיאה
                } else {
                    errorMsg.style.display = 'none'; // מעלים את השגיאה אם הכל תקין
                }
            });
        }
    });
    // ==========================================
    // גלילה אוטומטית של הגלריה והארכיון
    // ==========================================
    const archiveContainer = document.getElementById('archiveScroll');

    if (archiveContainer) {
        let scrollSpeed = 0.8; // מהירות הגלילה (פיקסלים לפריים)
        let isAutoScrolling = true;
        let animationFrameId;

        function autoScroll() {
            if (isAutoScrolling) {
                const isRTL = document.documentElement.dir === 'rtl';

                // חישוב הקצה המקסימלי האפשרי לגלילה
                const maxScroll = archiveContainer.scrollWidth - archiveContainer.clientWidth;

                if (isRTL) {
                    archiveContainer.scrollLeft -= scrollSpeed;
                    // חזרה להתחלה כשהגלילה מגיעה לקצה השמאלי
                    if (Math.abs(archiveContainer.scrollLeft) >= maxScroll - 10) {
                        archiveContainer.scrollLeft = 0;
                    }
                } else {
                    archiveContainer.scrollLeft += scrollSpeed;
                    // חזרה להתחלה כשהגלילה מגיעה לקצה הימני (LTR)
                    // שימוש ב-Math.ceil מונע מהגלילה להיתקע על שברי פיקסלים
                    if (Math.ceil(archiveContainer.scrollLeft) >= maxScroll - 10) {
                        archiveContainer.scrollLeft = 0;
                    }
                }
            }
            animationFrameId = requestAnimationFrame(autoScroll);
        }

        // הפעלת לולאת הגלילה
        animationFrameId = requestAnimationFrame(autoScroll);

        // השהיית הגלילה כשמרחפים עם העכבר מעל התמונות
        archiveContainer.addEventListener('mouseenter', () => {
            isAutoScrolling = false;
        });
        archiveContainer.addEventListener('mouseleave', () => {
            isAutoScrolling = true;
        });

        // השהייה בעת מגע במסכי מגע (מובייל) וחזרה לתנועה לאחר עזיבה
        archiveContainer.addEventListener('touchstart', () => {
            isAutoScrolling = false;
        }, { passive: true });

        archiveContainer.addEventListener('touchend', () => {
            setTimeout(() => {
                isAutoScrolling = true;
            }, 1200);
        }, { passive: true });
    }

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