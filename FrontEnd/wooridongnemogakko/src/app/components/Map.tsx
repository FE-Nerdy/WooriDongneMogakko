'use client'

import React, { useEffect } from 'react';
import styles from '../../styles/map.module.css';

export default function Map() {

    useEffect(() => {
        // 지도 초기화
        const initMap = () => {
            const mapOptions = {
                center: new naver.maps.LatLng(37.3595704, 127.105399),

                // 줌 옵션
                zoom: 17,
                zoomControl: true,
                zoomControlOptions: {
                    style: naver.maps.ZoomControlStyle.LARGE,
                    position: naver.maps.Position.TOP_RIGHT
                }
            };
            new naver.maps.Map('map', mapOptions);
        };

        // 이미 로드 시 초기화만 시도
        if (window.naver && window.naver.maps) {
            initMap();
        } else {
            const mapScript = document.createElement('script');
            mapScript.onload = () => initMap();
            mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
            document.head.appendChild(mapScript);
        }
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.mapWrapper}>
                <div id="map" className={styles.map}></div>
            </div>
        </div>
    );
}