// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Particle Background Effect
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particleContainer.appendChild(particle);
    }
}

// Enhanced Card Hover Effects
function initCardEffects() {
    const cards = document.querySelectorAll('.service-card, .doctor-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
    });
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Add scroll animation to elements
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .doctor-card, .about-text, .contact-item');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
});

// Counter Animation for Statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when hero stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Form Handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const service = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !phone || !service) {
            showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً', 'success');
        contactForm.reset();
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'Cairo', sans-serif;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Appointment Booking Functionality
document.querySelectorAll('.btn-primary, .btn-outline').forEach(button => {
    if (button.textContent.includes('احجز موعد')) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showAppointmentModal();
        });
    }
});

function showAppointmentModal() {
    // Remove existing modal
    const existingModal = document.querySelector('.appointment-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'appointment-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>حجز موعد</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <form class="appointment-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>الاسم الكامل</label>
                            <input type="text" required>
                        </div>
                        <div class="form-group">
                            <label>رقم الهاتف</label>
                            <input type="tel" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>التخصص المطلوب</label>
                            <select required>
                                <option value="">اختر التخصص</option>
                                <option value="cardiology">أمراض القلب</option>
                                <option value="neurology">الأمراض العصبية</option>
                                <option value="orthopedics">جراحة العظام</option>
                                <option value="pediatrics">طب الأطفال</option>
                                <option value="ophthalmology">طب العيون</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>التاريخ المفضل</label>
                            <input type="date" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>الوقت المفضل</label>
                        <select required>
                            <option value="">اختر الوقت</option>
                            <option value="09:00">9:00 صباحاً</option>
                            <option value="10:00">10:00 صباحاً</option>
                            <option value="11:00">11:00 صباحاً</option>
                            <option value="14:00">2:00 مساءً</option>
                            <option value="15:00">3:00 مساءً</option>
                            <option value="16:00">4:00 مساءً</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>ملاحظات إضافية</label>
                        <textarea rows="3" placeholder="أي ملاحظات أو أعراض تود ذكرها..."></textarea>
                    </div>
                    <div class="modal-buttons">
                        <button type="submit" class="btn btn-primary">تأكيد الحجز</button>
                        <button type="button" class="btn btn-secondary modal-cancel">إلغاء</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const overlay = modal.querySelector('.modal-overlay');
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        backdrop-filter: blur(5px);
    `;
    
    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 2rem;
        max-width: 600px;
        width: 90%;
        position: relative;
        transform: scale(0.9);
        transition: transform 0.3s ease;
        font-family: 'Cairo', sans-serif;
        direction: rtl;
        text-align: right;
    `;
    
    const header = modal.querySelector('.modal-header');
    header.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #f0f0f0;
    `;
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #666;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Style form elements
    modal.querySelectorAll('.form-row').forEach(row => {
        row.style.cssText = `
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1rem;
        `;
    });
    
    modal.querySelectorAll('.form-group').forEach(group => {
        group.style.marginBottom = '1rem';
    });
    
    modal.querySelectorAll('label').forEach(label => {
        label.style.cssText = `
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #2c5aa0;
        `;
    });
    
    modal.querySelectorAll('input, select, textarea').forEach(input => {
        input.style.cssText = `
            width: 100%;
            padding: 0.8rem;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            font-family: 'Cairo', sans-serif;
            transition: border-color 0.3s ease;
        `;
    });
    
    const buttons = modal.querySelector('.modal-buttons');
    buttons.style.cssText = `
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        content.style.transform = 'scale(1)';
    }, 10);
    
    // Close modal functionality
    function closeModal() {
        modal.style.opacity = '0';
        content.style.transform = 'scale(0.9)';
        setTimeout(() => modal.remove(), 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    modal.querySelector('.modal-cancel').addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Form submission
    modal.querySelector('.appointment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('تم حجز موعدك بنجاح! سنتواصل معك لتأكيد الموعد', 'success');
        closeModal();
    });
    
    // Set minimum date to today
    const dateInput = modal.querySelector('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}

//* Emergency Button Functionality */
document.querySelectorAll('.btn-secondary, .btn-emergency').forEach(button => {
    if (button.textContent.includes('خدمات الطوارئ') || button.textContent.includes('اتصال طوارئ') || button.classList.contains('btn-emergency')) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showEmergencyModal();
        });
    }
});

