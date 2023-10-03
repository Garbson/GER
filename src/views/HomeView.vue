<template>
  <div
    class="bg-cover bg-center bg-no-repeat h-screen flex justify-center items-center bg-[url('src/img/background.jpg')]"
  >
    <div
      v-if="two"
      class="absolute z-10 bg-white border border-gray-300 p-4 rounded shadow-md"
    >
      <div class="text-red-500">
        Adicionando lembrete para o dia {{ selectedDay }}
      </div>
      <input
        v-model="reminderText"
        class="border border-gray-300 p-2 rounded w-full mt-2"
        placeholder="Digite seu lembrete aqui"
      />
      <div class="mt-3 flex justify-end">
        <button
          @click="saveReminder"
          class="text-white bg-blue-500 px-3 py-1 rounded"
        >
          Salvar
        </button>
        <button @click="two = false" class="text-gray-600 ml-2">
          Cancelar
        </button>
      </div>
    </div>
    <div class="max-w-6xl w-full">
      <div class="bg-blue-500 rounded-lg shadow-lg">
        <div
          class="flex items-center justify-between p-2 bg-blue-500 text-white rounded-t-lg"
        >
          <i
            class="fas fa-angle-left prev text-2xl cursor-pointer"
            @click="previousMonth"
          ></i>
          <div class="text-lg">{{ currentMonth }}</div>
          <i
            class="fas fa-angle-right next text-2xl cursor-pointer"
            @click="nextMonth"
          ></i>
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
            @click="two = true"
          >
            {{ day }}
            <span v-if="isHoliday(day)" class="text-xs text-red-500">
              {{ getHolidayName(day) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { readHoliday } from "@/model/services";

const ano = ref([]);
const events = ref([]);

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
    const day = parseInt(event.date.split("-")[2]);
    const month = parseInt(event.date.split("-")[1]);
    const name = event.name;

    if (!organizedEvents[month]) {
      organizedEvents[month] = [];
    }

    organizedEvents[month].push({ day, name });
  }
  return organizedEvents;
}

const currentDate = ref(new Date());
const two = ref(false);

onMounted(() => {
  const currentYear = currentDate.value.getFullYear();
  onReadHoliday(currentYear);
});

const currentMonth = computed(() => {
  const options = { month: "long", year: "numeric" };
  return currentDate.value.toLocaleDateString("en-US", options);
});

const daysInMonth = computed(() => {
  const days = [];
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= lastDay; day++) {
    days.push(day);
  }

  return days;
});

function previousMonth() {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  currentDate.value = new Date(year, month - 1, 1);
  onReadHoliday(year);
}

function nextMonth() {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  currentDate.value = new Date(year, month + 1, 1);
  onReadHoliday(year);
}

function isHoliday(day) {
  const month = currentDate.value.getMonth() + 1;
  return (
    events.value[month] &&
    events.value[month].some((event) => event.day === day)
  );
}

function getHolidayName(day) {
  const month = currentDate.value.getMonth() + 1;
  const event = events.value[month].find((event) => event.day === day);
  return event ? event.name : "";
}

function isToday(day) {
  const today = new Date();
  return (
    today.getFullYear() === currentDate.value.getFullYear() &&
    today.getMonth() === currentDate.value.getMonth() &&
    today.getDate() === day
  );
}
</script>
