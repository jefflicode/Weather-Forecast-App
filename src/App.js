import React from 'react'; // import React object from the react package in the package.json file
import Titles from "./components/Titles";
import Form from './components/Form';
import Weather from './components/Weather'

// This is the wrapper componenet that will contain all the other tiny components 

const API_KEY = "5aa9b916971ad212f9cd5f0fc1e8ce4f";

// First Initialize a component
class App extends React.Component {  // React.Component lives in node_modules
  state = {
    temperature_max: undefined,
    temperature_min: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault(); // prevent page refresh when getting data from API
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
                                // template string allows you to inject the variable you defined within a file 
    
    const data = await api_call.json();

    if (city && country) {// when user tries to seach weather without giving input, this would make sure our program won't break (error)
      console.log(data); // display the data Object (obtained from API call) to the console
      this.setState(  // always use setState instead of directly doing variable assignment
        {
          temperature_max: data.main.temp_max,
          temperature_min: data.main.temp_min,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: ""
        }
      );
    } else {
      this.setState(
        {
          temperature_max: undefined,
          temperature_min: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          error: "Please enter a city and country name"
        }
      );
    }
    // state is responsible for keeping track of the change of data within a component 
  }


  render() { // render is a built in method from react component, it returns jsx (not html)
      return (  // make sure to return only one div, (one parent element)
        <div>
          <Titles />
          <div className="mt-4">
            <Form getWeather={this.getWeather}/>
          </div>
          <div className="mt-4 weather-info">
          <Weather 
            temperature_max={this.state.temperature_max}
            temperature_min={this.state.temperature_min} 
            humidity={this.state.humidity}
            city={this.state.city}
            country={this.state.country}
            description={this.state.description}
            error={this.state.error}
          />
          </div>
        </div>           // whatever is rended in here will get displayed on the screen 
      )
  }
  

};

export default App;

// how react works:
// multiple tiny UI component files get imported into App.js
// then App.js would render those files into the public index.html file, then display to the web browser