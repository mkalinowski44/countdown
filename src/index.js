class Countdown {
   constructor(element, options) {
      this.element = document.querySelector(element)
      this.template = options.template || '{D} Days, {H} Hours, {M} Minutes, {S} Seconds'
      this.serverTime = options.serverTime || null
      this.endText = options.endText || null
      this.addZero = options.addZero || false
      this.interval = null
      
      try {
         this.date = options.date
      } catch(error) {
         console.error("date is require")
         return;
      }

      this.time = {
         days: 0,
         hours: 0,
         minutes: 0,
         seconds: 0,
         isZero: function() {
            return this.days == 0 && this.hours == 0 && this.minutes == 0 && this.seconds == 0 ? true : false
         }
      }

      this.date = this.convertDate(this.date)
      
      if(this.serverTime) {
         this.serverTime = this.convertDate(this.serverTime)
      }

      this.startInterval()
   }

   convertDate(dateString) {
      let dateSplit = dateString.split(' ')
      let dateDays = dateSplit[0].split('.')
      let dateHours = dateSplit[1] ? dateSplit[1].split(':') : [0, 0, 0]
      let date

      try {
         date = new Date(`${dateDays[1]}.${dateDays[0]}.${dateDays[2]} ${dateHours[0]}:${dateHours[1]}:${dateHours[2] ? dateHours[2] : 0}`)
      } catch(error) {
         console.error('Invalid date format')
         return
      }

      return date
   }

   setTime() {
      let currentDate = this.serverTime || Date.now();
      let diffDateTimestamp = (this.date - currentDate) / 1000

      if(diffDateTimestamp > 0) {
         this.time.days = Math.floor(diffDateTimestamp / 86400) % 100000
         this.time.hours = Math.floor(diffDateTimestamp / 3600) % 24
         this.time.minutes = Math.floor(diffDateTimestamp / 60) % 60
         this.time.seconds = Math.floor(diffDateTimestamp) % 60
      } else {
         this.time.days = 0
         this.time.hours = 0
         this.time.minutes = 0
         this.time.seconds = 0
      }
   }

   formatAddZero(value) {
      if(this.addZero) {
         return value < 10 ? "0" + value : value
      } else {
         return value
      }
   }

   showCountdown() {
      let displayString = ''

      if(this.time.isZero() && this.endText !== null) {
         displayString = this.endText
      } else {
         displayString = this.template
         displayString = displayString.replace(/{D}/g, this.time.days)
         displayString = displayString.replace(/{H}/g, this.formatAddZero(this.time.hours))
         displayString = displayString.replace(/{M}/g, this.formatAddZero(this.time.minutes))
         displayString = displayString.replace(/{S}/g, this.formatAddZero(this.time.seconds))
      }
      
      this.element.innerHTML = displayString
   }

   startInterval() {
      this.interval = setInterval(() => {
         if(this.serverTime) {
            this.serverTime.setSeconds(this.serverTime.getSeconds() + 1)
         }

         this.setTime()
         this.showCountdown()
      }, 1000)
   }
}

window.Countdown = Countdown