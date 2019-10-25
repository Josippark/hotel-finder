import React from 'react'
import classes from './Search.module.scss'
import firebase from 'firebase';
import { connect } from 'react-redux';
import {fetchHotels} from '../../store/actions/Actions'


class Search extends React.Component {

    state = {
        searchParam: ''
    }

    
    render() {

        const searchHotel = (e) => {
            e.preventDefault();
            console.log(this.state.searchParam);
            this.props.searchHotel(this.state.searchParam)
        }
        return (
            <div className={classes['Search']}>
              
                <form onSubmit={searchHotel}>
                    <div className={classes['Search__input-wrapper']} >
                        <input className={classes['Search__input']} name="hotelCode" type="text"
                         value={this.state.searchParam} 
                         onChange={(e)=>this.setState({searchParam:e.target.value})} 
                         id="hotelCode" placeholder="Insert city code here.." />
                    </div>
                    <div className={classes['Search__button-wrapper']}>
                        <button className={classes['Search__button']}>Search</button>
                    </div>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        searchHotel: (searchParam) => { 
            dispatch(fetchHotels(searchParam))
        }
    }
}
export default connect(null,mapDispatchToProps)(Search);

