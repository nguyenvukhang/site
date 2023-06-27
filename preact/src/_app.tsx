import { render } from 'preact'
import { Home } from './pages/home.tsx'
import './global.css'
import Router from 'preact-router'
import AsyncRoute from 'preact-async-route'

const load = (m: any) => () => <m.default />

const App = () => (
  <Router>
    <Home path="/" />
    <AsyncRoute
      path="/projects"
      getComponent={() => import('./pages/projects').then(load)}
    />
    <AsyncRoute
      path="/resume"
      getComponent={() => import('./pages/resume').then(load)}
    />
    <AsyncRoute
      path="/blog"
      getComponent={() => import('./pages/blog').then(load)}
    />
    <AsyncRoute
      path="/photos"
      getComponent={() => import('./pages/photos').then(load)}
    />
    <AsyncRoute
      path="/projects/:rest"
      getComponent={() => import('./generated').then((v) => v.projects)}
    />
    <AsyncRoute
      path="/blog/:rest"
      getComponent={() => import('./generated').then((v) => v.blog)}
    />
  </Router>
)

render(<App />, document.getElementById('app') as HTMLElement)
