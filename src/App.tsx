import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
import { ThemeProvider } from './pages/theme/theme-provider';

import { Toaster } from 'sonner';
import { Error } from './pages/error';
import { Header } from './pages/ui/header/header';
import { Home } from './pages/home';
import { LoadingPage } from './utils/loading-page';
import { ProdutoPage } from './pages/ProdutoPage';
import { Catalogo } from './pages/catalogo';
import { Footer } from './pages/ui/footer/footer';
import { Starboy } from './pages/colecoes/starboy';
import { Carrinho } from './pages/carrinho';
import { VerCarrinho } from './pages/ui/box/box';
import { Celestial } from './pages/colecoes/celestial';
import { Tones } from './pages/colecoes/tones';
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

            <Route path='/colecoes/starboy' element={<Starboy/>}/>
            <Route path='/colecoes/celestial' element={<Celestial/>}/>
            <Route path='/colecoes/tones' element={<Tones/>}/>

            <Route path='/carrinho' element={<Carrinho/>}/>

            <Route path='/catalogo' element={<Catalogo/>}/>

            <Route path="/produto/:slug" element={<ProdutoPage />} />

            <Route path='*' element={<Error />} />

          </Routes>

          <VerCarrinho/>
        <Footer />
      </Router>
  </ThemeProvider>
    </>
  
)
}

