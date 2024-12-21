"use client";
import styles from "../../styles/create-createcommunity.module.css";

import CreateCommunitySlide from "../components/CreateCommunitySlide";
import Map from "../components/Map";

const CreateCommunity = () => {
    return (
        <div className={styles.container}>
            <div className={styles.slide}>
                <CreateCommunitySlide />
            </div>
            <div className={styles.map}>
                <div className={styles.mapContainer}>
                    <Map />
                </div>
            </div>
        </div>
    )
}

export default CreateCommunity;