function showEmergencyModal() {
    const modal = document.createElement('div');
    modal.className = 'emergency-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content emergency-content">
                <div class="emergency-header">
                    <i class="fas fa-ambulance"></i>
                    <h3>خدمات الطوارئ</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="emergency-info">
                    <div class="emergency-item">
                        <i class="fas fa-phone-alt"></i>
                        <div>
                            <h4>اتصل بالطوارئ</h4>
                            <p class="emergency-number">779977926</p>
                        </div>
                    </div>
                    <div class="emergency-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <div>
                            <h4>موقع المستشفى</h4>
                            <p>الجمهورية اليمنية، صنعاء، سعوان، دوار الأربعين، مستشفى النبلاء الحديث</p>
                        </div>
                    </div>
                    <div class="emergency-item">
                        <i class="fas fa-clock"></i>
                        <div>
                            <h4>متاح على مدار الساعة</h4>
                            <p>24/7 - خدمة طوارئ متواصلة</p>
                        </div>
                    </div>
                </div>
                <div class="emergency-buttons">
                    <a href="tel:779977926" class="btn btn-primary emergency-call">
                        <i class="fas fa-phone"></i>
                        اتصال فوري
                    </a>
                    <button class="btn btn-secondary modal-close-btn">إغلاق</button>
                </div>
            </div>
        </div>
    `;
    
    // Style emergency modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: block;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const overlay = modal.querySelector('.modal-overlay');
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.6);
        backdrop-filter: blur(3px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
    `;
    
    const content = modal.querySelector('.emergency-content');
    content.style.cssText = `
        background: #ffffff;
        border-radius: 18px;
        padding: 1.25rem 1.25rem 1.5rem;
        max-width: 720px;
        width: 92%;
        position: relative;
        transform: translateY(10px);
        transition: transform 0.25s ease;
        font-family: 'Cairo', sans-serif;
        direction: rtl;
        text-align: right;
        max-height: 85vh;
        overflow: auto;
        box-shadow: 0 20px 60px rgba(0,0,0,0.25);
    `;
    
    const header = modal.querySelector('.emergency-header');
    header.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 1rem;
        color: #dc2626;
        border-bottom: 2px solid #f1f5f9;
        padding-bottom: .5rem;
    `;
    
    header.querySelector('i').style.fontSize = '2rem';
    
    modal.querySelectorAll('.emergency-item').forEach(item => {
        item.style.cssText = `
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
            padding: .9rem;
            background: #f8fafc;
            border-radius: 12px;
        `;
        
        item.querySelector('i').style.cssText = `
            font-size: 1.25rem;
            color: #dc2626;
            width: 28px;
        `;
    });
    
    const emergencyNumber = modal.querySelector('.emergency-number');
    emergencyNumber.style.cssText = `
        font-size: 1.4rem;
        font-weight: 800;
        color: #dc2626;
        direction: ltr;
    `;
    
    const buttons = modal.querySelector('.emergency-buttons');
    buttons.style.cssText = `
        display: flex;
        gap: .75rem;
        justify-content: center;
        margin-top: 1rem;
    `;
    
    const callBtn = modal.querySelector('.emergency-call');
    callBtn.style.cssText = `
        background: #dc2626;
        border-color: #dc2626;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1rem;
        border-radius: 999px;
        padding: .6rem 1rem;
        animation: pulse 2s infinite;
    `;
    
    document.body.appendChild(modal);
    const fab = document.querySelector('.fab-container');
    if (fab) fab.style.display = 'none';
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    }, 10);
    
    // Close functionality
    function closeModal() {
        modal.style.opacity = '0';
        content.style.transform = 'translateY(10px)';
        setTimeout(() => { modal.remove(); if (fab) fab.style.display = ''; document.body.style.overflow = prevOverflow; }, 250);
    }
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', function esc(e){ if(e.key==='Escape'){ closeModal(); document.removeEventListener('keydown', esc);} });
}

// Page Loader - Disabled
function initPageLoader() {
    // Page loader functionality disabled as requested
    // Keeping header and navigation styling intact
    return;
}

// Morphing Background
function initMorphingBackground() {
    const morphingBg = document.createElement('div');
    morphingBg.className = 'morphing-bg';
    document.body.appendChild(morphingBg);
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        morphingBg.style.setProperty('--mouse-x', x + '%');
        morphingBg.style.setProperty('--mouse-y', y + '%');
    });
}

// Floating Action Button with Contact Menu
function initFloatingActionButton() {
    const fab = document.createElement('div');
    fab.className = 'fab-container';
    fab.innerHTML = `
        <div class="fab-menu">
            <button class="fab-option" onclick="makeHotlineCall()" title="اتصال ساخن">
                <i class="fas fa-phone"></i>
                <span>اتصال ساخن</span>
            </button>
            <button class="fab-option" onclick="openWhatsApp()" title="واتس اب">
                <i class="fab fa-whatsapp"></i>
                <span>واتس اب</span>
            </button>
            <button class="fab-option" onclick="showAppointmentModal()" title="حجز موعد">
                <i class="fas fa-calendar-plus"></i>
                <span>حجز موعد</span>
            </button>
        </div>
        <button class="fab fab-main" onclick="toggleFabMenu()">
            <i class="fas fa-plus"></i>
        </button>
    `;
    document.body.appendChild(fab);
}

// Toggle Floating Actions
function toggleFloatingActions() {
    const floatingActions = document.getElementById('floatingActions');
    const floatingMainBtn = document.getElementById('floatingMainBtn');
    
    if (floatingActions.classList.contains('show')) {
        floatingActions.classList.remove('show');
        floatingMainBtn.classList.remove('active');
        floatingMainBtn.innerHTML = '<i class="fas fa-plus"></i>';
    } else {
        floatingActions.classList.add('show');
        floatingMainBtn.classList.add('active');
        floatingMainBtn.innerHTML = '<i class="fas fa-times"></i>';
    }
}

// Hotline Call Function
function makeHotlineCall() {
    // Use the updated emergency hotline
    window.location.href = 'tel:779977926';
}

// Legacy WhatsApp function from older FAB: delegate to the main openWhatsApp
function openWhatsAppLegacy() { openWhatsApp(); }

// New: toggle FAB menu visibility
function toggleFabMenu() {
    const container = document.querySelector('.fab-container');
    const menu = container && container.querySelector('.fab-menu');
    if (!container || !menu) return;
    const isOpen = menu.classList.contains('show');
    menu.classList.toggle('show', !isOpen);
    container.classList.toggle('active', !isOpen);
}

// New: open WhatsApp chat
function openWhatsApp() {
    // Note: best practice is to use international format. If you want, I can switch to +967780480480.
    const msg = encodeURIComponent('مرحباً، أريد الاستفسار عن الخدمات والحجوزات.');
    window.open(`https://wa.me/780480480?text=${msg}`, '_blank');
}

