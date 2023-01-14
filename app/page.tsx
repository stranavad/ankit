import Link from "next/link";
import AnkitLogo from "@/public/ankit_logo.png";
import Image from "next/image";


const Home = () => {
    return (
        <>
            <div>
                <div>
                    <Image src={AnkitLogo} alt="Ankit logo" height="40" width="40"/>
                    <h1>Ankit</h1>
                </div>
            </div>
        </>
    );
};

export default Home;