import imageCompression from "browser-image-compression"
async function compressImage(imageFile) {
  if (!imageFile) {
    return false
  }
  // console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
  // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
  const options = {
    maxSizeMB: .500,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType:".png"
  }
  try {
    var compressedImage = await imageCompression(imageFile, options);
    //console.log(`compressedFile size ${compressedImage.size}`); // smaller than maxSizeMB
    var imageUrl = URL.createObjectURL(compressedImage)
    return [compressedImage,imageUrl]
  } catch (error) {
    console.log(error);
    return false
  }
}
export default compressImage