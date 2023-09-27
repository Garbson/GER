<template>
    <div class="bg-cover bg-center bg-no-repeat h-screen flex justify-center items-center bg-[url('src/img/background.jpg')]">
      <div class="max-w-6xl w-full">
        <div class="bg-blue-500 rounded-lg shadow-lg">
          <div class="flex items-center justify-between p-2 bg-blue-500 text-white rounded-t-lg">
            <i class="fas fa-angle-left prev text-2xl cursor-pointer" @click="previousMonth"></i>
            <div class="text-lg">{{ currentMonth }}</div>
            <i class="fas fa-angle-right next text-2xl cursor-pointer" @click="nextMonth"></i>
          </div>
          <div class="flex justify-between bg-blue-500 text-white p-2">
            <div class="w-1/7 text-center font-semibold">Sun</div>
            <div class="w-1/7 text-center font-semibold">Mon</div>
            <div class="w-1/7 text-center font-semibold">Tue</div>
            <div class="w-1/7 text-center font-semibold">Wed</div>
            <div class="w-1/7 text-center font-semibold">Thu</div>
            <div class="w-1/7 text-center font-semibold">Fri</div>
            <div class="w-1/7 text-center font-semibold">Sat</div>
          </div>
          <div class="grid grid-cols-7 gap-2 p-2">
            <div
              v-for="day in daysInMonth"
              :key="day"
              class="text-center bg-white rounded cursor-pointer w-1/7 h-20 p-4"
              :class="{
                'text-blue-500': !isHoliday(day),
                'text-black bg-yellow-200': isToday(day),
              }"
            >
              {{ day }}
              <span
                v-if="isHoliday(day)"
                class="text-xs text-red-500"
              >
                {{ getHolidayName(day) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { readHoliday } from '@/model/services'
  import { ref } from 'vue'
  
  const ano = ref([])
  const search = ref('')
  const events = ref([])
  
  async function onReadHoliday(event) {
    await readHoliday(event).then((response) => {
      ano.value = response;
      events.value = organizeHolidaysByMonth(response);
      console.log(events.value);
    });
  }
  
  function organizeHolidaysByMonth(events) {
    const organizedEvents = {};
    for (let event of events) {
      const day = parseInt(event.date.split('-')[2]);
      const month = parseInt(event.date.split('-')[1]);
      const name = event.name;
  
      if (!organizedEvents[month]) {
        organizedEvents[month] = [];
      }
  
      organizedEvents[month].push({ day, name });
    }
    return organizedEvents;
  }
  
  export default {
    data() {
      return {
        currentDate: new Date(),
      };
    },
    computed: {
      currentMonth() {
        const options = { month: 'long', year: 'numeric' };
        return this.currentDate.toLocaleDateString('en-US', options);
      },
      daysInMonth() {
        const days = [];
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
  
        const lastDay = new Date(year, month + 1, 0).getDate();
  
        for (let day = 1; day <= lastDay; day++) {
          days.push(day);
        }
  
        return days;
      },
    },
    methods: {
      previousMonth() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        this.currentDate = new Date(year, month - 1, 1);
        onReadHoliday(year);
      },
      nextMonth() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        this.currentDate = new Date(year, month + 1, 1);
        onReadHoliday(year);
      },
      isHoliday(day) {
        const month = this.currentDate.getMonth() + 1;
        return events.value[month] && events.value[month].some((event) => event.day === day);
      },
      getHolidayName(day) {
        const month = this.currentDate.getMonth() + 1;
        const event = events.value[month].find((event) => event.day === day);
        return event ? event.name : '';
      },
      isToday(day) {
        const today = new Date();
        return (
          today.getFullYear() === this.currentDate.getFullYear() &&
          today.getMonth() === this.currentDate.getMonth() &&
          today.getDate() === day
        );
      },
    },
    mounted() {
      const currentYear = this.currentDate.getFullYear();
      onReadHoliday(currentYear);
    },
  };
  </script>
  