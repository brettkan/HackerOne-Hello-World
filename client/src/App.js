import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'

class App extends Component {
    state = {
        users: [],
        reports: [],
        currentReportIndex: null,
    }

    componentDidMount() {
        this.fetchUsers()
        this.fetchReports('filter%5Bprogram%5D%5B%5D=test_19thy&page%5Bnumber%5D=1&page%5Bsize%5D=25')
    }

    fetchUsers() {
        fetch('/users')
            .then(res => res.json())
            .then(users => {
                this.setState({
                    users
                })
            })
    }

    fetchReports(queryString) {
        fetch ('/reports?' + queryString)
            .then(res => res.json())
            .then(reportData => {
                this.setState({
                    reports: reportData.data
                })
            })
    }

    onReportTitleClick(reportId) {
        this.setState({
            currentReportIndex: reportId,
        })
    }

    render() {
        const currentReportView = this.state.currentReportIndex === null ? (
            <div>
                <h3>Reports:</h3>
                <ul>
                    {this.state.reports.map((report, index) =>
                        report.attributes ?
                            <li className="report-item"
                                key={report.id}
                                onClick={() => this.onReportTitleClick(index)}>
                                    {report.attributes.title}
                            </li> :
                            null

                    )}
                </ul>
            </div>
        ) : <ReportView 
                reportTitle={this.state.reports[this.state.currentReportIndex].attributes.title}
                info={this.state.reports[this.state.currentReportIndex].attributes.vulnerability_information}
            />

        return (
            <div className="app">
                <h1>Hello World!</h1>
                <h3>Users:</h3>
                {this.state.users.map(user =>
                   <div key={user.id}>{user.username}</div>
                )}



                {currentReportView}
            </div>
        )
    }
}

var ReportView({reportTitle, info}) {
    return (
        <div>
            <h3>{reportTitle}</h3>
            <p>{info}</p>
        </div>
    )
}

ReportView.propTypes = {
    reportTitle: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
}


export default App