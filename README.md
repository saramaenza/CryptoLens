# 💰 CryptoLens

CryptoLens is a React-based web application that allows users to explore and monitor cryptocurrencies, providing real-time market data, historical price charts, and a personalized favorites system through a clean and modern interface.

The project focuses on data visualization, state management, and user experience, integrating the CoinGecko API to retrieve up-to-date cryptocurrency data and detailed market metrics in a reliable and consistent way.

🔗 Live Demo: https://cryptolens-react.vercel.app/

## Features
Cryptocurrency Market Overview
- Real-time price updates
- Market capitalization and trading volume
- 24h percentage price change
- Data sourced from the CoinGecko API
- Clear and readable layout for fast comparison

Detailed Cryptocurrency Information
- Coin name and symbol
- Current price and market rank
- Market cap and total volume
- Price change percentages
- All data retrieved dynamically from CoinGecko

Historical Price Charts
- Interactive charts showing price trends over time
- Multiple time ranges (when available)
- Visual focus on market movement rather than raw numbers
- Helps users understand short-term and long-term trends

Favorites System
- Add and remove cryptocurrencies from favorites
- Quick access to tracked assets
- Personalized experience without authentication
- Favorites persistence (localStorage)

Responsive & Modern UI
- Fully responsive layout
- Optimized for desktop and mobile devices
- Minimalist design to keep the focus on data
- Smooth and intuitive user interactions

## Design Choices

CryptoLens is designed to prioritize clarity and usability when dealing with financial and market data.

Key decisions include:
- A dashboard-oriented layout for quick scanning of multiple assets
- Direct integration with a single, reliable data source (CoinGecko) to ensure consistency
- A charts-first approach to make trends immediately understandable
- Reduced visual noise to avoid cognitive overload

## Technologies Used
Frontend:
- React
- Tailwind CSS

Data & APIs
- JavaScript (ES6+)
-  CoinGecko API
- REST APIs (Fetch)
- Chart library for data visualization (Chart.js)

## UI State Management

The application explicitly manages:
- Loading states during CoinGecko API requests
- Empty states when no cryptocurrencies or favorites are available

## Application Structure

Main components include:
- CryptoList: renders a list of top cryptocurrencies, allowing users to view and favorite them.
- CryptoItem: represents a single cryptocurrency item in a list, showing its name, symbol, price, and favorite toggle.
- CryptoDetail: displays detailed information and statistics about a selected cryptocurrency, including price, market cap, and charts.
- DarkModeToggle: provides a button to toggle between light and dark mode themes.
- Favorites: shows a list of the user's favorite cryptocurrencies for quick access.
- Footer: application footer with credits and author information.
- Header: contains the main navigation, search bar, and dark mode toggle for the app.
- SearchInput: input field for searching cryptocurrencies by name or symbol.
- Sidebar: displays user's favorite cryptocurrencies for easy selection.

## Installation & Local Development

To run the project locally:

#### Clone the repository

git clone https://github.com/saramaenza/CryptoLens.git

#### Install dependencies

npm install

#### Start the development server

npm start

The application will be available at
👉 http://localhost:3000

####⚠️ API Configuration

CryptoLens uses the CoinGecko API, which does not require an API key for basic usage.

However, keep in mind:
- Rate limits apply
- Excessive requests may result in temporary blocking

## Deployment
The portfolio is deployed using Vercel with automatic builds and deployments on every push to the main branch.

## Contributing
Contributions, suggestions, and improvements are welcome!
1- Fork the repository
2- Create a new branch (feature/your-feature-name)
3- Commit your changes
4- Open a Pull Request

## Why this project matters

CryptoLens showcases:
- Integration with a real-world financial API (CoinGecko)
- Handling of large and frequently updated datasets
- Effective data visualization for market analysis
- Clean React architecture and UX-focused design

It demonstrates the ability to transform complex cryptocurrency data into a clear, accessible dashboard, a key skill for modern frontend applications.

## Contact

If you’d like to get in touch with me:

💼 LinkedIn: www.linkedin.com/in/sara-maenza

📧 Email: sara.maenza98@gmail.com

Thank you for visiting my CryptoLens repository!
I’m always open to feedback, collaboration, and new opportunities 😊
