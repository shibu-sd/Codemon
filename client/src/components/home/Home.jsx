import React from 'react'
import "../../assets/css/Home.css"
import Button from '@mui/material/Button';
import home1 from "../../assets/images/home1.svg";
import home2 from "../../assets/images/home2.svg";
import home3 from "../../assets/images/home3.svg";
import Footer from '../footer/Footer';
import { useNavigate } from 'react-router-dom';
import UserProblemset from '../userProblemset/UserProblemset';

function Home({ isAuthenticated }) {

    const navigate = useNavigate();

    if (!isAuthenticated) {
        return (
            <div>
                <div className="home-container">
                    <div className="text-container">
                        <h2>
                            <span className="logoColor"> A New Way to Learn </span>
                        </h2>
                        <p className="lightText">
                            Codemon is one of the best platform to help you enhance your
                            problem solving skills, expand your knowledge and prepare for
                            your technical interviews. <b> Register now ! </b>
                        </p>
                        <Button variant="contained" sx={{ backgroundColor: "green", '&:hover': { backgroundColor: "darkgreen" }, fontSize: 18 }} onClick={() => { navigate("/register") }} >
                            Register
                        </Button>
                    </div>
                    <div className="image-container">
                        <img src={home1} alt="home1" className="image" />
                    </div>
                </div>

                <hr style={{ marginTop: 80, marginBottom: 80 }}></hr>

                <div className="home-container">
                    <div className="image-container">
                        <img src={home2} alt="home2" className="image" />
                    </div>
                    <div className="text-container">
                        <h2>
                            <span className="logoColor"> Challenge Yourself with Problemset </span>
                        </h2>
                        <p className="lightText">
                            Our latest problem sets are crafted with a focus on fostering deeper learning and mastery.
                            Each new problem serves as a valuable tool for enhancing your comprehension of key programming concepts,
                            making your learning experience not only challenging but also profoundly educational.
                        </p>
                    </div>
                </div>

                <hr style={{ marginTop: 80 }}></hr>

                <div className="home-container">
                    <div className="text-container">
                        <h2>
                            <span className="logoColor"> Climb the Ranks </span>
                        </h2>
                        <p className="lightText">
                            Embark on a thrilling journey of coding mastery as you ascend the ranks of the Codemon Leaderboard.
                            "Climb the Ranks" beckons you to challenge yourself, compete with fellow coders, and rise to the top
                            echelons of our dynamic community.
                        </p>
                    </div>
                    <div className="image-container">
                        <img src={home3} alt="home3" className="image" />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
    else {
        return (
            <UserProblemset />
        )
    }

}

export default Home