import Image4 from '../../../assets/images/Image4.jpg';
import Image5 from '../../../assets/images/Image5.jpg';

const Features = () => {
  return (
    <div className="flex items-center justify-center pb-20">
      <section id="features" className="w-full max-w-6xl">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl mb-10 mt-3">Features</h2>
          
          <div className="flex flex-wrap justify-center -mx-4">
            <div className="w-full md:w-1/3 px-4 mb-5 mx-5">
              <div className="card shadow-lg rounded-lg overflow-hidden">
                <img src={Image4} className="card-img-top w-full h-48 object-cover" alt="Feature 1 Image" />
                <div className="p-4 pt-2">
                  <h5 className="text-xl font-semibold mb-6">Effortless Stock Analysis</h5>
                  <p className="text-gray-700">
                    Search for stocks, choose analysis periods, and gain insights through clear visualizations of trends and technical indicators - all within a user-friendly interface.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-4 mx-4">
              <div className="card shadow-lg rounded-lg overflow-hidden">
                <img src={Image5} className="card-img-top w-full h-48 object-cover" alt="Feature 2 Image" />
                <div className="p-4 pt-2">
                  <h5 className="text-xl font-semibold mb-6">Data-Driven Decisions</h5>
                  <p className="text-gray-700">
                    Leverage calculations of technical indicators like EMAs and potentially RSI to understand market behavior and make informed investment choices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
