import React from 'react';

const AboutPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center py-10">
            <div className="max-w-7xl w-full p-8 bg-white rounded-lg shadow-lg text-center mx-4 my-8">
                <h1 className="text-4xl font-bold mb-6">About Us</h1>
                <p className="text-lg text-gray-700 mb-8">
                    Welcome to our Stock Market Website! We are dedicated to providing you with the best tools and information to navigate the world of trading and investments.
                </p>

                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-4">
                    Our mission is to empower individuals with knowledge and resources to make informed investment decisions. We strive to simplify complex financial concepts and provide real-time data to help our users succeed in their trading journey.
                </p>
                <p className="text-gray-600 mb-4">
                    We believe that everyone should have access to the information they need to thrive in the stock market, and we work tirelessly to enhance our platform and features for our users.
                </p>

                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Team</h2>
                <p className="text-gray-600 mb-4">
                    We are a passionate team of finance enthusiasts, developers, and designers committed to building a user-friendly platform. Our diverse backgrounds and expertise in technology and finance allow us to create innovative solutions for traders of all levels.
                </p>
                <p className="text-gray-600 mb-4">
                    Together, we are driven by a shared vision of transforming the way individuals interact with the financial markets.
                </p>

                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Join Us</h2>
                <p className="text-gray-600 mb-4">
                    Whether you are a beginner looking to learn about the stock market or an experienced trader seeking advanced tools, we invite you to join our community. Together, we can navigate the exciting world of investing!
                </p>
                <p className="text-gray-600 mb-4">
                    Engage with us through our various channels, participate in discussions, and share your insights to contribute to a vibrant trading community.
                </p>

                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Contact Us</h2>
                <p className="text-gray-600 mb-4">
                    If you have any questions or feedback, feel free to reach out to us at <a href="mailto:khushi.mis03@gmail.com" className="text-blue-500 underline">khushi.mis03@gmail.com</a>
                </p>
                <p className="text-gray-600 mb-4">
                    We value your input and are always looking to improve our services based on user feedback.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
