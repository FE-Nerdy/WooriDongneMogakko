"use client";
import styles from "../../styles/create-createcommunity.module.css";

import CreateCommunitySidebar from "../components/CreateCommunitySidebar";
import Map from "../components/Map";

const CreateCommunity = () => {
    return (
        <div className={styles.container}>
            <div className={styles.slide}>
                <CreateCommunitySidebar />
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