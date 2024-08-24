import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { ItemsContext } from "../contexts/itemsContext";
import { ItemCount } from "./itemCount";
import { getFirestore, getDoc, doc } from "firebase/firestore";

export const ItemDetailContainer = () => {
    
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)

    const {id} = useParams()

    const {addItem} = useContext(ItemsContext)

    const onAdd = (count) => {
    addItem({...item, quantity: count})
    }

    useEffect(() => {
        const db = getFirestore()

        const refDoc = doc(db, "items", id)

        getDoc(refDoc)
        .then((snapshot) => {
            setItem({ id: snapshot.id, ...snapshot.data()})
        })
    .finally(()=> setLoading(false))
}, [id])

if(loading)
    return <Container className="p-5"><ProgressBar animated striped variant="secondary" now={100} /></Container>;

if(!item)
    return <Container className="mt-4 text-center"><h2>No existe la pagina que estas buscando</h2></Container>

    return(
    <Container>
        <Row className="py-5">
            <Col sm={12} lg={6} xl={8}>
                <Image src={item.imageId} fluid rounded/>
            </Col>
            <Col sm={12} lg={6} xl={4}>
                <div className="rounded h-100 p-4 shadow">
                <h1>{item.title} ∙ {item.model}</h1>
                <p>{item.year} ∙ {item.kmts} Km ∙ {item.transmition}</p>
                <hr />
                <h5>Precio contado</h5>
                <h3>${item.price}</h3>
                <hr />
                <h5>Detalles</h5>
                <p>{item.details}</p>
                <p>Stock: {item.stock}</p>
                <ItemCount stock={ item.stock } onAdd={onAdd}/>
                </div>
            </Col>
        </Row>
    </Container>    
    )
}
