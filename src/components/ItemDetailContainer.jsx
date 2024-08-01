import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';

import data from "../data/products.json";


export const ItemDetailContainer = () => {
    
    const[item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)

    const {id} = useParams()

    useEffect(() => {
    new Promise((resolve, reject) => {
       setTimeout( () => resolve(data), 2000)
    })
    .then((response)=> {
        const finded = response.find((i) => i.id === Number(id))
        setItem(finded)
      
      })
    .finally(()=> setLoading(false))
}, [id])

if(loading)
    return <Container className="p-5"><ProgressBar animated striped variant="secondary" now={100} /></Container>;

if(!item)
    return <Container className="mt-4 text-center"><h2>No existe la pagina que estas buscando</h2></Container>

    return(
    <Container className="py-5">
        <Row>
            <Col sm={12} lg={6} xl={8}>
                <Image src={item.image} alt="" fluid rounded/>
            </Col>
            <Col sm={12} lg={6} xl={4}>
                <h1>{item.name} {item.model}</h1>
                <h3>{item.category}</h3>
                <h4>Precio de contado</h4>
                <p>{item.price}</p>
                <h4>Detalles</h4>
                <p>{item.details}</p>
                <Button className="w-100">RESERVAR</Button>
            </Col>
        </Row>
    </Container>    
    )
}
