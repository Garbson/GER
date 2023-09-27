import axios from 'axios'

const baseUrl = 'https://brasilapi.com.br/api'

export async function readHoliday(ano) {
    return await axios.get(`${baseUrl}/feriados/v1/${ano}`).then((response) => response.data)
  }