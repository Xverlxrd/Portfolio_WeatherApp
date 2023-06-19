import React from 'react';
import '../../../styles/HomePage.css'
import { Icon } from '@iconify/react';
import BrokenClouds from '../../../img/BrokenClouds.png'
import ClearSky from '../../../img/ClearSky.png';
import Error from '../../../img/Error.png'
import Haze from '../../../img/Haze.png'
import LightRain from '../../../img/LightRain.png'
import OvercastClouds from '../../../img/OvercastClouds.png'
import {CityData} from "../../../Types";

const HomePage = () => {
    const [error, setError] = React.useState('')
    const [showContent, setShowContent] = React.useState(false);
    const [text, setText] = React.useState('');
    const [cityDate, setCityDate] = React.useState<CityData | null>(null);
    const apiKey = 'd2d54643c1b8080854b88a32a7dd2362';

    const imgSort = () => {
        const weatherImages: { [key: string]: string } = {
            'clear sky': ClearSky,
            'broken clouds': BrokenClouds,
            'haze': Haze,
            'smoke': Haze,
            'light rain': LightRain,
            'overcast clouds': OvercastClouds
        };
        if (cityDate && text) {
            const clouds = cityDate.clouds.toLowerCase();
            if (weatherImages.hasOwnProperty(clouds)) {
                return weatherImages[clouds];
            } else {
                return BrokenClouds;
            }
        } else {
            return Error
        }
    };

    const errorHandler = () => {
        setError('')
    }



    const fetchData = () => {
        if (text && showContent) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=${apiKey}`)
                .then(res => res.json())
                .then(data => {
                    if (data.main && data.main.temp) {
                        setCityDate({
                            name: data.name,
                            temp: data.main.temp,
                            clouds: data.weather[0].description,
                            wind: data.wind.speed,
                            humidity: data.main.humidity
                        });
                    } else {
                        setError('Такого города нет')
                    }
                });
        }
    }

    const searchCountry = () => {
        fetchData();
        if(text && !showContent){
            setShowContent(true)
        }
    }

    React.useEffect(() => {
        setShowContent(false)
    }, [])

    return (
        <div className={'home__container'}>
            <div className={"app__container"}>
                {error && (
                    <div className={'error__container'}>
                        <Icon className={'error__icon'} icon="tabler:error-404" color="red" />
                        <p className={'error__message'}>{error}</p>
                        <Icon onClick={errorHandler} className={'error__delete'} icon="icon-park-solid:error" color="red" />
                    </div>
                )}
                <div className={'app__search'}>
                    <Icon className={'app__search_icon'} icon="mdi:location" />
                    <input
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder={'Enter your location'}
                        type="text"
                        className="app__search_input"
                    />
                    <div className={'app__search_btn'}>
                        <Icon
                            onClick={searchCountry}
                            className={'app__search_button'}
                            icon="fluent:search-16-filled"
                        />
                    </div>
                </div>


                {showContent && text && (
                    <div className={'app__content'}>
                        <div className="app__content_temperature">
                            <img
                                className={'app__temperature_img'}
                                src={imgSort()}
                                alt={'Img temperature'}
                            />
                            <div className="app__temperature_container">
                                <h1 className={'app__temperature_value'}>{cityDate?.temp}</h1>
                                <p className={'app__temperature_title'}>{cityDate?.clouds}</p>
                            </div>
                        </div>

                        <div className={'app__content_wind'}>
                            <div className={'app__humidity_container'}>
                                <Icon className={'app__humidity_img'} icon="mdi:waves" />
                                <div className={'app__humidity_text'}>
                                    <p className={'app__humidity_value'}>{cityDate?.humidity}</p>
                                    <p className={'app__humidity_title'}>Humidity</p>
                                </div>
                            </div>

                            <div className={'app__speed__container'}>
                                <Icon className={'app__speed_img'} icon="ph:wind-bold" />
                                <div className={'app__speed_text'}>
                                    <p className={'app__speed_value'}>{cityDate?.wind}</p>
                                    <p className={'app__speed_title'}>Wind Speed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default HomePage;
