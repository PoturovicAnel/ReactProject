import React, { Component, CSSProperties, Fragment, RouteProps  } from 'react';
import Spinner from '../../spinner';
import { ThemedCSSProperties, ThemeContext, ThemeState } from '../../../contexts/themeContext';
import {FaRegHeart} from 'react-icons/fa'
import {FaHeart} from 'react-icons/fa'
import { IconType } from 'react-icons/lib/cjs';
import { RouteComponentProps } from 'react-router-dom';

export interface ImageUrls {
    full: string
    raw: string
    regular: string
    small: string
    thumb: string
}

interface Props extends RouteComponentProps  {
    urls: ImageUrls
    view: string
}
interface State {
    isHover: boolean
    isModalOpen: boolean
    currentIcon: IconType
    value: any
}

var MyPictures = JSON.parse(localStorage.getItem('MyPictures')) || [];


export default class ImageCard extends Component<Props & RouteProps> {

    state: State = {
        isHover: false,
        isModalOpen: false,
        currentIcon: FaRegHeart,
        value: "Cat"
    }   
    get view() {
        return this.props.match.url.substr();
    }
    

        GetIcon(){
        let component;
        if (this.state.currentIcon === FaHeart){
            component = <FaHeart> </FaHeart>;
            console.log("heart")
            MyPictures.push({"PictureUrl" : this.props.urls.small, "Search" : window.location.pathname})
            localStorage.setItem("MyPictures", JSON.stringify(MyPictures))
        }else{ 
            component = <FaRegHeart> </FaRegHeart>;
            console.log("Noheart")
        }
        return component;
    }
    
    style(theme: ThemeState): CSSProperties {
        const hover: CSSProperties = this.state.isHover ? {
            boxShadow: `0 8px 40px -5px ${theme.foreground.darkened}`,
            transform: 'scale(1.05, 1.05) translateY(-1%)'
        } : {}
        return {
            ...imageContainer(theme),
            ...hover
        }
    }

    onClick = () => {if (this.state.currentIcon === FaRegHeart)
        this.setState({currentIcon : FaHeart})
        else {
         this.setState({currentIcon : FaRegHeart})
        }   
    }

    
    onMouseEnter = () => this.setState({ isHover: true })
    onMouseLeave = () => this.setState({ isHover: false })
    openModal = () => this.setState({ isModalOpen: true });
    closeModal = () => this.setState({ isModalOpen: false });

    render() {
        const { urls } = this.props
        return (
            <Fragment>
                <ThemeContext.Consumer>
                    {({ theme }) => (
                        <div
                        style={this.style(theme)}
                        onClick ={this.onClick}


                        >
                    


                         <div>
                             
                              {this.GetIcon()  } 
                        </div>
                            {urls.small ? <img src={urls.small} style={card}/> : <Spinner/>}
                        </div>
                    )}
                </ThemeContext.Consumer>
            </Fragment>
        )
  }
}

const imageContainer: ThemedCSSProperties = (theme) => ({
    margin: '1em',
    flexGrow: 1,
    background: `${theme.background.primary}AA`,
    width: '12em',
    height: '18em',
    transition: 'all 300ms'
})

const card: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
}
const preview: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
}