// js/weather-dashboard.js
// Simple Weather Dashboard using OpenWeatherMap APIs
// - No API key is committed. Enter your API key in the input and save it to localStorage.

const API_KEY_STORAGE = 'iyf:owm_api_key:v1'
const ONE_CALL_BASE = 'https://api.openweathermap.org/data/2.5'

const el = sel => document.querySelector(sel)

const form = el('#search-form')
const cityInput = el('#city')
const keyInput = el('#api-key')
const saveKeyBtn = el('#save-key')
const currentEl = el('#current')
const forecastCards = el('#forecast-cards')

// Initialize key input from storage
keyInput.value = localStorage.getItem(API_KEY_STORAGE) || ''

saveKeyBtn.addEventListener('click', () => {
  const key = keyInput.value.trim()
  if (!key) { localStorage.removeItem(API_KEY_STORAGE); alert('API key removed'); return }
  localStorage.setItem(API_KEY_STORAGE, key)
  alert('API key saved locally (in your browser)')
})

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const city = cityInput.value.trim()
  if (!city) return
  const apiKey = localStorage.getItem(API_KEY_STORAGE)
  if (!apiKey){
    alert('Please enter and save an OpenWeatherMap API key first.')
    return
  }

  try {
    currentEl.innerHTML = `<p class="muted">Loading current weather...</p>`
    forecastCards.innerHTML = ''

    // 1) Get coordinates by city name
    const geo = await fetchJson(`${ONE_CALL_BASE}/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`)
    const { coord, name, sys } = geo

    // 2) Use One Call (or use 5 day forecast) to get daily forecast
    // We'll call the 5 day / 3 hour forecast and aggregate to daily for simplicity
    const forecastRes = await fetchJson(`${ONE_CALL_BASE}/forecast?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${apiKey}`)

    renderCurrent(geo)
    renderForecast(forecastRes)
  } catch (err) {
    console.error(err)
    currentEl.innerHTML = `<p class="muted">Failed to load weather: ${err.message}</p>`
  }
})

async function fetchJson(url){
  const res = await fetch(url)
  if (!res.ok){
    const text = await res.text()
    throw new Error(res.status + ' ' + res.statusText + ' — ' + text)
  }
  return res.json()
}

function renderCurrent(data){
  const name = data.name
  const country = data.sys?.country || ''
  const weather = data.weather && data.weather[0]
  const temp = Math.round(data.main?.temp)
  const feels = Math.round(data.main?.feels_like)
  const humidity = data.main?.humidity
  const wind = data.wind?.speed
  const icon = weather?.icon
  const description = weather?.description || ''

  currentEl.innerHTML = `
    <div class="current-grid">
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description} icon" />
      <div class="current-details">
        <h2>${name}${country ? ', ' + country : ''}</h2>
        <p class="temp">${temp}°C</p>
        <p class="muted">Feels like ${feels}°C • Humidity: ${humidity}% • Wind: ${wind} m/s</p>
        <p style="text-transform:capitalize">${description}</p>
      </div>
    </div>
  `
}

function renderForecast(forecast){
  // forecast.list has 3-hourly entries. We'll group by date and pick the midday entry (12:00) if available
  const byDate = {}
  forecast.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0]
    if (!byDate[date]) byDate[date] = []
    byDate[date].push(item)
  })

  const dates = Object.keys(byDate).slice(0, 5) // up to 5 days
  forecastCards.innerHTML = ''
  dates.forEach(date => {
    const entries = byDate[date]
    // try to find 12:00 entry
    let mid = entries.find(e => e.dt_txt.includes('12:00:00')) || entries[Math.floor(entries.length/2)]
    const weather = mid.weather && mid.weather[0]
    const icon = weather?.icon
    const desc = weather?.description
    const temp = Math.round(mid.main.temp)

    const card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
      <div><strong>${formatDate(date)}</strong></div>
      <div><img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" width="60" height="60"></div>
      <div class="temp">${temp}°C</div>
      <div class="muted" style="text-transform:capitalize">${desc}</div>
    `
    forecastCards.appendChild(card)
  })
}

function formatDate(isoDate){
  const d = new Date(isoDate + 'T00:00:00')
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}

// Expose helper for debugging
window._iyf_weather = { storageKey: API_KEY_STORAGE }
