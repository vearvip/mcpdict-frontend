import { useState, useEffect } from "react";
import MapTiler from "../../components/MapTiler";
import MapFilter from "../../components/MapFilter";
import styles from "./index.module.less";
import useStore from "@/store";
import { JianCheng } from "../../utils/constant";
import { useMemo } from "react";
import { useMobile, usePad } from "../../utils/hooks";
import { useSearchParams } from "react-router";
import eventBus from "../../event/bus";

export default () => {
  const { store } = useStore();
  const isPad = usePad();
  const isMobile = useMobile();
  const [searchResult, setSearchResult] = useState();
  const [radioValue, setRadioValue] = useState();
  const [searchParams] = useSearchParams();

  const mapDialectInfos = useMemo(() => {
    const dialectInfos = store?.dialectInfos
      ? JSON.parse(JSON.stringify(store.dialectInfos))
      : [];
    if (
      radioValue &&
      searchResult &&
      Array.isArray(searchResult) &&
      searchResult.length > 0 &&
      dialectInfos &&
      Array.isArray(dialectInfos) &&
      dialectInfos.length > 0
    ) {
      const _mapDialectInfos = [];
      const selected = searchResult.find((ele) => ele.char === radioValue)
      const selectedCharItems = selected?.charInfo || [];

      (selectedCharItems || []).forEach((selectedCharItem) => {
        const dialectInfo = dialectInfos.find(
          (ele) => ele[JianCheng] === selectedCharItem.dialectName
        );
        if (!dialectInfo) return;
        dialectInfo.phonetic = (selectedCharItem.infos || [])
          .map((ele) => ele.phonetic)
          .join(" ");
        _mapDialectInfos.push(dialectInfo);
      });
      // console.log('mapDialectInfos', _mapDialectInfos)
      return _mapDialectInfos;
    } else {
      return [];
    }
  }, [searchResult, radioValue, store]);

  const handleSearchResultChange = (newSearchResult) => {
    setSearchResult(newSearchResult);
  };

  const handleRadioValueChange = (newRadioValue) => {
    setRadioValue(newRadioValue);
  };

  useEffect(() => {
    const handler = (...args) => {
      handleSearchResultChange(...args);
    };
    eventBus.on("MAP_SEARCH_EVENT", handler);
    return () => eventBus.off("MAP_SEARCH_EVENT", handler);
  }, []);

  useEffect(() => {
    const handler = (...args) => {
      handleRadioValueChange(...args);
    };
    eventBus.on("MAP_RADIO_EVENT", handler);
    return () => eventBus.off("MAP_RADIO_EVENT", handler);
  }, []);

  return (
    <div
      className={`${styles.map_box}`}
      style={{
        display: isPad ? "block" : "flex",
      }}
    >
      {!isMobile && (
        <div
          className={`${styles.map_left_box}`}
          style={{
            ...(isPad
              ? {
                  width: "100%",
                  // height: 'calc(100vh - 60px - 20px)' : 'calc(100vh - 60px - 20px)',
                  minHeight: 190,
                  marginBottom: 10,
                }
              : {
                  height: "calc(100vh - 60px - 20px)",
                }),
          }}
        >
          <MapFilter
            defaultValue={searchParams.get("q")}
            onSearchResultChange={handleSearchResultChange}
            onRadioValueChange={handleRadioValueChange}
          />
        </div>
      )}
      <MapTiler
        dialectInfos={mapDialectInfos}
        style={{
          // width: 'calc(100% - 20px)',
          width: "100%",
          height: "calc(100vh - 60px - 20px)",
          // marginTop: '10px',
          // marginLeft: '10px',
          borderRadius: 8,
          overflow: "hidden",
          boxSizing: "border-box",
          border: "1px solid var(--border-color)",
          // border: '1px solid blue',
          backgroundColor: "white",
        }}
      />
    </div>
  );
};
