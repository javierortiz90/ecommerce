import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import { getFirestore, getDocs, where, query, collection } from "firebase/firestore";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';

export const ItemListContainer = () => {
    
    const[items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    const {id} = useParams()

    useEffect(() => {
      const db = getFirestore()

      const refCollection = !id
      ? collection(db, "items")
      : query(collection(db, "items"), where("categoryId", "==", id))

      getDocs(refCollection)
      .then((snapshot) => {
        setItems(
          snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
          })
        )
      })
    .finally(()=> setLoading(false))
}, [id]);

if(loading)
  return <Container className="p-5"><ProgressBar animated striped variant="secondary" now={100} /></Container>;

if(items.length === 0)
    return <Container className="mt-4 text-center"><h2>Lo siento, no pudimos encontrar lo que estas buscando</h2></Container>
    

    return(
    <Container className="mt-4">
        <h1>Listado de Vehiculos</h1>
        <Container className="mt-4">
          <Row >
            {items.map (i => 
                <Col xs={6} md={6} lg={4} xl={3} className=" my-3" key={i.id}>
                    <Card className="px-0 h-100 border-0 shadow" >
                      <Card.Img className="card-img" variant="top" src={i.imageId} />
                      <Card.Body>
                        <Card.Title>{i.title} ∙ {i.model}</Card.Title>
                        <Card.Text>{i.year} ∙ {i.kmts} Km ∙ {i.transmition}</Card.Text>
                        <hr />
                        <h6>Precio Contado</h6>
                        <h2>${i.price}</h2>
                        <Link to={`/item/${i.id}`}><Button className="w-100" variant="primary">Ver</Button></Link>
                      </Card.Body>
                    </Card>
                  </Col>
                  )
                }
            </Row>
        </Container>
    </Container>
)}


