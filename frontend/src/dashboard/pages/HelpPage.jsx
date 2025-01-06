import React from 'react';

const HelpPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center py-10">
            <div className="max-w-7xl w-full p-8 bg-white rounded-lg shadow-lg text-center mx-4 my-8">
                <h1 className="text-4xl font-bold mb-6">Help Center</h1>
                <p className="text-lg text-gray-700 mb-8">
                    Welcome to our Stock Market Website Help Center. Here you’ll find information to help you navigate and use our site.
                </p>

                <div className="space-y-10">
                    {/* Getting Started Section */}
                    <section className="my-8">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4">1. Getting Started</h2>
                        <div className="space-y-3">
                            <div>
                                <h3 className="text-lg font-medium">How do I create an account?</h3>
                                <p className="text-gray-600">
                                    To create an account, click on the <strong>Sign Up</strong> button on the home page. Enter your email, username, and password to register.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium">How do I log in?</h3>
                                <p className="text-gray-600">
                                    Click on the <strong>Login</strong> button and enter your username and password. If you've forgotten your password, use the <strong>Forgot Password</strong> link to reset it.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Stock Data Features Section */}
                    <section className="my-8">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4">2. Using Stock Data Features</h2>
                        <div className="space-y-3">
                            <div>
                                <h3 className="text-lg font-medium">How do I search for stock information?</h3>
                                <p className="text-gray-600">
                                    You can search for stocks by entering a stock symbol (e.g., <strong>AAPL</strong> for Apple) in the search bar. Our system will display real-time stock data, including price, volume, and historical performance.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium">What charts are available?</h3>
                                <p className="text-gray-600">
                                    We offer various charts to visualize stock data, including daily price charts, EMA (Exponential Moving Average), and RSI (Relative Strength Index) charts. Navigate to the <strong>Charts</strong> page for detailed visual data.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Exponential Moving Average (EMA) Section */}
                    <section className="my-8">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4">3. Exponential Moving Average (EMA)</h2>
                        <p className="text-gray-600 mb-4">
                            The <strong>Exponential Moving Average (EMA)</strong> is a type of moving average that places more weight on recent prices, making it more responsive to changes in the market. This differs from the Simple Moving Average (SMA), which applies equal weight to all data points.
                        </p>
                        <h3 className="text-lg font-medium mb-2">Key Features of EMA:</h3>
                        <ul className="list-disc list-inside text-gray-600 mb-4">
                            <li><strong>Weighted to Recent Data:</strong> EMA gives more importance to the most recent prices, allowing traders to quickly identify short-term trends.</li>
                            <li><strong>Trend Identification:</strong> A rising EMA indicates an uptrend, while a falling EMA suggests a downtrend.</li>
                        </ul>
                        <h3 className="text-lg font-medium mb-2">How to Use EMA in Trading:</h3>
                        <p className="text-gray-600 mb-4">
                            Traders often use the EMA to identify trends and possible reversal points. Here are a few popular strategies:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mb-4">
                            <li><strong>Crossovers:</strong> One common strategy is to use two EMAs, a short-term EMA (e.g., 12-day) and a long-term EMA (e.g., 26-day). When the short-term EMA crosses above the long-term EMA, it can signal a buy opportunity, while a crossover below the long-term EMA may indicate a sell signal.</li>
                            <li><strong>Support and Resistance:</strong> In trending markets, the EMA often acts as dynamic support or resistance. Traders may buy when the price touches a rising EMA during an uptrend or sell when it touches a falling EMA in a downtrend.</li>
                        </ul>
                        <p className="text-gray-600">
                            By incorporating EMAs into your trading strategy, you can better understand market trends and make informed decisions based on price momentum and direction.
                        </p>
                    </section>

                    {/* Account Management Section */}
                    <section className="my-8">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4">4. Managing Your Account</h2>
                        <div className="space-y-3">
                            <div>
                                <h3 className="text-lg font-medium">How do I update my account information?</h3>
                                <p className="text-gray-600">
                                    After logging in, go to your <strong>Account Settings</strong> page. Here, you can update your personal information, change your password, and manage your preferences.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium">How do I delete my account?</h3>
                                <p className="text-gray-600">
                                    If you wish to delete your account, please visit the <strong>Account Settings</strong> page and click on <strong>Delete Account</strong>. Please note that this action is irreversible.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Troubleshooting Section */}
                    <section className="my-8">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4">5. Troubleshooting</h2>
                        <div className="space-y-3">
                            <div>
                                <h3 className="text-lg font-medium">I can’t log in. What should I do?</h3>
                                <p className="text-gray-600">
                                    If you’re having trouble logging in, double-check your username and password. If you’ve forgotten your password, use the <strong>Forgot Password</strong> link to reset it.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium">I’m not seeing any stock data. What’s wrong?</h3>
                                <p className="text-gray-600">
                                    Ensure you’ve entered a valid stock symbol. If the issue persists, there may be temporary problems with the data provider. Try refreshing the page or come back later.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;
