import * as React from "react";
import gallerybg from "../../images/bg-service.jpg"
import { useRef, useState, useEffect } from "react";

const PhotoGallery = (props: any) => {

   const photos = props.GalleryPhoto.map((element:any) => {
    // console.log("kingpk",element);
    // console.log(element.image); 
    const {height,url, width}=element; 
    return (<div className="image-frame">
      <img   height={height}   
      src={url} // use normal <img> attributes as props
        width={width}       
        className="image  "
       alt="photogallery" 
      >
      </img>
    </div>)
});



// const openModal = (document:any) => {
//   document.getElementById("myModal").style.display = "block";
// }

// const closeModal = (document:any) => {
//   document.getElementById("myModal").style.display = "none";
// }


// const showSlides = (n:any) => {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
//   var dots = document.getElementsByClassName("demo");
//   var captionText = document.getElementById("caption");

  
//   if (n > slides.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";
//   dots[slideIndex-1].className += " active";
//   captionText.innerHTML = dots[slideIndex-1].alt;
// }

// var slideIndex = 1;
// showSlides(slideIndex);

// const plusSlides = (n:any) => {
//   showSlides(slideIndex += n);
// }

// const currentSlide = (n:any) => {
//   showSlides(slideIndex = n);
// }

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











{/* 
<div className="row">
  <div className="column">
    <img src="https://www.w3schools.com/howto/img_nature.jpg" style={{width:"100%"}} onClick={() => { openModal(); currentSlide(1);}} className="hover-shadow cursor"/>
  </div>
  <div className="column">
    <img src="https://www.w3schools.com/howto/img_snow.jpg" style={{width:"100%"}} onClick={() => { openModal(); currentSlide(2);}} className="hover-shadow cursor"/>
  </div>
  <div className="column">
    <img src="https://www.w3schools.com/howto/img_mountains.jpg" style={{width:"100%"}} onClick={() => { openModal(); currentSlide(3);}} className="hover-shadow cursor"/>
  </div>
  <div className="column">
    <img src="https://www.w3schools.com/howto/img_lights.jpg" style={{width:"100%"}}  onClick={() => { openModal(); currentSlide(4);}} className="hover-shadow cursor"/>
  </div>
</div>

<div id="myModal" className="modal">
  <span className="close cursor" onClick={closeModal}>&times;</span>
  <div className="modal-content">

    <div className="mySlides">
      <div className="numbertext">1 / 4</div>
      <img src="https://www.w3schools.com/howto/img_nature.jpg" style={{width:"100%"}}/>
    </div>

    <div className="mySlides">
      <div className="numbertext">2 / 4</div>
      <img src="https://www.w3schools.com/howto/img_snow.jpg" style={{width:"100%"}}/>
    </div>

    <div className="mySlides">
      <div className="numbertext">3 / 4</div>
      <img src="https://www.w3schools.com/howto/img_mountains.jpg" style={{width:"100%"}}/>
    </div>
    
    <div className="mySlides">
      <div className="numbertext">4 / 4</div>
      <img src="https://www.w3schools.com/howto/img_lights.jpg" style={{width:"100%"}}/>
    </div>
    
    <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
    <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>

    <div className="caption-container">
      <p id="caption"></p>
    </div>


    <div className="column">
      <img className="demo cursor" src="img_nature_wide.jpg" style={{width:"100%"}} onClick={() => currentSlide(1)} alt="Nature and sunrise"/>
    </div>
    <div className="column">
      <img className="demo cursor" src="img_snow_wide.jpg" style={{width:"100%"}} onClick={() => currentSlide(2)} alt="Snow"/>
    </div>
    <div className="column">
      <img className="demo cursor" src="img_mountains_wide.jpg" style={{width:"100%"}} onClick={() => currentSlide(3)} alt="Mountains and fjords"/>
    </div>
    <div className="column">
      <img className="demo cursor" src="img_lights_wide.jpg" style={{width:"100%"}} onClick={() => currentSlide(4)} alt="Northern Lights"/>
    </div>
  </div>
</div> */}





    </>
  );
};

export default PhotoGallery;