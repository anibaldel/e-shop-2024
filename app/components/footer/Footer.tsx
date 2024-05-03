import Link from "next/link"
import Container from "../Container"
import { FooterList } from "./FooterList"
import { MdFacebook } from "react-icons/md"
import { BsTiktok } from "react-icons/bs"
import { FaTiktok } from "react-icons/fa"
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai"


export const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
        <Container>
            <div className="flex flex-col md:flex-row justify-between pt-6 pb-8"> 
                <FooterList>
                    <h3 className="text-base font-bold mb-2">Categorias de la tienda</h3>
                    <Link href="#">Celulares</Link>
                    <Link href="#">Laptops</Link>
                    <Link href="#">Escritorios</Link>
                    <Link href="#">TVs</Link>
                    <Link href="#">Accesorios</Link>
                </FooterList>
                <FooterList>
                    <h3 className="text-base font-bold mb-2">Servicio al cliente</h3>
                    <Link href="#">Contactanos</Link>
                    <Link href="#">Politica de envio</Link>
                    <Link href="#">Devoluciones y cambios</Link>
                    <Link href="#">Preguntas frecuentes</Link>
                </FooterList>
                <div className="w-full md:w-1/3 mb-6 md:mb-0">
                    <h3 className="text-base font-bold mb-2">Sobre nostros</h3>
                    <p className="mb-2">
                        En nuestra tienda de electrónica, nos dedicamos a proporcionar los mejores y más recientes dispositivos y accesorios a nuestros clientes. Con una amplia selección de teléfonos, televisores, computadoras portátiles, relojes y accesorios.
                    </p>
                    <p>
                        &copy; {new Date().getFullYear()} E-Shop. Todos los derechos reservados
                    </p>
                </div>
                <FooterList>
                    <h3 className="text-base font-bold mb-2">Siguenos en: </h3>
                    <div className="flex gap-2">
                        <Link href="#">
                            <MdFacebook size={24}/>
                        </Link>
                        <Link href="#">
                            <FaTiktok size={21}/>
                        </Link>
                        <Link href="#">
                            <AiFillInstagram size={24}/>
                        </Link>
                        <Link href="#">
                            <AiFillYoutube size={24}/>
                        </Link>
                    </div>
                </FooterList>
            </div>
        </Container>
    </footer>
  )
}
