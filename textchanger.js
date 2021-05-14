
const AllLower = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const allLowerLength = AllLower.length;

exports.textChanger = function(file, offsetStep, action) {

  if(action === 'encode'){
    offsetStep = Number(offsetStep)
  } else if (action === 'decode'){
    offsetStep = -Number(offsetStep)
  }

  return file.toString().split('').map(letter => {
 
    const LetterChanger = () => {
      const index = AllLower.indexOf(letter, 0)
      if (index >= 0){
        let resultIndex = index + offsetStep
  
        if(resultIndex >= allLowerLength){
          resultIndex = resultIndex % allLowerLength
        } else if (resultIndex < -allLowerLength){

          if(resultIndex % allLowerLength === -0){
            resultIndex = 0
          } else {
            resultIndex = allLowerLength + (resultIndex % allLowerLength)
          }
          
        }else if (resultIndex < 0){        
          resultIndex = allLowerLength + resultIndex
        }
        letter = AllLower[resultIndex]
      }
    } 
  
    if(letter.toUpperCase() === letter) {
      letter = letter.toLowerCase()
      LetterChanger()
      letter = letter.toUpperCase()
    } else {
      LetterChanger()
    }
    
    return letter
  }).join('')
}
