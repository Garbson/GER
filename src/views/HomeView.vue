<template>
  <TheSidebar></TheSidebar>
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
          @click="saveReminder(selectedYear, selectedMonth, selectedDay, reminderText)"
          class="text-white bg-blue-500 px-3 py-1 rounded"
        >
          Salvar
        </button>
        <button
          @click="two = false; reminderText = '';"
          class="text-gray-600 ml-2"
        >
          Cancelar
        </button>
      </div>
    </div>
    <div class="max-w-6xl w-full">
      <div class="bg-blue-500 rounded-lg shadow-lg">
        <div
          class="flex items-center justify-between p-2 bg-blue-500 text-white rounded-t-lg"
        >
          <i class="fas fa-angle-left cursor-pointer" @click="previousMonth"
            >Previous</i
          >
          <div class="text-lg">{{ currentMonth }}</div>
          <i class="fas fa-angle-right cursor-pointer " @click="nextMonth"
            >Next</i
          >
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
              'text-black': !isHoliday(day),
              'text-black bg-yellow-200': isToday(day),
              'bg-red-400': hasReminder(currentYearValue, currentMonthValue, day), // Mark the day with a reminder
            }"
            @click="selectDay(currentYearValue, currentMonthValue, day)"
          >
            {{ day }}
            <span v-if="isHoliday(day)" class="text-xs text-red-500 font-bold">
              {{ getHolidayName(day) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="reminderPopup" class="fixed inset-0 flex items-center justify-center">
      <div class="bg-white p-4 rounded-lg shadow-lg">
        <div class="text-red-500">Lembrete para o dia {{ selectedDay }}</div>
        <div class="p-2">{{ remindersByYearMonthDay[currentYearValue] && remindersByYearMonthDay[currentYearValue][currentMonthValue] && remindersByYearMonthDay[currentYearValue][currentMonthValue][selectedDay] }}</div>
        <button @click="removeReminder(currentYearValue, currentMonthValue, selectedDay)" class="text-white bg-red-500 px-3 py-1 rounded mt-4">
          Remover Lembrete
        </button>
        <button @click="reminderPopup = false" class="text-white bg-blue-500 px-3 py-1 rounded mt-2">
          Fechar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { readHoliday } from "@/model/services";
import  TheSidebar  from "@/components/TheSidebar.vue";

const ano = ref([]);
const events = ref([]);
const reminderText = ref("");
const selectedYear = ref(null);
const selectedMonth = ref(null);
const selectedDay = ref(null);
const two = ref(false);
const reminderPopup = ref(false);

// Recuperar os lembretes do localStorage ao iniciar a aplicação
const remindersByYearMonthDay = ref(JSON.parse(localStorage.getItem("reminders")) || {});

async function onReadHoliday(event) {
  await readHoliday(event).then((response) => {
    ano.value = response;
    events.value = organizeHolidaysByMonth(response);
  });
}

function saveReminder(year, month, day, message) {
  if (!remindersByYearMonthDay.value[year]) {
    remindersByYearMonthDay.value[year] = {};
  }
  if (!remindersByYearMonthDay.value[year][month]) {
    remindersByYearMonthDay.value[year][month] = {};
  }
  remindersByYearMonthDay.value[year][month][day] = message;

  two.value = false;
  reminderText.value = "";
  // Salvar os lembretes no localStorage
  localStorage.setItem("reminders", JSON.stringify(remindersByYearMonthDay.value));
}

function removeReminder(year, month, day) {
  if (
    remindersByYearMonthDay.value[year] &&
    remindersByYearMonthDay.value[year][month]
  ) {
    delete remindersByYearMonthDay.value[year][month][day];
    // Atualizar o localStorage após a remoção
    localStorage.setItem("reminders", JSON.stringify(remindersByYearMonthDay.value));
  }
  reminderPopup.value = false;
}

function selectDay(year, month, day) {
  selectedYear.value = year;
  selectedMonth.value = month;
  selectedDay.value = day;
  if (remindersByYearMonthDay.value[year] && remindersByYearMonthDay.value[year][month] && remindersByYearMonthDay.value[year][month][day]) {
    reminderPopup.value = true;
  } else {
    two.value = true;
  }
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
const currentYearValue = computed(() => currentDate.value.getFullYear());
const currentMonthValue = computed(() => currentDate.value.getMonth() + 1);

onMounted(() => {
  const currentYear = currentYearValue.value;
  onReadHoliday(currentYear);
});

const currentMonth = computed(() => {
  const options = { month: "long", year: "numeric" };
  return currentDate.value.toLocaleDateString("en-US", options);
});

const daysInMonth = computed(() => {
  const days = [];
  const year = currentYearValue.value;
  const month = currentMonthValue.value;
  const lastDay = new Date(year, month, 0).getDate();

  for (let day = 1; day <= lastDay; day++) {
    days.push(day);
  }

  return days;
});

function previousMonth() {
  const year = currentYearValue.value;
  const month = currentMonthValue.value;
  currentDate.value = new Date(year, month - 2, 1); // -2 to go back one month
  onReadHoliday(year);
}

function nextMonth() {
  const year = currentYearValue.value;
  const month = currentMonthValue.value;
  currentDate.value = new Date(year, month, 1); // No change for next month
  onReadHoliday(year);
}

function isHoliday(day) {
  const month = currentMonthValue.value;
  return (
    events.value[month] &&
    events.value[month].some((event) => event.day === day)
  );
}

function getHolidayName(day) {
  const month = currentMonthValue.value;
  const event = events.value[month].find((event) => event.day === day);
  return event ? event.name : "";
}

function hasReminder(year, month, day) {
  return (
    remindersByYearMonthDay.value[year] &&
    remindersByYearMonthDay.value[year][month] &&
    remindersByYearMonthDay.value[year][month][day]
  );
}

function isToday(day) {
  const today = new Date();
  return (
    today.getFullYear() === currentYearValue.value &&
    today.getMonth() + 1 === currentMonthValue.value &&
    today.getDate() === day
  );
}
</script>
