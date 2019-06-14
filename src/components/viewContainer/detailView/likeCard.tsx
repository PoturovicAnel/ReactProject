import { Component, Fragment, CSSProperties } from "react";
import { RouteComponentProps } from "react-router-dom";
import React from "react";
import {FaRegHeart} from 'react-icons/fa'
import {FaHeart} from 'react-icons/fa'
import { ThemeContext, ThemedCSSProperties } from "../../../contexts/themeContext";

interface Props extends RouteComponentProps {}

interface State {
    isModalOpen: boolean

}
var MyPictures = JSON.parse(localStorage.getItem('MyPictures')) || [];


export default class ImageLike extends Component<Props> {
  
  
  showLikedImages(){
    localStorage.getItem("MyPictures")
    
  }
  
  
  
  render() {
    console.log(MyPictures)
    var mypathname = window.location.pathname; 
        return (
                    <ul>
                        {MyPictures.filter(t=>t.Search === mypathname).map( (MyPictures: string | undefined) =>{
                            return (
                              
                              <ul>
                              <h1> You like this Pictures <FaHeart> </FaHeart> </h1>
                                <li>
                                  < img src=
                                {MyPictures.PictureUrl}

                                  ></img>
                                </li>  

                              </ul>
                               
                            )
                                
                        })}
                    </ul>
        )
  }
}
