import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
            
import data from "../data/products.json";


export const ItemListContainer = () => {
    
    const[items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    const {id} = useParams()

    useEffect(() => {
    new Promise((resolve, reject) => {
       setTimeout( () => resolve(data), 2000)
    })
    .then((response)=> {
      if(!id){
        setItems(response)
      }else{
        const filtered = response.filter((i) => i.category === id)
        setItems(filtered)
      }
      })
    .finally(()=> setLoading(false))

}, [id])

if(loading)
  return <Container className="p-5"><ProgressBar animated striped variant="secondary" now={100} /></Container>;

if(items.length === 0)
    return <Container className="mt-4 text-center"><h2>Lo siento, no pudimos encontrar lo que estas buscando</h2></Container>
    

    return(
    <Container className="mt-4">
        <h1>Listado de Vehiculos</h1>
        <Container className="mt-4">
          <Row>
            {items.map (i => 
                <Col xs={6} md={6} lg={4} xl={3} className=" my-2">
                    <Card className="px-0 h-100" key={i.id} >
                      <Card.Img variant="top" src={i.image} />
                      <Card.Body>
                        <Card.Title>{i.name} {i.model}</Card.Title>
                        <Card.Text>{i.category}</Card.Text>
                        <Card.Subtitle className="mb-2 text-muted">{i.price}</Card.Subtitle>
                        <Link to={`/item/${i.id}`}><Button variant="primary">Ver</Button></Link>
                      </Card.Body>
                    </Card>
                  </Col>
                  )
                }
            </Row>
        </Container>
    </Container>
)}
