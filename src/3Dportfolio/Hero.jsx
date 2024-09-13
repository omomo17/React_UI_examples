// import motion from 'framer-motion';
// import { section } from 'framer-motion/client';
import Computers from "./Computers";

const Hero = () => {
    return (
        <section className='relative w-full h-screen mx-auto'>
            <div className="sm:px-16 px-6 absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5">
                <div className="flex flex-col justify-center items-center mt-5">
                    <div className="w-5 h-5 rounded-full bg-purple-800" />
                    <div className="w-1 sm:h-80 h-40  bg-gradient-to-b from-purple-800 to-purple-950" />


                </div>
                <div>
                    <h1 className="text-white text-7xl">Hi, Im <span className="text-purple-800">Akiyoshi Omomo</span></h1>
                    <p className="mt-2 text-gray-100 text-4xl">I develop 3D visuals, user interfaces and web apprications!</p>
                </div>
            </div>
<Computers />
</section>
    );
}

export default Hero;