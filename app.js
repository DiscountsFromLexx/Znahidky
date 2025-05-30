document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('telegramForm');
    const instructionBtn = document.querySelector('.instruction-btn');
    const scrollTopBtn = document.querySelector('.scroll-top-btn');

    // Ваш токен бота (отриманий від @BotFather)
    const botToken = ''; // Замініть на ваш токен
    // Chat ID, куди надсилати повідомлення (група, канал або особистий чат)
    const chatId = '@znizjka'; // Замініть на ваш chat ID

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

    // Функція для відправки повідомлення в Telegram
    async function sendToTelegram(message) {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const payload = {
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML' // Для форматування повідомлення
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (data.ok) {
                console.log('Повідомлення успішно надіслано в Telegram!');
                alert('Дані успішно надіслані!');
            } else {
                console.error('Помилка відправки:', data.description);
                alert('Помилка при відправці даних: ' + data.description);
            }
        } catch (error) {
            console.error('Помилка:', error);
            alert('Помилка при відправці даних: ' + error.message);
        }
    }

    // Обробка форми
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const fields = ['field1', 'field2', 'field3', 'field4', 'field5'].map(id => document.getElementById(id).value);

        // Формуємо повідомлення для Telegram
        const message = `
<b>Нова знахідка!</b>
<b>Ціна:</b> ${fields[0] || 'Не вказано'}
<b>Знижка:</b> ${fields[1] || 'Не вказано'}
<b>Додаткові умови:</b> ${fields[2] || 'Не вказано'}
<b>Посилання:</b> ${fields[3] || 'Не вказано'}
<b>Коментарі:</b> ${fields[4] || 'Не вказано'}
        `.trim();

        // Відправляємо повідомлення
        await sendToTelegram(message);

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
