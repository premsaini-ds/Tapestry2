import * as React from "react";
import gallerybg from "../../images/bg-service.jpg"
import { useRef, useState, useEffect } from "react";
const PhotoGallery = (props: any) => {

   const photos = props.GalleryPhoto.map((element:any,index:number) => {
    // console.log("kingpk",element);
    // console.log(element.image); 
    const {height,url, width}=element; 
    return (
          <div className="image-frame columnlightbox">
                <img src={url} style={{width:"100%"}} onClick={() => { openModal(); currentSlide(index);}} className={index+"hover-shadowbox cursorlightbimg lightboximg"} alt="photogallery"></img>
          </div>
    )
});

      const openModal = () => {
              document.getElementById("myModal").style.display = "block";
      }
      const closeModal = () => {
        document.getElementById("myModal").style.display = "none";
      }

  const showSlides = (n:any) => {
                                 console.log("herehere",n);
                                 var i;
                                  var slides = document.getElementsByClassName("mySlidesbox");
                                  var dots = document.getElementsByClassName("demolightbox");
                                  var captionText = document.getElementById("caption");
                                  if (n > slides.length) {slideIndex = 1}
                                  if (n < 1) {slideIndex = slides.length}
                                  for (i = 0; i < slides.length; i++) {
                                      slides[i].style.display = "none";
                                  }
                                  for (i = 0; i < dots.length; i++) {
                                      dots[i].className = dots[i].className.replace(" activebox", "");
                                  }
                                  slides[slideIndex-1].style.display = "block";
                                  dots[slideIndex-1].className += " activebox";
                                  captionText.innerHTML = dots[slideIndex-1].alt;
          }
       var slideIndex = 0;

      // showSlides(slideIndex);

          const plusSlides = (n:any) => {
              showSlides(slideIndex += n);
            }
          const currentSlide = (n:any) => {
                  showSlides(slideIndex = n+1);
          }


  return (
    <>
      <div className="space-y-5 container mx-auto mb-10">
        <div className="sec-title text-center">
             <h2> OUR GALLERY</h2>
          </div>
        <div className="photos-row photoGallerySec">
            {photos}
        </div>
      </div>
<div id="myModal" className="modallightbox">
  <span className="closelightbox cursorlightbimg" onClick={() => { closeModal();}} >&times;</span>
  <div className="modal-content-box">
  {props.GalleryPhoto.map((element:any,index:number) => {
            const {url}=element; 
            return (
            <div className="mySlidesbox">
              <div className="numbertextlightbox">{index+1} / {props.GalleryPhoto.length}</div>
              <img src={url}  className="lightboximg" />
            </div>
            )
            })}
   
    <a className="prevbox" onClick={() => plusSlides(-1)}>&#10094;</a>
    <a className="nextbox" onClick={() => plusSlides(1)}>&#10095;</a>

    <div className="caption-container-light">
      <p id="caption"></p>
    </div>
    <div className="lightboxbottom">
        {props.GalleryPhoto.map((element:any,index:number) => {
                const {url}=element; 
                return (
              <div className="columnlightbox">
                <img className="demolightbox cursorlightbimg lightboximg" src={url} style={{width:"100%"}} onClick={() => currentSlide(index)} alt="Nature and sunrise"/>
              </div>
        )
        })}
  </div>
  </div>
    </div>
  </>
  );
};

export default PhotoGallery;