import { useContext } from 'react'
import { DataContext } from '../../Contexts/DataContext/Datacontext'



const BottomSquare = () => {

    const {theme} = useContext(DataContext)

  return (
    <div style={{
        backgroundColor: theme.textColor,
        height: '23vh',
        width: '100%',
        position: 'fixed',
        bottom: 0
    }}>

    </div>
  )
}

export default BottomSquare