document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('telegramForm');
    const instructionBtn = document.querySelector('.instruction-btn');
    const scrollTopBtn = document.querySelector('.scroll-top-btn');

    // URL вашої Google Cloud Function
    const cloudFunctionUrl = 'ВАШ_URL_CLOUD_FUNCTION'; // Замініть на URL вашої Cloud Function, наприклад, https://us-central1-your-project-id.cloudfunctions.net/znahidky

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
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const fields = ['field1', 'field2', 'field3', 'field4', 'field5'].map(id => document.getElementById(id).value);

        // Формуємо дані для відправки
        const data = {
            price: fields[0] || 'Не вказано',
            discount: fields[1] || 'Не вказано',
            conditions: fields[2] || 'Не вказано',
            link: fields[3] || 'Не вказано',
            comments: fields[4] || 'Не вказано'
        };

        try {
            const response = await fetch(cloudFunctionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (response.ok) {
                alert('Дані успішно надіслані!');
                console.log('Дані:', data);
            } else {
                alert('Помилка: ' + result.error);
            }
        } catch (error) {
            alert('Помилка при відправці: ' + error.message);
        }

        // Логування для дебагу
        console.log("Ціна:", fields[0]);
        console.log("Знижка:", fields[1]);
        console.log("Додаткові умови:", fields[2]);
        console.log("Посилання:", fields[3]);
        console.log("Коментарі:", fields[4]);
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
