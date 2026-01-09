function Footer ({ darkMode}) {
    return (
        <footer className={`${darkMode ? "bg-gray-100 text-gray-900 border-gray-400" : "bg-gray-950/95 text-gray-300 border-gray-600"} py-5 text-center text-xs border-t`}>
            Data from CoinGecko API <br></br>
            Designed and Developed by Sara Maenza &copy; 2026
        </footer>
    );
}

export default Footer;