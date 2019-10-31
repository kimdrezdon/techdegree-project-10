import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

//import the withContext function from Context
import withContext from './Context';

import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignUp from "./components/UserSignUp";
import Header from "./components/Header";
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import UnhandledError from './components/UnhandledError';

//connect components to context
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const HeaderWithContext = withContext(Header);
const CreateCourseWithContext = withContext(CreateCourse);

const App = () => (
  <BrowserRouter>
    <div>
      <HeaderWithContext />
      <hr></hr>
      <Switch>
        <Route exact path="/" render={() => <Redirect to ="/courses" />} />
        <Route exact path="/courses" component={Courses} />
        <Route path="/courses/create" component={CreateCourseWithContext} />
        <Route path="/courses/:id/update" component={UpdateCourse} />
        <Route exact path="/courses/:id" component={CourseDetail} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/notfound" component={NotFound} />
        <Route path="/error" component={UnhandledError} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
  
)

export default App;
