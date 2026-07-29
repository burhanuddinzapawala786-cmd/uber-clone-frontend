import homeImg from '../assets/homeImg.jpg'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">

      {/* Background Image */}
      <img
        src={homeImg}
        alt="Uber"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Uber Logo */}
      <h1 className="absolute top-8 left-7 text-4xl font-bold text-white tracking-tight">
        Uber
      </h1>

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 w-full rounded-t-3xl bg-white px-6 py-8">

        <h2 className="text-3xl font-bold text-black">
          Get started with Uber
        </h2>


<Link to="/userLogin">
  <button
    className="mt-8 w-full rounded-xl bg-black py-4 text-lg font-semibold text-white transition hover:bg-neutral-900"
  >
    Continue →
  </button>
</Link>

      </div>

    </div>
  );
};

export default Home;