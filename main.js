"use strict";

const map = L.map('map').setView([29.98333, 31.21667], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
const marker = L.marker([29.98333 ,31.21667]).addTo(map);


async function geocodeAndMove(placeName) {
 
  const q = (placeName.trim())?placeName.trim():"197.38.171.88";
  const url = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_M1nEtlqNLx7SYHQ2ahehO5YpCMstx&domain=${q}`;

  try {
    const res = await fetch(url, {
      headers: { 'Accept-Language': 'en' } // اختياري
    });
    const results = await res.json();

    if (!results || results.length === 0) {
    //   alert("لم أجد مكان مطابق. جرّب اسم أدق (مثل 'Sohag, Egypt').");
      return;
    }

    // const lat = parseFloat(results.location.lat);
    // const lng = parseFloat(results.location.lng);
    // console.log(results);
    // حدّث الخريطة و الماركر
    map.setView([lat, lng], 13);
    marker.setLatLng([lat, lng]);
    document.getElementById("IP").innerHTML=`${results.ip}`;
    document.getElementById("Location").innerHTML=`${results.location.city}`;
    document.getElementById("Timezone").innerHTML=`UTC ${results.location.timezone}`;
    document.getElementById("ISP").innerHTML=`${results.isp}`;
    
    // console.log("Moved to:", lat, lng, results);
  } catch (err) {
    // console.error("Geocoding error:", err);
    // alert("حدث خطأ أثناء البحث عن الموقع.");
  }
}

// مثال: استدعاء بعد ضغط زر
document.getElementById("btn").addEventListener('click', () => {
  const place = document.getElementById("ipInput").value;
  geocodeAndMove(place);
});
