import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
import { ThemeProvider } from './pages/theme/theme-provider';

import { Toaster } from 'sonner';
import { Error } from './pages/error';
import { Header } from './pages/ui/header/header';
import { Home } from './pages/home';
import { LoadingPage } from './utils/loading-page';

export function App() {

  return (

    <>

  <ThemeProvider storageKey='sym' defaultTheme='dark'>
    <Toaster position='top-center' className='bg-[#171717]' />
      <Router>
        <Header />
          <Routes>

            <Route path='/loading' element={<LoadingPage/>}/>

            <Route path='/' element={<Home/>}/>

            <Route path='*' element={<Error />} />

          </Routes>

      </Router>
  </ThemeProvider>
    </>
  
)
}