// ========= Service Interactivity =========
function showInfoPopup(title, description) {
    const existing = document.querySelector('.info-modal');
    if (existing) existing.remove();
    const modal = document.createElement('div');
    modal.className = 'info-modal';
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="modal-close" aria-label="Close">&times;</button>
        </div>
        <div class="modal-body"><p style="line-height:1.9;color:#334155">${description}</p></div>
        <div class="modal-buttons"><button class="btn btn-primary info-book">احجز الآن</button></div>
      </div>`;

    // styles
    modal.style.cssText = 'position:fixed;inset:0;z-index:10000;display:block;opacity:0;transition:opacity .25s ease;font-family:\'Cairo\',sans-serif;direction:rtl;text-align:right';
    const overlay = modal.querySelector('.modal-overlay');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;padding:16px;';
    const content = modal.querySelector('.modal-content');
    content.style.cssText = 'background:#fff;border-radius:18px;max-width:680px;width:92%;padding:1.1rem 1.2rem 1.4rem;transform:translateY(10px);transition:transform .25s ease;max-height:85vh;overflow:auto;box-shadow:0 20px 60px rgba(0,0,0,.25)';
    modal.querySelector('.modal-header').style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem;padding-bottom:.5rem;border-bottom:2px solid #f1f5f9;color:#0f172a';
    modal.querySelector('.modal-close').style.cssText = 'background:none;border:none;font-size:1.8rem;cursor:pointer;color:#64748b;line-height:1;';
    modal.querySelector('.modal-buttons').style.cssText = 'display:flex;justify-content:center;margin-top:.75rem;';

    document.body.appendChild(modal);
    requestAnimationFrame(()=>{ modal.style.opacity='1'; content.style.transform='translateY(0)'; });
    function close(){ modal.style.opacity='0'; content.style.transform='translateY(10px)'; setTimeout(()=>modal.remove(),220); }
    overlay.addEventListener('click', (e)=>{ if(e.target===overlay) close(); });
    modal.querySelector('.modal-close').addEventListener('click', close);
    modal.querySelector('.info-book').addEventListener('click', ()=>{ close(); showAppointmentModal(); });
}

function createAnchoredTooltip(target, text){
    const tip = document.createElement('div');
    tip.className = 'anchored-tooltip';
    tip.innerHTML = `<div class="anchored-tooltip-content">${text}</div><div class="anchored-tooltip-arrow"></div>`;
    target.style.position = target.style.position || 'relative';
    target.appendChild(tip);
    // position top-center; if not enough space, flip
    const rect = target.getBoundingClientRect();
    const topPref = -8; // offset upwards
    const willOverflowTop = rect.top - 60 < 0;
    if (willOverflowTop) {
        tip.classList.add('bottom');
        tip.style.top = (target.offsetHeight + 8) + 'px';
    } else {
        tip.style.bottom = (target.offsetHeight + topPref) + 'px';
    }
    tip.style.left = '50%';
    tip.style.transform = 'translateX(-50%)';
    requestAnimationFrame(()=> tip.classList.add('show'));
    return tip;
}

function initServiceInteractivity(){
    // Map specialty titles to descriptions if data attributes are missing
    const descMap = {
        'أمراض القلب والأوعية الدموية': 'تشخيص وعلاج أمراض القلب والأوعية: تخطيط القلب، القسطرة، جراحة القلب، زراعة منظمات ضربات القلب.',
        'الأمراض العصبية والدماغية': 'علاج أمراض الجهاز العصبي: الصرع، الجلطات، جراحة الأعصاب الدقيقة، الصداع النصفي.',
        'جراحة العظام والمفاصل': 'استبدال المفاصل، علاج الكسور المعقدة، جراحة العمود، مناظير المفاصل.',
        'طب الأطفال وحديثي الولادة': 'رعاية شاملة لحديثي الولادة والأطفال: عناية مركزة، تطعيمات، جراحة أطفال، اضطرابات النمو.',
        'طب وجراحة العيون': 'ليزك، علاج المياه البيضاء والزرقاء، جراحة الشبكية الدقيقة، زراعة العدسات.'
    };

    document.querySelectorAll('.service-detailed').forEach(card=>{
        const title = card.querySelector('h3')?.textContent.trim();
        const moreBtn = card.querySelector('.btn.btn-outline');
        const bookBtn = card.querySelector('.btn.btn-primary');
        const desc = card.getAttribute('data-description') || descMap[title] || '';

        if (moreBtn){
            moreBtn.addEventListener('click', (e)=>{ e.preventDefault(); showInfoPopup(title || 'تفاصيل الخدمة', desc); });
        }
        if (bookBtn){
            bookBtn.addEventListener('click', (e)=>{ e.preventDefault(); showAppointmentModal(); });
        }

        // Hover tooltip near the icon/title
        let tip; const hoverTarget = card.querySelector('.service-image, h3') || card;
        card.addEventListener('mouseenter', ()=>{ if(!tip){ tip = createAnchoredTooltip(hoverTarget, desc || title || 'تفاصيل الخدمة'); }});
        card.addEventListener('mouseleave', ()=>{ if(tip){ tip.remove(); tip=null; }});
    });
}

// Magnetic Effect
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.btn, .service-card, .doctor-card');
    
    magneticElements.forEach(el => {
        el.classList.add('magnetic');
        
        el.addEventListener('mouseenter', (e) => {
            el.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0px, 0px)';
        });
    });
}

// Staggered Animations
function initStaggeredAnimations() {
    const sections = document.querySelectorAll('.services-grid, .doctors-grid, .vision-mission-grid, .accommodation-grid, .news-grid');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('stagger-animation');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => observer.observe(section));
}

// Enhanced Interactive Elements
function initInteractiveElements() {
    const cards = document.querySelectorAll('.service-card, .doctor-card, .vision-card, .accommodation-card, .news-card');
    
    cards.forEach(card => {
        card.classList.add('interactive-element');
        
        // Add neon glow to premium cards
        if (card.classList.contains('premium') || card.classList.contains('featured')) {
            card.classList.add('neon-glow');
        }
    });
}

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize all enhanced UI features
    initScrollProgress();
    initMorphingBackground();
    initFloatingActionButton();
    initMagneticEffect();
    initStaggeredAnimations();
    initInteractiveElements();
    createParticles();
    initCardEffects();
    initServiceInteractivity();
    
    // Add loading class to elements for staggered animation
    const elements = document.querySelectorAll('.service-card, .doctor-card, .stat');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('loading');
        }, index * 100);
    });
});

// Initialize page loader immediately
initPageLoader();

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effects to cards
document.querySelectorAll('.service-card, .doctor-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Toggle Action Buttons on Logo Click
function toggleActionButtons() {
    const actionButtons = document.getElementById('actionButtons');
    const heroLogo = document.querySelector('.hero-logo');
    
    if (actionButtons.classList.contains('show')) {
        actionButtons.classList.remove('show');
        heroLogo.style.opacity = '1';
    } else {
        actionButtons.classList.add('show');
        heroLogo.style.opacity = '0.3';
    }
}

// Action Button Functions
// Legacy duplicate removed: use the unified openWhatsApp() defined later

function showReservationModal() {
    // Create reservation modal
    const modal = document.createElement('div');
    modal.className = 'reservation-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>حجز موعد</h3>
                <button class="close-btn" onclick="closeModal()">&times;</button>
            </div>
            <form class="reservation-form">
                <div class="form-group">
                    <label>الاسم الكامل</label>
                    <input type="text" required>
                </div>
                <div class="form-group">
                    <label>رقم الهاتف</label>
                    <input type="tel" required>
                </div>
                <div class="form-group">
                    <label>التخصص المطلوب</label>
                    <select required>
                        <option value="">اختر التخصص</option>
                        <option value="cardiology">أمراض القلب</option>
                        <option value="neurology">الأمراض العصبية</option>
                        <option value="orthopedics">جراحة العظام</option>
                        <option value="pediatrics">طب الأطفال</option>
                        <option value="ophthalmology">طب العيون</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>تاريخ الموعد المفضل</label>
                    <input type="date" required>
                </div>
                <button type="submit" class="btn btn-primary">تأكيد الحجز</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

// Legacy duplicate removed: use the unified makeCall() defined later

function showMap() {
    // Create map modal
    const modal = document.createElement('div');
    modal.className = 'map-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>موقع المستشفى</h3>
                <button class="close-btn" onclick="closeModal()">&times;</button>
            </div>
            <div class="map-container">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.123456789!2d44.2066!3d15.3694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDIyJzA5LjgiTiA0NMKwMTInMjMuOCJF!5e0!3m2!1sar!2s!4v1234567890"
                    width="100%" 
                    height="400" 
                    style="border:0;" 
                    allowfullscreen="" 
                    loading="lazy">
                </iframe>
                <div class="address-info">
                    <h4>العنوان</h4>
                    <p>شارع الأربعين الدوار، صنعاء، الجمهورية اليمنية</p>
                    <p><strong>الهاتف:</strong> 780780780</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    toggleFloatingActions();
}

function closeModal() {
    const modals = document.querySelectorAll('.reservation-modal, .map-modal');
    modals.forEach(modal => modal.remove());
}

// Hospital Map Functionality
function showFloor(floorId) {
    // Remove active class from all tabs and floors
    document.querySelectorAll('.floor-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.floor-map').forEach(floor => {
        floor.classList.remove('active');
    });
    
    // Add active class to selected tab and floor
    document.querySelector(`[onclick="showFloor('${floorId}')"]`).classList.add('active');
    document.getElementById(floorId).classList.add('active');
}

// Department Room Tooltip Functionality
function initDepartmentTooltips() {
    const departmentRooms = document.querySelectorAll('.department-room[data-info]');
    const tooltip = document.getElementById('departmentTooltip');
    
    if (!tooltip) return;
    
    departmentRooms.forEach(room => {
        room.addEventListener('mouseenter', (e) => {
            const info = room.getAttribute('data-info');
            tooltip.querySelector('.tooltip-content').textContent = info;
            tooltip.classList.add('show');
            
            // Position tooltip
            const rect = room.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });
        
        room.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show');
        });
    });
}

// Doctor Filtering Functionality
function initDoctorFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const doctorCards = document.querySelectorAll('.doctor-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            doctorCards.forEach(card => {
                const cardSpecialty = card.getAttribute('data-specialty');
                
                if (filterValue === 'all' || cardSpecialty === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Enhanced Medical Background Animation
function createMedicalBackground() {
    const existingBg = document.querySelector('.medical-background');
    if (existingBg) return; // Don't create if already exists
    
    const medicalBg = document.createElement('div');
    medicalBg.className = 'medical-background';
    
    // Create ECG lines
    for (let i = 0; i < 5; i++) {
        const ecgLine = document.createElement('div');
        ecgLine.className = 'ecg-line';
        medicalBg.appendChild(ecgLine);
    }
    
    // Create pulse circles
    for (let i = 0; i < 5; i++) {
        const pulseCircle = document.createElement('div');
        pulseCircle.className = 'pulse-circle';
        medicalBg.appendChild(pulseCircle);
    }
    
    // Create medical icons
    const medicalIcons = [
        'fas fa-heartbeat',
        'fas fa-stethoscope', 
        'fas fa-user-md',
        'fas fa-pills',
        'fas fa-syringe',
        'fas fa-microscope',
        'fas fa-dna',
        'fas fa-lungs'
    ];
    
    medicalIcons.forEach(iconClass => {
        const icon = document.createElement('i');
        icon.className = `${iconClass} medical-icon`;
        medicalBg.appendChild(icon);
    });
    
    document.body.insertBefore(medicalBg, document.body.firstChild);
}

// Add heartbeat animation to specific elements
function addHeartbeatAnimations() {
    // Add heartbeat to emergency buttons
    const emergencyElements = document.querySelectorAll('.btn-emergency, .emergency-dept, .dept-icon');
    emergencyElements.forEach(element => {
        if (element.textContent.includes('طوارئ') || element.classList.contains('emergency-dept')) {
            element.classList.add('heartbeat');
        }
    });
    
    // Add heartbeat to heart icons
    const heartIcons = document.querySelectorAll('.fa-heart, .fa-heartbeat');
    heartIcons.forEach(icon => {
        icon.classList.add('heartbeat');
    });
}

// Floating Action Button functionality
function toggleFloatingActions() {
    const floatingActions = document.getElementById('floatingActions');
    const mainBtn = document.getElementById('floatingMainBtn');
    if (floatingActions && mainBtn) {
        floatingActions.classList.toggle('show');
        mainBtn.classList.toggle('active');
    }
}

function makeCall() {
    window.location.href = 'tel:780480480';
}

function openWhatsApp() {
    // Note: For WhatsApp, international format is recommended, but using the provided number as requested
    window.open('https://wa.me/780480480?text=مرحباً، أريد الاستفسار عن خدمات المستشفى', '_blank');
}

// Generic Info Modal
function showInfoModal(title, description) {
    const existing = document.querySelector('.info-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'info-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" aria-label="Close">&times;</button>
            </div>
            <div class="modal-body">
                <p style="line-height:1.9;color:#334155">${description}</p>
            </div>
            <div class="modal-buttons">
                <button class="btn btn-primary info-book">احجز الآن</button>
            </div>
        </div>
    `;

    // Styles
    modal.style.cssText = 'position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .25s ease;font-family:\'Cairo\',sans-serif;direction:rtl;text-align:right';
    const overlay = modal.querySelector('.modal-overlay');
    overlay.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,.65);backdrop-filter:blur(4px)';
    const content = modal.querySelector('.modal-content');
    content.style.cssText = 'background:#fff;border-radius:18px;max-width:640px;width:92%;padding:1.25rem 1.25rem 1.5rem;transform:translateY(15px);transition:transform .25s ease;';
    modal.querySelector('.modal-header').style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding-bottom:.75rem;border-bottom:2px solid #f1f5f9;margin-bottom:1rem;';
    modal.querySelector('.modal-close').style.cssText = 'background:none;border:none;font-size:1.8rem;cursor:pointer;color:#64748b;line-height:1;';
    modal.querySelector('.modal-buttons').style.cssText = 'display:flex;justify-content:center;margin-top:1rem;';

    document.body.appendChild(modal);
    requestAnimationFrame(()=>{ modal.style.opacity='1'; content.style.transform='translateY(0)'; });

    function close(){ modal.style.opacity='0'; content.style.transform='translateY(15px)'; setTimeout(()=>modal.remove(),250); }
    overlay.addEventListener('click', close);
    modal.querySelector('.modal-close').addEventListener('click', close);
    modal.querySelector('.info-book').addEventListener('click', ()=>{ close(); showAdvancedBookingModal(); });
}

