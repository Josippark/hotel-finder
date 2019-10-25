import React from 'react';
import classes from './CardWrapper.module.scss';

import Card from '../Card/Card'
import { connect } from 'react-redux';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { slideCarouselNext, slideCarouselPrev } from '../../store/actions/Actions'

const CardWrapper = (props) => {

    function animate() {

        let card = document.getElementById("leftCard");
        card.style.transform= "translateX(-50%)";
        card.style.transition = "1s";
    }

    const slideNext = () => {
        
        props.slideNext();
        setTimeout(function(){animate()},2000)
      

    }
    const slidePrev = () => {
        // let cardR = document.getElementById('rightCard')
        // cardR.style.transform= "translateX(-50%)";
        // cardR.style.transition = "1s"

        
        props.slidePrev();
    }

    return (
        <div className={classes['Card-wrapper']}>
            {/* {props.hotels.length === 0 ? <p>There is no existing hotels for search criteria.</p> :props.hotels.map((item,index)=>(
                <Card key={index} hotel = {item}/>
            ))} */}

            {props.hotels.length === 0 ? <p>There is no existing hotels for search criteria.</p>:
                <div className={classes['Card-carousel']}>

                    {props.hotels.length > 0 ? <Card id="rightCard" style={rightCard} hotel={props.hotels[props.index + 1]} /> : null}

                    {props.index >0  ? <Card id="leftCard" style={leftCard} hotel={props.hotels[props.index - 1]} /> : null}

                    <Card hotel={props.hotels[props.index]} />

                    {props.index > 0 ? <button className={classes['Card-carousel__button-left']} onClick={slidePrev}><FontAwesomeIcon icon={faChevronLeft} /></button> : null}

                    {props.index < props.hotels.length - 1 ? <button className={classes['Card-carousel__button-right']} onClick={slideNext}><FontAwesomeIcon icon={faChevronRight} /></button> : null}
                </div>
            }


        </div>
    );
}



const leftCard = {

    position: "absolute",
    opacity: 0.5,
    width: "16rem",
    height: "24rem",
    zIndex: 0,
    

}
const rightCard = {

    position: "absolute",
    opacity: 0.5,
    width: "16rem",
    height: "24rem",
    zIndex: 0,
    transform:"translate(50%)"
    

}

const mapDispatchToProps = dispatch => {
    return {
        slideNext: () => {
            dispatch(slideCarouselNext())
        },
        slidePrev: () => {
            dispatch(slideCarouselPrev())
        }
    }

}
function mapStateToProps(state) {
    return {
        hotels: state.hotels,
        index: state.carouselIndex
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(CardWrapper);
