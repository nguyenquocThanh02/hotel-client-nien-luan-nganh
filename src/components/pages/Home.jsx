import { useEffect } from "react";
import { useState } from "react";
import Slider from "../component/Slider"
import { getRoomTypes } from "../service/AxiosFunction";

function Home() {
    const [type, setType] = useState([]);

    useEffect(() => {
        getRoomTypes().then((type) => setType(type))
    }, [])
    return (  
        <main>
           <Slider/>
                {
                    type.map((t, index) => (
                        <div key={index}>{t}</div>
                    ))
                }
        </main>
    );
}

export default Home;