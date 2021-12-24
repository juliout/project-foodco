import './Card.css'

export default function Card ({name, image, discount, Key}) {
    return (
        <div className="fCard" key={Key}>
            <img src={`https://clube-static.clubegazetadopovo.com.br/${image}`} alt="" />
            <h1>{name}</h1>
            <p>
                desconto : {discount}%
            </p>
        </div>
    )
}