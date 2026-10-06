const mockPortfolio = [
    { name: 'Bitcoin', symbol: 'BTC', price: 65000, change24h: 2.5, holdings: 0.15 },
    { name: 'Ethereum', symbol: 'ETH', price: 3200, change24h: -1.2, holdings: 2.5 },
    { name: 'Cardano', symbol: 'ADA', price: 0.45, change24h: 0.8, holdings: 1500 },
    { name: 'Dogecoin', symbol: 'DOGE', price: 0.12, change24h: 5.1, holdings: 10000 }
];

const app = document.getElementById('app');

const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
const formatPercentage = (value) => value.toFixed(2) + '%';

function renderDashboard() {
    app.innerHTML = '<h1>Crypto Portfolio Overview</h1>';
    const table = document.createElement('table');
    const thead = table.createTHead();
    const tbody = table.createTBody();

    thead.innerHTML = `<tr>
        <th>Coin</th><th>Price</th><th>24h Change</th><th>Holdings</th><th>Value</th>
    </tr>`;

    mockPortfolio.forEach(coin => {
        const row = tbody.insertRow();
        const currentValue = coin.price * coin.holdings;
        const changeClass = coin.change24h > 0 ? 'positive' : (coin.change24h < 0 ? 'negative' : 'neutral');

        row.innerHTML = `
            <td>${coin.name} (${coin.symbol})</td>
            <td>${formatCurrency(coin.price)}</td>
            <td class="${changeClass}">${formatPercentage(coin.change24h)}</td>
            <td>${coin.holdings.toFixed(2)}</td>
            <td>${formatCurrency(currentValue)}</td>
        `;
    });

    app.appendChild(table);
}

function updatePortfolioData() {
    mockPortfolio.forEach(coin => {
        // Simulate price fluctuation
        coin.price *= (1 + (Math.random() - 0.5) * 0.03); // +/- 1.5%
        // Simulate 24h change fluctuation
        coin.change24h += (Math.random() - 0.5) * 1.5; // +/- 0.75%
        coin.change24h = Math.max(-100, Math.min(100, coin.change24h)); // Keep reasonable bounds
    });
    renderDashboard();
}

renderDashboard();
setInterval(updatePortfolioData, 5000);
