import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashBoard extends Component {
  state = {vaccinationData: '', apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getVaccinationData()
  }

  updateDoseData = dose => ({
    vaccineDate: dose.vaccine_date,
    dose1: dose.dose_1,
    dose2: dose.dose_2,
  })

  updateVaccinationByAge = person => ({
    age: person.age,
    count: person.count,
  })

  updateVaccinationByGender = person => ({
    count: person.count,
    gender: person.gender,
  })

  getVaccinationData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    if (response.ok) {
      const fetchedData = await response.json()

      const updateFetchedData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination.map(dose =>
          this.updateDoseData(dose),
        ),
        vaccinationByAge: fetchedData.vaccination_by_age.map(vaccination =>
          this.updateVaccinationByAge(vaccination),
        ),
        vaccinationByGender: fetchedData.vaccination_by_gender,
      }
      this.setState({
        vaccinationData: updateFetchedData,
        apiStatus: apiStatusConstants.success,
      })
      console.log(updateFetchedData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLogoAndHeading = () => (
    <div className="dash-board">
      <div className="logo-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          alt="website logo"
          className="cowin-logo"
        />
        <h1 className="logo-name">Co-WIN</h1>
      </div>
      <h1 className="main-heading">CoWIN Vaccination In India</h1>
    </div>
  )

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <>
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="failure-view-image"
        />
        <h1 className="failure-text">Something Went Wrong</h1>
      </div>
    </>
  )

  renderDataInCharts = () => {
    const {vaccinationData} = this.state
    const {
      vaccinationByAge,
      vaccinationByGender,
      last7DaysVaccination,
    } = vaccinationData

    return (
      <>
        <VaccinationCoverage data={last7DaysVaccination} />
        <VaccinationByGender data={vaccinationByGender} />
        <VaccinationByAge data={vaccinationByAge} />
      </>
    )
  }

  renderDataInGraphs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderDataInCharts()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="cowin-dash-board-bg">
          {this.renderLogoAndHeading()}
          {this.renderDataInGraphs()}
        </div>
      </>
    )
  }
}

export default CowinDashBoard
