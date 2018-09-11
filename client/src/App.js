import React, { Component } from 'react'
import './App.css'

class App extends Component {
    state = {
        users: [],
        reports: [],
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

    render() {
        return (
            <div className="app">
                <h1>Hello World!</h1>
                <h3>Users:</h3>
                {this.state.users.map(user =>
                   <div key={user.id}>{user.username}</div>
                )}
                <h3>Reports:</h3>
                <ul>
                    {this.state.reports.map(report =>
                        report.attributes ?
                            <li className="report-item" key={report.id}>{report.attributes.title}</li> :
                            null

                    )}
                </ul>
            </div>
        )
    }
}

export default App