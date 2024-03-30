import { loader } from '../assets'
const Loader = ({ title }) => (
  <div className="w-full flex flex-col items-center justify-center">
    <img src={loader} alt="loader" className='w-32 h-32 object-contain' />
    <h1 className='mt-4 text-white font-bold text-2xl'>{title || "loading..."}</h1>
  </div>
);

export default Loader;
