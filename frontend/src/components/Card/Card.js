import React from 'react';
import classes from './Card.module.scss'
import logo from '../../assets/images/bg.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWalking, faEuroSign, faDollarSign, faPoundSign, faStar } from '@fortawesome/free-solid-svg-icons'

const Card = (props) => {

    const rating = []
    for (let index = 0; index < props.hotel.rating; index++) {
        rating.push(<FontAwesomeIcon key={index} icon={faStar} />)

    }

    const currencySign = [];

    switch (props.hotel.price.currency) {
        case "GBP":
            currencySign.push(faPoundSign)
            break;
        case "USD":
            currencySign.push(faDollarSign)
            break;
        case "EUR":
            currencySign.push(faEuroSign)
            break;
        default:
            break;

    }
    console.log(currencySign)

    return (

        <div className={classes['Card']} {...props}>
            <div className={classes['Card__header']}>
                <img src={logo} alt="logo" className={classes['Card__image']} />
            </div>
            <div className={classes['Card__heading']}>
                {props.hotel.hotelName}
                <div className={classes['Card__rating']}>
                    {rating}
                </div>
            </div>
            <div className={classes['Card__content']}>
                <div className={classes['Card__left-info']}>
                    <div className={classes['Card__left-small-info']}> Type: {props.hotel.hotelType}</div>
                    <div className={classes['Card__left-small-info']}> </div>
                </div>
                <div className={classes['Card__rightInfo']}>
                    <div className={classes['Card__right-small-info']}><FontAwesomeIcon icon={faWalking}/> {props.hotel.hotelDistance.distance} {props.hotel.hotelDistance.distanceUnit}</div>
                    <div className={classes['Card__right-small-info']}><FontAwesomeIcon icon={currencySign[0]}/> {props.hotel.price.total} </div>
                </div>
            </div>
            {props.hotel.available ?
                <div className={classes['Card__availability-green']}>
                    <p className={classes['Card__availability-text']}>AVAILABLE</p>
                </div> :

                <div className={classes['Card__availability-red']}>
                    <p className={classes['Card__availability-text']}>NOT AVAILABLE</p>
                </div>
            }


        </div>


    );
}

export default Card;
