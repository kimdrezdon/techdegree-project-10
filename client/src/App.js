import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

// Import components
import PrivateRoute from './components/routing/PrivateRoute';
import Home from './components/pages/Home';
import CourseDetail from './components/courses/CourseDetail';
import UserSignIn from './components/auth/UserSignIn';
import CourseForm from './components/courses/CourseForm';
import UserSignUp from './components/auth/UserSignUp';
import Header from './components/layout/Header';
import NotFound from './components/pages/NotFound';
import UnhandledError from './components/pages/UnhandledError';
import Forbidden from './components/pages/Forbidden';
import Alerts from './components/layout/Alerts';

// Import Context
import CourseState from './context/course/CourseState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

// Import auth function
import setAuthToken from './utils/setAuthToken';

// CSS files
import './styles/global.css';
import './styles/index.css';

// Load token into global headers
if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	return (
		<AuthState>
			<CourseState>
				<AlertState>
					<BrowserRouter>
						<div>
							<Header />
							<hr></hr>
							<Alerts />
							<Switch>
								<Route
									exact
									path='/'
									render={() => <Redirect to='/courses' />}
								/>
								<Route exact path='/courses' component={Home} />
								<PrivateRoute
									path='/courses/create'
									component={CourseForm}
								/>
								<PrivateRoute
									path='/courses/:id/update'
									component={CourseForm}
								/>
								<Route
									exact
									path='/courses/:id'
									component={CourseDetail}
								/>
								<Route path='/signin' component={UserSignIn} />
								<Route path='/signup' component={UserSignUp} />
								<Route path='/notfound' component={NotFound} />
								<Route
									path='/error'
									component={UnhandledError}
								/>
								<Route
									path='/forbidden'
									component={Forbidden}
								/>
								<Route component={NotFound} />
							</Switch>
						</div>
					</BrowserRouter>
				</AlertState>
			</CourseState>
		</AuthState>
	);
};

export default App;
