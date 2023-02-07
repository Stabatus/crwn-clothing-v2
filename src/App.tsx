import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Home } from './routes/home/home.component'
import { SignIn } from './routes/sign-in/sing-in.component'
import { Index } from './routes/index/index.component'

const Shop = () => {
  return (
    <h1>i'm the shop</h1>
  )
}

export const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Index />}>
        <Route index element={<Home />} />
        <Route path={'shop'} element={<Shop />} />
        <Route path={'signIn'} element={<SignIn />} />
      </Route>
    </Routes>
  )
}

export default App
