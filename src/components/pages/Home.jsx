import { useEffect } from "react";
import { useState } from "react";
import IntroduceHotel from "../component/IntroduceHotel";
import RoomCarousel from "../component/RoomCarousel";
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
            <RoomCarousel/>
            <IntroduceHotel/>
            <RoomCarousel/>
        </main>
    );
}

export default Home;