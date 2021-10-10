import React from 'react'

class Weather extends React.Component {
    render() {
        return (
            <div>
                {  // use the "and" operator to check if the prop value exists before displaying them
                    this.props.city && this.props.country && <p>Location: {this.props.city}, {this.props.country}</p>
                }
                {
                    this.props.temperature_min && <p>Min Temperature: {this.props.temperature_min}℃</p>
                }
                {
                    this.props.temperature_max && <p>Max Temperature: {this.props.temperature_max}℃</p>
                }
                {
                    this.props.humidity && <p>Humidity: {this.props.humidity}</p>
                }
                {
                    this.props.description && <p>Condition: {this.props.description}</p>
                }
                {
                    this.props.error && <p>{this.props.error}</p>
                }
            </div>
        )
    }
}

export default Weather;
