import PropTypes from "prop-types";

function Footer ({ darkMode}) {
    return (
        <footer className={`${darkMode ? "bg-gray-100 text-gray-900 border-gray-400" : "bg-gray-950/95 text-gray-300 border-gray-600"} py-4 sm:py-5 px-2 sm:px-0 text-center text-xs sm:text-sm border-t`}>
            Data from CoinGecko API <br />
            Designed and Developed by Sara Maenza &copy; 2026
        </footer>
    );
}

Footer.propTypes = {
    darkMode: PropTypes.bool.isRequired,
};

Footer.defaultProps = {
    darkMode: false,
};

export default Footer;