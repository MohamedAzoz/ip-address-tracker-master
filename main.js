// "use strict";

// let btn=document.getElementById("btn");


// btn.addEventListener('click',
// function () {
//     const domain=document.getElementById("ipInput").value;
//     console.log(domain);
    
//     fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_M1nEtlqNLx7SYHQ2ahehO5YpCMstx&domain=${domain}`,{
//         method:"GET"
//         })
//         .then(res=>res.json())
//         .then(data=>{
//         // console.log(data);
//         // console.log(data.location.lat);

//         const map = new L.Map('map').setView([data.location.lat,data.location.lng], 13);

//         const tiles = new L.TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             maxZoom: 18,
//             attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//         }).addTo(map);
//      });
// });


// افتراض: لديك map و marker مُنشئين مسبقًا (كما فعلت قبل)
const map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
const marker = L.marker([51.505, -0.09]).addTo(map);


async function geocodeAndMove(placeName) {
 
  const q = (placeName.trim())?placeName.trim():"192.212.174.101";
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

    const lat = parseFloat(results.location.lat);
    const lng = parseFloat(results.location.lng);
    console.log(results);
    // حدّث الخريطة و الماركر
    map.setView([lat, lng], 13);
    marker.setLatLng([lat, lng]);
    document.getElementById("IP").innerHTML=`${results.ip}`;
    document.getElementById("Location").innerHTML=`${results.location.city}`;
    document.getElementById("Timezone").innerHTML=`UTC ${results.location.timezone}`;
    document.getElementById("ISP").innerHTML=`${results.isp}`;
    
    console.log("Moved to:", lat, lng, results);
  } catch (err) {
    console.error("Geocoding error:", err);
    // alert("حدث خطأ أثناء البحث عن الموقع.");
  }
}

// مثال: استدعاء بعد ضغط زر
document.getElementById("btn").addEventListener('click', () => {
  const place = document.getElementById("ipInput").value;
  geocodeAndMove(place);
});
