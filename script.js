const joystickContainer = document.getElementById('joystick-container');
const joystickKnob = document.getElementById('joystick-knob');
const mayor = document.getElementById('mayor-img');
const buildBtn = document.getElementById('build-btn');
const buildingSpot = document.getElementById('building-spot');
const builder1 = document.getElementById('builder1');
const builder2 = document.getElementById('builder2');

// مختصات اولیه شهردار روی سکو (درصدی)
let mayorX = 50; 
let mayorY = 45; 
const maxMoveX = 15; // چقدر چپ و راست بره
const maxMoveY = 15; // چقدر بالا و پایین بره

// --- منطق جوی‌استیک (حرکت) ---
let isDragging = false;

joystickContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    moveKnob(e);
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) moveKnob(e);
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    joystickKnob.style.transform = 'translate(0, 0)'; // برگشت به مرکز
    // برگشت شهردار به حالت اولیه یا نگه داشتن موقعیت فعلی
});

// برای لمس در موبایل
joystickContainer.addEventListener('touchstart', (e) => {
    isDragging = true;
    moveKnob(e.touches[0]);
    e.preventDefault();
});
document.addEventListener('touchmove', (e) => {
    if (isDragging) moveKnob(e.touches[0]);
});
document.addEventListener('touchend', () => {
    isDragging = false;
    joystickKnob.style.transform = 'translate(0, 0)';
});

function moveKnob(event) {
    const rect = joystickContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // محاسبه فاصله از مرکز
    let deltaX = event.clientX - centerX;
    let deltaY = event.clientY - centerY;

    // محدود کردن دایره (شعاع ۳۰ پیکسل)
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxRadius = 30;

    if (distance > maxRadius) {
        deltaX = (deltaX / distance) * maxRadius;
        deltaY = (deltaY / distance) * maxRadius;
    }

    // حرکت دادن دستگیره
    joystickKnob.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    // حرکت دادن شهردار روی سکو بر اساس درصد
    // اگر دستگیره به راست رفت، شهردار به راست می‌ره
    mayorX = 50 + (deltaX / maxRadius) * maxMoveX;
    mayorY = 45 - (deltaY / maxRadius) * maxMoveY; // منفی چون Y در CSS برعکس است

    // اعمال موقعیت جدید شهردار
    mayor.style.left = mayorX + '%';
    mayor.style.bottom = mayorY + '%';
}

// --- دکمه ساخت ---
buildBtn.addEventListener('click', () => {
    // انیمیشن چکش زدن سازنده‌ها
    builder1.style.transform = 'rotate(-20deg) translateY(-10px)';
    builder2.style.transform = 'rotate(-20deg) translateY(-10px)';
    
    setTimeout(() => {
        builder1.style.transform = 'rotate(0) translateY(0)';
        builder2.style.transform = 'rotate(0) translateY(0)';
    }, 300);

    // ساختمان رو نشون بده
    const icons = ['icon-water.jpg', 'icon-fire.jpg', 'icon-education.jpg', 'icon-hospital.jpg'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    
    buildingSpot.innerHTML = `<img src="${randomIcon}" style="width:100%; height:100%; object-fit:contain;">`;
    buildingSpot.classList.add('built');
});