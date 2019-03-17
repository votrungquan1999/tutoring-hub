import React, { Component } from "react";
import "./Tutors.css";

// Import components
import NavBarSearchable from "../../Components/NavBarSearchable/NavBarSearchable";
import Title from "../../Components/Title/Title";
import TutorCards from "../../Components/TutorCards/TutorCards";
import TutorCardsFilterable from "../../Components/TutorCardsFilterable/TutorCardsFilterable";
import FormDropdown from "../../Components/FormDropdown/FormDropdown";
import FormSlider from "../../Components/FormSlider/FormSlider";

const _ = require('underscore');

class Tutors extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "All Tutors",
            isLoading: true,
            tutors: [],
            courses: [],
            filterCourse: '',
            filterRating: 0
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.filterCourses = this.filterCourses.bind(this);
        this.filterRatings = this.filterRatings.bind(this);
    }

    componentDidMount() {
        this.fetchTutors();
        this.fetchCourses();
    }

    fetchTutors() {
        fetch('/api/v1/tutors')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    tutors: _.sortBy(data, 'lastName'),
                    isLoading: false,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }


    fetchCourses() {
        fetch('/api/v1/courses')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    courses: _.sortBy(data, '')
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleSearch() {

    }


    filterCourses(course) {
        if (course === '') {
            this.setState({
                filterCourse: ''
            });
        } else {
            this.setState({
                filterCourse: course
            });
        }
    }

    filterRatings(rating) {
        if (rating <= 0) {
            this.setState({
                filterRating: 0
            });
        } else {
            this.setState({
                filterRating: rating
            });
        }
    }

    isFiltering() {
        return this.state.filterCourse !== '' || this.state.filterRating != 0;
    }

    render() {
        return (
            <div className="section">
                <NavBarSearchable handleSearch={this.handleSearch} />
                <div className="section--wrapper">
                    <Title title={this.state.title.toUpperCase()} />

                    <div className="Filters">
                        <div>
                            <span>Filters</span>
                            <FormDropdown
                                title={"Courses"}
                                options={this.state.courses}
                                onChange={this.filterCourses}
                            />
                        </div>
                        <div>
                            <span>Rating</span>
                            <FormSlider
                                min={0}
                                max={10}
                                step={1}
                                onChange={this.filterRatings}
                            />
                        </div>
                    </div>


                    {
                        (this.isFiltering()) ?
                            <TutorCardsFilterable
                                tutors={this.state.tutors}
                                filterCourse={this.state.filterCourse}
                                filterRating={this.state.filterRating}
                            />
                            :
                            <TutorCards tutors={this.state.tutors} />
                    }


                </div>
            </div>
        );
    }
}

export default Tutors;
