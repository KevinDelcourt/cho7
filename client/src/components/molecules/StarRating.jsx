
import React from "react"
import styled from "styled-components"

const Star = styled.div`
   font-size: 30px;
`;

class StarRating extends React.Component {  
    
    constructor(props){
        super(props);
        this.changeStar = this.changeStar.bind(this);     
        this.state = {           
            cont: 0
        }
    }    
    
    changeStar(c){               
       this.setState({cont : c});    
    }     
    

    render() {
        let starTab=[
            <span onClick={() => this.changeStar(1)}>&#9734;</span>,
            <span onClick={() =>this.changeStar(2)}>&#9734;</span>,
            <span onClick={() =>this.changeStar(3)}>&#9734;</span>,
            <span onClick={() =>this.changeStar(4)}>&#9734;</span>,
            <span onClick={() =>this.changeStar(5)}>&#9734;</span>,
        ]
        for (let index = 0; index < 5; index++) {
            if(index<this.state.cont)
                starTab[index]=(<span onClick={() =>this.changeStar(index+1)}>&#9733;</span>)
            else{
                starTab[index]=(<span onClick={() =>this.changeStar(index+1)}>&#9734;</span>)
            }
            
        }
        return (
        <Star >   
            {starTab}
            {this.state.cont!==0?this.state.cont:""} /5          
        </Star>     
          
        )
    }
}

export default StarRating
