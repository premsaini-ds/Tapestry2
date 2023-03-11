import * as React from "react";
import gallerybg from "../../images/bg-service.jpg"

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
    </>
  );
};

export default PhotoGallery;