import { usePath, useRoutes } from 'raviger'
import { useEffect, useState } from 'react'
import LayoutTheme from './LayoutTheme'
import Home from '@/pages/Home'
import { Button } from '@radix-ui/themes'
import HomeAgent from '@/pages/HomeAgent'
import Stats from '@/pages/Stats'

const routes = {
  '/': () => <Home />,
  '/count': () => <Counter param1='azrlkazjrzaj' />,
  '/agents': () => <HomeAgent />,
  '/stats': () => <Stats />,
}

function Counter({ param1 }) {
  const [count, setCount] = useState(0)

  console.log('Counter Render')

  useEffect(() => {
    console.log('useEffect Count : ', count)
  }, [count])

  return (
    <Button onClick={() => setCount(() => count + 1)}>
      {count} {param1}
    </Button>
  )
}

export function Router() {
  const currentPath = usePath()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const routeResult = useRoutes(routes)

  return <LayoutTheme>{routeResult}</LayoutTheme>
}