// Advanced Booking Modal
function showAdvancedBookingModal(preselectedSpecialty = '') {
    const existing = document.querySelector('.advanced-booking-modal');
    if (existing) existing.remove();

    const specialties = {
        cardiology: { name: 'أمراض القلب', doctors: ['د. أحمد النبلاء','د. سارة القلوب','د. هشام نبيل'] },
        neurology: { name: 'الأمراض العصبية', doctors: ['د. منى الأعصاب','د. علي الدماغ','د. ياسر المخ'] },
        orthopedics: { name: 'جراحة العظام', doctors: ['د. ناصر العظام','د. ريم المفاصل','د. آدم العمود الفقري'] },
        pediatrics: { name: 'طب الأطفال', doctors: ['د. ليلى الأطفال','د. فؤاد النمو','د. نجوى الحضّانة'] },
        ophthalmology: { name: 'طب العيون', doctors: ['د. هدى العيون','د. مازن البصر','د. رؤى النظر'] }
    };

    const bookingTypes = [
        { id: 'consult', label: 'استشارة/عيادة' },
        { id: 'operation', label: 'حجز عملية' },
        { id: 'analysis', label: 'حجز تحليل' },
        { id: 'pharmacy', label: 'زيارة الصيدلية' }
    ];

    const analyses = ['تحليل دم شامل','هرمونات','فيروسات','سكر تراكمي','دهون','وظائف كبد','وظائف كلى'];

    const modal = document.createElement('div');
    modal.className = 'advanced-booking-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>حجز موعد</h3>
                <button class="modal-close" aria-label="Close">&times;</button>
            </div>
            <form class="booking-form">
                <div class="form-row">
                    <div class="form-group">
                        <label>نوع الحجز</label>
                        <select name="type">${bookingTypes.map(t=>`<option value="${t.id}">${t.label}</option>`).join('')}</select>
                    </div>
                    <div class="form-group">
                        <label>التخصص الطبي</label>
                        <select name="specialty">${Object.entries(specialties).map(([k,v])=>`<option value="${k}">${v.name}</option>`).join('')}</select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>اختر الطبيب</label>
                        <select name="doctor"></select>
                    </div>
                    <div class="form-group">
                        <label>العيادة</label>
                        <select name="clinic">
                            <option value="A">العيادة A</option>
                            <option value="B">العيادة B</option>
                            <option value="VIP">VIP</option>
                        </select>
                    </div>
                </div>
                <div class="form-row analysis-row" style="display:none">
                    <div class="form-group" style="grid-column:1/-1">
                        <label>اختر التحاليل المطلوبة</label>
                        <div class="analysis-list">${analyses.map(a=>`<label style='display:inline-flex;gap:.4rem;align-items:center;margin:.25rem .75rem .25rem 0'><input type='checkbox' value='${a}'> <span>${a}</span></label>`).join('')}</div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>التاريخ</label>
                        <input type="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>الوقت</label>
                        <input type="time" name="time" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>الاسم الكامل</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="form-group">
                        <label>رقم الهاتف</label>
                        <input type="tel" name="phone" value="780480480" required>
                    </div>
                </div>
                <div class="form-group" style="grid-column:1/-1">
                    <label>ملاحظات</label>
                    <textarea name="notes" rows="3" placeholder="اكتب أي تفاصيل إضافية..."></textarea>
                </div>
                <div class="modal-buttons">
                    <button type="submit" class="btn btn-primary">تأكيد الحجز</button>
                    <button type="button" class="btn btn-secondary modal-cancel">إلغاء</button>
                </div>
            </form>
        </div>
    `;

    // Styles
    modal.style.cssText = 'position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .25s ease;font-family:\'Cairo\',sans-serif;direction:rtl;text-align:right';
    const overlay = modal.querySelector('.modal-overlay');
    overlay.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(4px)';
    const content = modal.querySelector('.modal-content');
    content.style.cssText = 'background:#fff;border-radius:18px;max-width:780px;width:94%;padding:1.25rem 1.25rem 1.5rem;max-height:92vh;overflow:auto;transform:translateY(15px);transition:transform .25s ease;';
    modal.querySelector('.modal-header').style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding-bottom:.75rem;border-bottom:2px solid #f1f5f9;margin-bottom:1rem;';
    modal.querySelector('.modal-close').style.cssText = 'background:none;border:none;font-size:1.8rem;cursor:pointer;color:#64748b;line-height:1;';
    modal.querySelectorAll('.form-row').forEach(r=>r.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem');
    modal.querySelectorAll('input,select,textarea').forEach(el=>el.style.cssText='width:100%;padding:.8rem;border:2px solid #e2e8f0;border-radius:10px;font-family:inherit;');
    modal.querySelector('.modal-buttons').style.cssText='display:flex;justify-content:center;gap:1rem;margin-top:.75rem';

    document.body.appendChild(modal);
    requestAnimationFrame(()=>{ modal.style.opacity='1'; content.style.transform='translateY(0)'; });

    // Populate doctors per specialty
    const specialtySelect = modal.querySelector('select[name="specialty"]');
    const doctorSelect = modal.querySelector('select[name="doctor"]');
    function refreshDoctors() {
        const key = specialtySelect.value;
        const docs = (specialties[key]?.doctors) || [];
        doctorSelect.innerHTML = docs.map(d=>`<option value="${d}">${d}</option>`).join('');
    }
    specialtySelect.addEventListener('change', refreshDoctors);
    const typeSelect = modal.querySelector('select[name="type"]');
    const analysisRow = modal.querySelector('.analysis-row');
    typeSelect.addEventListener('change', ()=>{
        analysisRow.style.display = typeSelect.value === 'analysis' ? 'block' : 'none';
    });

    function close(){ modal.style.opacity='0'; content.style.transform='translateY(15px)'; setTimeout(()=>modal.remove(),250); }
    overlay.addEventListener('click', close);
    modal.querySelector('.modal-close').addEventListener('click', close);
    modal.querySelector('.modal-cancel').addEventListener('click', close);
    modal.querySelector('.booking-form').addEventListener('submit', (e)=>{
        e.preventDefault();
        // Collect booking data and open SMS intent (mobile) or WhatsApp fallback (desktop)
        const t = typeSelect.value;
        const specName = specialties[specialtySelect.value]?.name || '';
        const doc = doctorSelect.value || '';
        const date = modal.querySelector('input[name="date"]').value;
        const time = modal.querySelector('input[name="time"]').value;
        const name = modal.querySelector('input[name="name"]').value;
        const phone = modal.querySelector('input[name="phone"]').value;
        const notes = modal.querySelector('textarea[name="notes"]').value;
        const selectedAnalyses = Array.from(modal.querySelectorAll('.analysis-list input:checked')).map(i=>i.value).join(', ');
        const body = `طلب حجز: نوع=${t}، تخصص=${specName}، طبيب=${doc}، تاريخ=${date} ${time}، اسم=${name}، هاتف=${phone}${selectedAnalyses? '، تحاليل='+selectedAnalyses : ''}${notes? '، ملاحظات='+notes : ''}`;

        const ua = navigator.userAgent.toLowerCase();
        const isMobile = /iphone|ipad|android|mobile/.test(ua);
        const smsUrl = `sms:780480480?body=${encodeURIComponent(body)}`;
        const waUrl = `https://wa.me/780480480?text=${encodeURIComponent(body)}`;
        window.open(isMobile ? smsUrl : waUrl, '_blank');

        showNotification('تم إرسال طلب الحجز. سنتواصل لتأكيد الموعد.', 'success');
        close();
    });

    if (preselectedSpecialty) specialtySelect.value = preselectedSpecialty;
    refreshDoctors();
    const dateInput = modal.querySelector('input[name="date"]');
    dateInput.min = new Date().toISOString().split('T')[0];
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initCardEffects();
    createMedicalBackground();
    addHeartbeatAnimations();
    initDepartmentTooltips();
    initDoctorFiltering();

    // Wire service info buttons
    document.querySelectorAll('[data-info-specialty]').forEach(btn => {
        btn.addEventListener('click', (e)=>{
            const spec = btn.getAttribute('data-info-specialty');
            const card = btn.closest('.service-detailed');
            const title = card?.querySelector('h3')?.textContent || 'تفاصيل الخدمة';
            const desc = card?.getAttribute('data-description') || '';
            showInfoModal(title, desc);
        });
    });

    // Additional services info cards
    document.querySelectorAll('.service-card[data-info-title]').forEach(card=>{
        card.style.cursor = 'pointer';
        card.addEventListener('click', ()=>{
            showInfoModal(card.getAttribute('data-info-title'), card.getAttribute('data-info'));
        });
    });

    // Departments map: click opens info modal
    document.querySelectorAll('.department-room').forEach(room=>{
        room.addEventListener('click', ()=>{
            const title = room.querySelector('h4, span')?.textContent || 'القسم';
            const info = room.getAttribute('data-info') || 'معلومات هذا القسم ستتوفر قريباً.';
            showInfoModal(title, info);
        });
    });

    // Generic: any element with data-info-title + data-info opens info modal
    document.querySelectorAll('[data-info-title][data-info]').forEach(el=>{
        el.style.cursor = 'pointer';
        el.addEventListener('click', ()=>{
            showInfoModal(el.getAttribute('data-info-title'), el.getAttribute('data-info'));
        });
    });

    // Anchored hover tooltips near elements (departments + services)
    function attachHoverTooltip(el, textGetter){
        let tip; let arrow;
        function build(){
            const text = typeof textGetter==='function'? textGetter() : textGetter;
            if (!text) return;
            tip = document.createElement('div');
            tip.className = 'anchored-tooltip';
            tip.textContent = text;
            arrow = document.createElement('div');
            arrow.className = 'anchored-tooltip-arrow';
            tip.appendChild(arrow);
            document.body.appendChild(tip);
            position();
            requestAnimationFrame(()=> tip.classList.add('show'));
        }
        function destroy(){ if (tip){ tip.classList.remove('show'); setTimeout(()=>tip&&tip.remove(),150); tip=null; } }
        function position(){
            if(!tip) return; const r = el.getBoundingClientRect();
            const tipW = tip.offsetWidth; const tipH = tip.offsetHeight;
            const above = r.top > tipH + 16; // can place above?
            const top = window.scrollY + (above ? (r.top - tipH - 10) : (r.bottom + 10));
            const left = window.scrollX + r.left + (r.width/2) - (tipW/2);
            tip.style.top = `${Math.max(0, top)}px`;
            tip.style.left = `${Math.max(8, left)}px`;
            tip.classList.toggle('bottom', !above);
        }
        el.addEventListener('mouseenter', build);
        el.addEventListener('mouseleave', destroy);
        el.addEventListener('mousemove', position);
        window.addEventListener('scroll', position, { passive:true });
        window.addEventListener('resize', position);
    }
    document.querySelectorAll('.department-room[data-info]').forEach(el=>{
        attachHoverTooltip(el, ()=>el.getAttribute('data-info'));
    });
    document.querySelectorAll('.service-detailed').forEach(el=>{
        const desc = el.getAttribute('data-description') || el.querySelector('.service-content p')?.textContent || '';
        attachHoverTooltip(el, ()=>desc);
    });
});

