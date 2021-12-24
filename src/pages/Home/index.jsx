import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import { foodCoApi} from '../../services/Apis'

import './Home.css'

export default function Home() {

    const [partners, setPartners] = useState('')
    const [filteredPartners, setFilteredPartners] = useState('')
    
    const [count, setCount] = useState(15)

    function searchPart(value) {
        if(value === ''){
            setFilteredPartners(partners)
        }else{
            const filtrar = partners.filter((valorAtual) => {
                const fantasyName = valorAtual.fantasyName.toLowerCase()
                return fantasyName.indexOf(value.toLowerCase()) >= 0           
            })
            setFilteredPartners(filtrar)
        }
    }

    function morePage() {
        if(count > 0){
            setCount(count+10)
        }
    }

    useEffect( () => {
        
        async function partnersApi() {

            const response = await foodCoApi.get('/all.json')
            response.data.sort( (a, b) => {
                if(a.fantasyName < b.fantasyName) {
                    return -1
                }else{
                    return true
                }
            })
            setPartners(response.data)
            setFilteredPartners(response.data)
        }
        partnersApi()
    },[])

    return (
        
        <div className="mainBox">
            
            <div className='nav'>
                <img src="images/foodcoLogo.png" alt="logo" className="fLogo"/>
                
                <div className="fPesquisa">
                    <input type="text" placeholder="Pesquisar" onKeyUp={ e => searchPart(e.target.value)}/>
                </div>
            </div>

            <div className='fTitle'>
                <img src="images/partners.png" alt="partners" />
                <h1>partners</h1>
            </div>

            <div className="fContainer">
                <div className='containerCards'>
                    
                {filteredPartners !== '' ?
                    filteredPartners.slice(0,count).map((p) => {
                        return (
                            <Card 
                                name={p.fantasyName} image={p.cover} 
                                discount={p.discountAmount} Key={p.id}
                            />
                        )
                    }) : null
                }
                </div>

                <div className='buttonMore'>
                    <button onClick={() => {morePage()} }> Mais </button>
                </div>

            </div>
        </div>
    )
}