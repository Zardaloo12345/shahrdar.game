const wheelRing = document.getElementById('wheel-ring');
const spinBtn = document.getElementById('spin-btn');
const builder1 = document.getElementById('builder1');
const builder2 = document.getElementById('builder2');
const buildingSpot = document.getElementById('building-spot');
const icons = document.querySelectorAll('.wheel-icon');

let currentRotation = 0;
const angleStep = 90; // آیکون‌ها هر ۹۰ درجه هستن

// لیست نیازها (به ترتیب چرخش)
const needs = ['water', 'fire', 'edu', 'health'];

spinBtn.addEventListener('click', () => {
    // ۳۶۰ درجه چرخش کامل (یک دور کامل)
    currentRotation += 360;
    
    // اعمال چرخش
    wheelRing.style.transform = `rotate(${currentRotation}deg)`;

    // صبر میکنیم چرخش تموم بشه بعدش آیکون بالای سر شهردار رو پیدا میکنیم
    setTimeout(() => {
        // پیدا کردن آیکون در بالای دایره
        // به دلیل چرخش کامل، ایندکس آیکون بالای دایره رو باید پیدا کنیم
        // برای ساده‌سازی، بعد از یک دور کامل، ایندکس ۰ (آب) رو انتخاب میکنیم
        // و بعد میریم سراغ ایندکس بعدی
        const normalizedRotation = currentRotation % 360;
        let activeIndex = 0;

        if (normalizedRotation === 90) activeIndex = 1;
        if (normalizedRotation === 180) activeIndex = 2;
        if (normalizedRotation === 270) activeIndex = 3;
        if (normalizedRotation === 0) activeIndex = 0;

        const needType = needs[activeIndex];

        // ساخت ساختمان
        triggerBuilders(needType);

        // ریست کردن چرخش بعدی (برای اینکه دوباره از ۰ شروع شه)
        // اما چون چرخش ۳۶۰ درجه‌ای هست، دوباره ۳۶۰ اضافه میشه که همون ۰ در نظر گرفته میشه
        currentRotation = normalizedRotation;

    }, 600); // صبر میکنیم انیمیشن چرخش تموم بشه
});

function triggerBuilders(need) {
    spinBtn.disabled = true;
    spinBtn.style.opacity = '0.5';

    // شروع انیمیشن چکش زدن
    builder1.classList.add('hammering');
    builder2.classList.add('hammering');

    // مخفی کردن ساختمان قبلی
    buildingSpot.classList.remove('built');
    buildingSpot.innerHTML = '';

    setTimeout(() => {
        let buildingImg = '';
        
        switch(need) {
            case 'water': buildingImg = 'icon-water.png'; break;
            case 'fire': buildingImg = 'icon-fire.png'; break;
            case 'edu': buildingImg = 'icon-education.png'; break;
            case 'health': buildingImg = 'icon-hospital.png'; break;
        }

        buildingSpot.innerHTML = `<img src="${buildingImg}" style="width: 100%; height: 100%; object-fit: contain;">`;
        buildingSpot.classList.add('built');

        // توقف چکش زدن
        builder1.classList.remove('hammering');
        builder2.classList.remove('hammering');

        // فعال کردن دکمه
        spinBtn.disabled = false;
        spinBtn.style.opacity = '1';

    }, 1200);
}