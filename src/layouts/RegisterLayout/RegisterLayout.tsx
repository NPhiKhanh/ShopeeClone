import Footer from '../../components/Footer'
import RegisterHeader from '../../components/RegisterHeader'

interface Props {
  children?: React.ReactNode
}

function RegisterLayout({ children }: Props) {
  return (
    <>
      <RegisterHeader />
      {children}
      <Footer />
    </>
  )
}

export default RegisterLayout
