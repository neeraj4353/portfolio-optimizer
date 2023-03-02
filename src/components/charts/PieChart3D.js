import { Pie3D } from 'react-pie3d'

const data = [
    { value: 10, label: 'apples', color: '#fff' }, 
    { value: 20, label: 'bananas', color: 'green' },
    { value: 30, label: 'oranges', color: 'blue' },
  ]

  const config={
    showLabels: true,
    angle: 50,
    height: 20,
    size: 5
  }
export default function PieChart3D(){
    return <Pie3D config={config} data={data} />
}