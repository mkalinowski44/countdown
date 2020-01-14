var countdown = new Countdown(".counter", {
   date: "14.1.2020 7:00", // required
   template: "Pozostało: {D} Dni, {H} Godzin, {M} minut i {S} sekund", // default: "{D} Days, {H} Hours, {M} Minutes, {S} Seconds"
   endText: "Odliczanie zakończone", // default null
   addZero: true, // default false
   serverTime: "13.1.2020 7:00" // default null
})