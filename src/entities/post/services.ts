export const contentValidationError = (content:string) =>{
if(content.length<= 0){
    return {error: "You have to write something"}
}
if(content.length>240){
    return {error: "Text is too long"}
}
return {success: true}
}