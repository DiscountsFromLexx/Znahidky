const { useState, useEffect } = React;

const App = () => {
    const [formData, setFormData] = useState({
        price: '',
        discount: '',
        conditions: '',
        link: '',
        comments: ''
    });
    const [showScrollTop, setShowScrollTop] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Ціна:", formData.price);
        console.log("Знижка:", formData.discount);
        console.log("Додаткові умови:", formData.conditions);
        console.log("Посилання:", formData.link);
        console.log("Коментарі:", formData.comments);
        // Додайте тут логіку відправки до Telegram
    };

    const handleClear = () => {
        setFormData({
            price: '',
            discount: '',
            conditions: '',
            link: '',
            comments: ''
        });
    };

    const scrollToInstructions = () => {
        document.getElementById('instructions').scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleInputFocus = () => {
        setTimeout(() => {
            document.querySelector('.submit-btn').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    };

    const handleClickOutside = (e) => {
        if (!e.target.matches('input, textarea')) {
            document.activeElement.blur();
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white flex flex-col items-center font-sans">
            <button
                onClick={scrollToInstructions}
                className="fixed top-4 right-4 bg-white text-blue-500 border border-blue-500 rounded-lg px-4 py-2 text-lg font-medium hover:bg-blue-500 hover:text-white transition duration-200 z-50"
            >
                Інструкції
            </button>

            <a href="https://t.me/myznahidki" target="_blank" className="mt-6">
                <img
                    src="https://raw.githubusercontent.com/DiscountsFromAli/X-CUBOT/main/images/znahidki.PNG"
                    alt="Знахідки"
                    className="w-16 h-16"
                />
            </a>

            <h1 className="mt-4 text-xl font-bold text-gray-600 text-center px-4">
                Ставайте співавтором каналу, діліться своїми знахідками!
            </h1>

            <form onSubmit={handleSubmit} className="w-full max-w-md mt-4 space-y-4 px-4">
                <div>
                    <label htmlFor="price" className="block text-lg font-medium text-orange-500">Ціна:</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        placeholder="Введіть кінцеву ціну"
                        required
                        className="w-full p-2 border border-blue-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="discount" className="block text-lg font-medium text-orange-500">Знижка:</label>
                    <input
                        type="text"
                        id="discount"
                        name="discount"
                        value={formData.discount}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        placeholder="Введіть розмір знижки"
                        required
                        className="w-full p-2 border border-blue-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="conditions" className="block text-lg font-medium text-orange-500">Додаткові умови:</label>
                    <input
                        type="text"
                        id="conditions"
                        name="conditions"
                        value={formData.conditions}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        placeholder="Вкажіть умови, якщо є"
                        className="w-full p-2 border border-blue-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="link" className="block text-lg font-medium text-orange-500">Посилання:</label>
                    <input
                        type="text"
                        id="link"
                        name="link"
                        value={formData.link}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        placeholder="Вставте посилання на товар"
                        required
                        className="w-full p-2 border border-blue-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="comments" className="block text-lg font-medium text-orange-500">Коментарі:</label>
                    <input
                        type="text"
                        id="comments"
                        name="comments"
                        value={formData.comments}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        placeholder="Додайте коментар"
                        className="w-full p-2 border border-blue-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col space-y-4">
                    <button
                        type="submit"
                        className="submit-btn bg-gradient-to-b from-blue-500 to-blue-600 text-white py-2 rounded-lg text-lg font-medium hover:from-blue-600 hover:to-blue-700 transition duration-200 shadow-md"
                    >
                        ☀ ПОДІЛИТИСЬ ☀
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="clear-btn bg-gradient-to-b from-blue-500 to-blue-600 text-white py-2 rounded-lg text-lg font-medium hover:from-blue-600 hover:to-blue-700 transition duration-200 shadow-md"
                    >
                        🧹 ОЧИСТИТИ 🧹
                    </button>
                </div>
            </form>

            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 bg-orange-500 text-white rounded-full p-3 text-sm font-medium hover:bg-orange-600 transition duration-200 z-50"
                >
                    Вгору
                </button>
            )}

            <div className="w-full max-w-md mt-8 px-4">
                <h2 className="text-lg font-bold text-orange-500">🔆 НАШІ ТЕЛЕГРАМ КАНАЛИ</h2>
                <div className="mt-2 text-gray-800 text-sm space-y-2">
                    <p>
                        🌶 <strong>𝐀ʟì↻ᴀᴛട 🐾</strong> - товари за ціною більше 100 грн.<br />
                        <a href="https://t.me/+7dNuLBNGj244MWU6" target="_blank" className="text-blue-600 hover:underline">https://t.me/+7dNuLBNGj244MWU6</a>
                    </p>
                    <p>
                        💸 <strong>Аліекспрес - ШАРА НА ШАРУ!</strong> - товари дешевше 100 грн.<br />
                        <a href="https://t.me/+96EuuIO84_I3NDU6" target="_blank" className="text-blue-600 hover:underline">https://t.me/+96EuuIO84_I3NDU6</a>
                    </p>
                    <p>
                        🔥 <strong>Сховище промокодів з AliExpress</strong> - купуйте дешевше з промокодами.<br />
                        <a href="https://t.me/+TSjki0TSVRI4YzYy" target="_blank" className="text-blue-600 hover:underline">https://t.me/+TSjki0TSVRI4YzYy</a>
                    </p>
                    <p className="mt-4">シ Ми працюємо для вас та завдяки вам!♥️</p>
                </div>
            </div>

            <div id="instructions" className="w-full max-w-md mt-8 px-4 pb-8">
                <h2 className="text-xl font-bold text-orange-500">Інструкції</h2>
                <div className="mt-2 text-gray-800 text-sm space-y-2">
                    <p>✅ У полі "Ціна" вказуйте ціну та валюту.</p>
                    <p>✅ У полі "Знижка" вказуйте розмір знижки (
