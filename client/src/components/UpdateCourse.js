import React, { Component } from 'react';
import ErrorsDisplay from './ErrorsDisplay';

class UpdateCourse extends Component {
    state = {
        courseOwner: {},
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
    }

    componentDidMount() {
        const courseId = this.props.match.params.id;
        this.props.context.actions.getCourse(courseId)
            .then(responseData => {
                if (responseData !== null) {
                    if (responseData.User.id === this.props.context.authenticatedUser.id) {
                        this.setState({
                            courseOwner: responseData.User,
                            title: responseData.title,
                            description: responseData.description,
                            estimatedTime: (responseData.estimatedTime ? responseData.estimatedTime : ''),
                            materialsNeeded: (responseData.materialsNeeded ? responseData.materialsNeeded : '')
                        });
                    } else {
                        this.props.history.push('/forbidden');
                    }
                } else {
                    this.props.history.push('/notfound');
                }
            })
            .catch(error => {
                console.log(error);
                this.props.history.push('/error');
            });
    }

    handleCancel = e => {
        e.preventDefault();
        const courseId = this.props.match.params.id;
        this.props.history.push(`/courses/${courseId}`);
    }

    handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name] : value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const courseId = this.props.match.params.id;
        const courseData = { 
            userId: this.state.courseOwner.id,
            title: this.state.title,
            description: this.state.description,
            estimatedTime: this.state.estimatedTime,
            materialsNeeded: this.state.materialsNeeded
        }
        this.props.context.actions.updateCourse(courseId, courseData)
            .then( errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                    this.props.history.push(`/courses/${courseId}`);
                }
            })
            .catch( err => {
                console.log(err);
                this.props.history.push('/error');
            })   
    }

    render() { 
        const {
            courseOwner,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;

        return ( 
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <ErrorsDisplay errors={errors} />
                    <form onSubmit={this.handleSubmit}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input 
                                        id="title" 
                                        name="title" 
                                        type="text" 
                                        className="input-title course--title--input" 
                                        placeholder="Course title..."
                                        value={title} 
                                        onChange={this.handleChange} />
                                </div>
                                <p>By {courseOwner.firstName} {courseOwner.lastName}</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea 
                                        id="description" 
                                        name="description" 
                                        className="" 
                                        placeholder="Course description..." 
                                        value={description}
                                        onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input 
                                                id="estimatedTime" 
                                                name="estimatedTime" 
                                                type="text" 
                                                className="course--time--input"
                                                placeholder="Hours" 
                                                value={estimatedTime}
                                                onChange={this.handleChange} />
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea 
                                                id="materialsNeeded" 
                                                name="materialsNeeded" 
                                                className="" 
                                                placeholder="List materials..." 
                                                value={materialsNeeded}
                                                onChange={this.handleChange} />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Update Course</button>
                            <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default UpdateCourse;