// 3D Card Effects
function init3DCardEffects() {
    const cards = document.querySelectorAll('.service-card, .doctor-card, .vision-card, .accommodation-card, .news-card');
    
    cards.forEach(card => {
        card.classList.add('card-3d');
        
        const inner = document.createElement('div');
        inner.className = 'card-3d-inner';
        inner.innerHTML = card.innerHTML;
        
        card.innerHTML = '';
        card.appendChild(inner);
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            inner.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Advanced Hover Animations
function initAdvancedHoverAnimations() {
    // Add hover classes to elements
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.add('hover-lift', 'hover-glow');
    });
    
    document.querySelectorAll('.doctor-card').forEach(card => {
        card.classList.add('hover-tilt', 'hover-glow');
    });
    
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.add('hover-lift');
    });
    
    document.querySelectorAll('.vision-card, .accommodation-card').forEach(card => {
        card.classList.add('hover-lift');
    });
}

// Dynamic Background Patterns
function initDynamicBackgrounds() {
    const sections = document.querySelectorAll('.services, .about, .vision-mission');
    const patterns = ['pattern-dots', 'pattern-grid', 'pattern-waves'];
    
    sections.forEach((section, index) => {
        section.classList.add(patterns[index % patterns.length]);
    });
}

// Animated Counters
function initAnimatedCounters() {
    const counters = [
        { selector: '.stats-patients', target: 50000, suffix: '+' },
        { selector: '.stats-doctors', target: 150, suffix: '+' },
        { selector: '.stats-departments', target: 25, suffix: '' },
        { selector: '.stats-years', target: 15, suffix: '+' }
    ];
    
    // Create stats section if it doesn't exist
    if (!document.querySelector('.stats-section')) {
        const statsSection = document.createElement('section');
        statsSection.className = 'stats-section';
        statsSection.innerHTML = `
            <div class="container">
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="counter stats-patients">0</span>
                        <p>مريض سعيد</p>
                    </div>
                    <div class="stat-item">
                        <span class="counter stats-doctors">0</span>
                        <p>طبيب متخصص</p>
                    </div>
                    <div class="stat-item">
                        <span class="counter stats-departments">0</span>
                        <p>قسم طبي</p>
                    </div>
                    <div class="stat-item">
                        <span class="counter stats-years">0</span>
                        <p>سنة خبرة</p>
                    </div>
                </div>
            </div>
        `;
        
        const aboutSection = document.querySelector('.about');
        if (aboutSection) {
            aboutSection.parentNode.insertBefore(statsSection, aboutSection.nextSibling);
        }
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const element = document.querySelector(counter.selector);
                    if (element && !element.classList.contains('animated')) {
                        element.classList.add('animated');
                        animateCounter(element, 0, counter.target, counter.suffix);
                    }
                });
            }
        });
    });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateCounter(element, start, end, suffix) {
    const duration = 2000;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * easeOutCubic(progress));
        element.textContent = current.toLocaleString() + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Progress Bars
