import React, { useReducer } from 'react';
import axios from 'axios';
import CourseContext from './courseContext';
import courseReducer from './courseReducer';
import {
	CREATE_COURSE,
	GET_COURSE,
	UPDATE_COURSE,
	DELETE_COURSE,
	GET_COURSES,
	SET_CURRENT,
	CLEAR_CURRENT,
	COURSE_ERROR
} from '../types';

const CourseState = props => {
	const initialState = {
		courses: null,
		current: null,
		error: null,
		loading: true
	};

	const [state, dispatch] = useReducer(courseReducer, initialState);

	// Get Courses
	const getCourses = async () => {
		try {
			const res = await axios.get('/api/courses');
			//returns all course data if successful
			dispatch({ type: GET_COURSES, payload: res.data });
		} catch (err) {
			dispatch({ type: COURSE_ERROR, payload: err.response.msg });
		}
	};

	// Get Course Detail
	const getCourse = async courseId => {
		try {
			const res = await axios.get(`/api/courses/${courseId}`);
			//returns course data if course exists
			dispatch({ type: GET_COURSE, payload: res.data });
		} catch (err) {
			dispatch({ type: COURSE_ERROR, payload: err.response.msg });
		}
	};

	return (
		<CourseContext.Provider
			value={{
				courses: state.courses,
				current: state.current,
				error: state.error,
				loading: state.loading,
				getCourses,
				getCourse
			}}
		>
			{props.children}
		</CourseContext.Provider>
	);
};

export default CourseState;
