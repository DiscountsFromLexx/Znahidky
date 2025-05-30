document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('telegramForm');
    const instructionBtn = document.querySelector('.instruction-btn');
    const scrollTopBtn = document.querySelector('.scroll-top-btn');

    // Прокрутка до інструкцій
    instructionBtn.addEventListener('click', () => {
        document.getElementById('instructions').scrollIntoView({ behavior: 'smooth' });
    });

    // Показ/приховування кнопки "Вгору"
    window.addEventListener('scroll', () => {
        scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    // Функція прокрутки нагору
    window.scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Обробка форми
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const fields = ['field1', 'field2', 'field3', 'field4', 'field5'].map(id => document.getElementById(id).value);
        console.log("Ціна:", fields[0]);
        console.log("Знижка:", fields[1]);
        console.log("Додаткові умови:", fields[2]);
        console.log("Посилання:", fields[3]);
        console.log("Коментарі:", fields[4]);
        // Додайте логіку відправки до Telegram
    });

    // Очищення форми
    document.querySelector('.clear-btn').addEventListener('click', () => {
        form.reset();
    });

    // Закриття клавіатури при кліку поза полем
    document.addEventListener('click', (e) => {
        if (!e.target.matches('input')) {
            document.activeElement.blur();
        }
    });
});