function initProgressBars() {
    const progressData = [
        { label: 'رضا المرضى', value: 98 },
        { label: 'جودة الخدمة', value: 95 },
        { label: 'الأمان', value: 100 },
        { label: 'التقنية الحديثة', value: 92 }
    ];
    
    // Create progress section
    const progressSection = document.createElement('div');
    progressSection.className = 'progress-section';
    progressSection.innerHTML = `
        <div class="container">
            <h3>إحصائيات الجودة</h3>
            <div class="progress-grid">
                ${progressData.map(item => `
                    <div class="progress-item">
                        <div class="progress-label">
                            <span>${item.label}</span>
                            <span class="progress-value">${item.value}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" data-value="${item.value}"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        aboutSection.appendChild(progressSection);
    }
    
    // Animate progress bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFills = entry.target.querySelectorAll('.progress-fill');
                progressFills.forEach(fill => {
                    const value = fill.getAttribute('data-value');
                    setTimeout(() => {
                        fill.style.width = value + '%';
                    }, 300);
                });
            }
        });
    });
    
    if (progressSection) {
        observer.observe(progressSection);
    }
}

// Page Transitions
function initPageTransitions() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.classList.add('page-transition');
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Interactive Timeline
function initInteractiveTimeline() {
    const timelineData = [
        { year: '2008', title: 'تأسيس المستشفى', description: 'بداية رحلتنا في تقديم الرعاية الصحية المتميزة' },
        { year: '2012', title: 'توسعة الخدمات', description: 'إضافة أقسام جديدة ومعدات طبية متطورة' },
        { year: '2016', title: 'الاعتماد الدولي', description: 'حصولنا على شهادات الجودة العالمية' },
        { year: '2020', title: 'التحول الرقمي', description: 'تطبيق أحدث التقنيات في الرعاية الصحية' },
        { year: '2024', title: 'المستقبل', description: 'مواصلة التطوير والابتكار في الخدمات الطبية' }
    ];
    
    // Create timeline section
    const timelineSection = document.createElement('section');
    timelineSection.className = 'timeline-section';
    timelineSection.innerHTML = `
        <div class="container">
            <div class="section-header">
                <h2>رحلتنا عبر الزمن</h2>
                <p>تاريخ من التميز والإنجازات في الرعاية الصحية</p>
            </div>
            <div class="timeline">
                ${timelineData.map((item, index) => `
                    <div class="timeline-item" data-index="${index}">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h4>${item.year}</h4>
                            <h5>${item.title}</h5>
                            <p>${item.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        aboutSection.parentNode.insertBefore(timelineSection, aboutSection.nextSibling);
    }
    
    // Animate timeline items
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = entry.target.getAttribute('data-index');
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
}

console.log('مستشفى النبلاء الحديث - Website Loaded Successfully!');
