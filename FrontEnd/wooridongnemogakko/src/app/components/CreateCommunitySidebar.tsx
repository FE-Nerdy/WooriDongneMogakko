import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from "../../styles/Sidebar.module.css";

interface searchedDataType {
  id: number;
  lat: number;
  lng: number;
  leaderName: string;
  description: string;
};


//추후 lazyloading or 쓰로틀링 사용 고려
//처음에 자신의 주변 데이터들이 나오게 출력
const CreateCommunitySidebar = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchErrorMessage, setSearchErrorMessage] = useState<string>("");
  const [searchedData, setSearchedData] = useState<searchedDataType[]>([]);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchKeyword.trim()) {
      setSearchErrorMessage("검색어를 입력하세요")
      return;
    }

    try {
      const response = await axios.post<string>('http://localhost:4000/search', { keyword: searchKeyword }, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = JSON.parse(response.data);
      setSearchedData(result);
      console.log(result);
    }
    catch (error) {
      console.error("error");

      // 추후 에러 핸들링 예정
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }
      else {
        setResponseMessage('error');
      }
    };
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <form onSubmit={handleSearchSubmit}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="지역 검색"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit"> 검색 </button>
          </div>
        </form>

        <div className={styles.searchedDataList}>
          {searchedData.length > 0 ? (
            searchedData.map((dataItem) => (
              <div key={dataItem.id} className={styles.searchedDataListItem}>
                <p>ID: {dataItem.id}</p>
                <p>Leader: {dataItem.leaderName}</p>
                <p>Description: {dataItem.description}</p>
                <p>Location: {dataItem.lat}, {dataItem.lng}</p>
              </div>
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      </div >
    </div >
  )
}

export default CreateCommunitySidebar;