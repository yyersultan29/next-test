"use client";

import { useEffect, useRef } from "react";
const API_KEY = "cc048d4a-1c6d-4d81-b20b-3768bc9a021b";

export default function Home() {
  const mapRef = useRef<any>();

  useEffect(() => {
    let map: any;

    if (window.ymaps) {
      window.ymaps.ready(initializeMap);
    } else {
      const script = document.createElement("script");
      script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${API_KEY}`;
      script.onload = () => window.ymaps.ready(initializeMap);
      document.head.appendChild(script);
    }

    function initializeMap() {
      map = new window.ymaps.Map("bcc", {
        center: [45, 73],
        zoom: 13,
      });

      const searchControl = new window.ymaps.control.SearchControl({
        options: {
          provider: "yandex#search",
        },
      });

      // // add search to map
      map.controls.add(searchControl);

      // search control event
      searchControl.events.add("resultselect", (event) => {
        const results = searchControl.getResultsArray();
        const selected = event.get("index");
        // @ts-ignore
        const point = results[selected]?.geometry.getCoordinates();
        map.geoObjects.removeAll();

        const placemark = new window.ymaps.Placemark(point, {
          // @ts-ignore
          balloonContent: results[selected].properties.get("text"),
        });
        map.geoObjects.add(placemark);
        map.setCenter(point, 14);
      });

      // fixed marker
      const placemark = new window.ymaps.Placemark(
        map.getCenter(),
        {
          hintContent: "Your placemark hint", // Optional hint text
          balloonContent: "Your placemark description", // Optional description
        },
        {
          preset: "islands#circleDotIcon",
          // preset: "islands#redIcon", // Preset icon color
          draggable: false, // Placemark should not be draggable
        }
      );

      map.geoObjects.add(placemark);

      // events

      map.events.add("actiontick", function (event: any) {
        // Get the center of the map
        const center = map.getCenter();

        // Update placemark position
        // @ts-ignore
        placemark.geometry.setCoordinates(center);
      });
    }

    return () => {
      if (map) {
        map.destroy();
      }
    };
  }, []);

  return (
    <main className="flex flex-col items-center justify-between ">
      {/* {JSON.stringify(d,null,2)} */}
      <h1>Yandex map</h1>

      <div id="bcc" style={{ width: 700, height: 400 }} />
    </main>
  );
}
