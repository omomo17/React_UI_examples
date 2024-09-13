/* eslint-disable react/no-unknown-property */
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./Hero";


const App = () => {
    return (
        <>
            <div class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            <BrowserRouter>

                <div>
                    <div>
                        <Navbar />
                        <Hero/>
                    </div>
                    {/* <h1>About</h1>
                <h1>Experience</h1>
                <h1>Tech</h1>
                <h1>Works</h1>
                <h1>Feedbacks</h1> */}
                    <div className="relative z-0">
                        {/* <h1>Contact</h1>
                    <h1>StarsCanvas</h1> */}
                    </div>
                </div>
            </BrowserRouter>
        </>
    );
};

export default App;