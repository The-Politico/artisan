
export default function slugMaker(textInput) {

  return textInput.toLowerCase().replace(' ', '-'); 

}