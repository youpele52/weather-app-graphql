import Head from 'next/head'
import { useLazyQuery } from '@apollo/client'
import { getWeather } from '../graphql/queries'
import { useEffect, useState } from 'react'
import { UserIcon } from '@heroicons/react/solid'

export default function Home() {
  const [cityName, setCityName] = useState('')
  const [cityWeatherInfo, setCityWeatherInfo] = useState(Object)
  const [getNewWeather, { loading, data, error }] = useLazyQuery(getWeather, {
    variables: { name: cityName },
  })

  if (error) return <h1>Error Found</h1>
  useEffect(() => {
    if (data) {
      const { getCityByName } = data
      if (getCityByName) {
        setCityWeatherInfo(data.getCityByName)
      }
    }
  }, [data])

  console.log(cityWeatherInfo)
  const onChange = (e) => {
    setCityName(e.target.value)
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Head>
        <title>Weather App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        <h1 className='text-5xl font-bold p-10'>Weather Search</h1>
        <div className=''>
          <input
            type='text'
            name='city'
            onChange={onChange}
            value={cityName}
            className='border-2 border-gray-500  text-center h-8 w-64 mb-2 mx-2 rounded-2xl'
            placeholder='City name...'
          />
          <button
            className='bg-blue-500 h-8 w-20 text-white font-bold hover:bg-green-600 rounded-2xl'
            onClick={() => {
              getNewWeather()
            }}
          >
            Search
          </button>
          {Object.keys(cityWeatherInfo).length > 1 && (
            <div className='p-5'>
              <h2 className=''>City: {cityWeatherInfo.name}</h2>
              <h2 className=''>
                Temperature:{' '}
                {(cityWeatherInfo.weather.temperature.actual - 273.15).toFixed(
                  2
                )}
                &deg;C
              </h2>
              <h3 className=''>
                Feels like:{' '}
                {(
                  cityWeatherInfo.weather.temperature.feelsLike - 273.15
                ).toFixed(2)}{' '}
                &deg;C
              </h3>
              <h2 className=' capitalize'>
                Weather Summary: {cityWeatherInfo.weather.summary.description}
              </h2>
              <h3 className=''>
                {' '}
                Humidity: {cityWeatherInfo.weather.clouds.humidity} %
              </h3>
              {/* <h2 className=''> Weather : {cityWeatherInfo.}</h2> */}
            </div>
          )}
        </div>
      </main>

      <footer className='flex items-center justify-center w-full h-24 border-t'>
        <a
          className='flex items-center justify-center'
          href='https://youpele.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          Created by <UserIcon className='h-7 ml-2 text-blue-500' />
        </a>
      </footer>
    </div>
  )
}
