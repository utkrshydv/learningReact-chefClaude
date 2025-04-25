import React from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"
import { getRecipeFromMistral } from "./ai"
export default function Form() {

    const hf_token = import.meta.env.VITE_APP_API_KEY

    const [ingredients, setIngredients] = React.useState([])

    const[isLoading, setIsLoading] = React.useState(false)

    const [recipe, setRecipe] = React.useState("")

    const recipeSection = React.useRef(null)


    React.useEffect(()=>{
        if(recipe && recipeSection.current){
            recipeSection.current.scrollIntoView({behavior:"smooth"})
        }
    }, [recipe])

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")

        if(newIngredient.trim().length !== 0){
        if(ingredients.includes(newIngredient)){
            alert("already in the list")
        } else {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        }
    } else{
        alert("Please enter an item")
     }
       
    }


    

    async function callGetARecipie(){
    setIsLoading(true)
    try{
        const generatedRecepie = await getRecipeFromMistral(ingredients)
       setRecipe(generatedRecepie) 
       console.log(generatedRecepie) 
    } catch(error){
        console.error("Error fetching the recipie: ", error)
    } finally{
        setIsLoading(false)
    }        
}

    
   

  

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano (enter atleast 4)"
                    aria-label="Add ingredient"
                    name="ingredient"
                    
                />
                <button>Add ingredient</button>
            </form>
            <div className="warning"></div>
          {ingredients.length >0 ? <IngredientsList
          ref={recipeSection}
          ingredients = {ingredients}
          callGetARecipie={callGetARecipie}
    

          /> : null}
   { isLoading? <p>Loading...</p> :
   recipe && <ClaudeRecipe
     recipe={recipe}
   />}
        </main>
    )
}