# Recipe Api :fried_shrimp:	

## Team Members:
* Khaled Ramadan
* Mahmoud Essam
* Samar Mahmoud
* Esraa Said

## Recipe Program Functions:
### 1. getRecipe 
* **Description:** Find recipes based on specific optional criteria.
* **Route:** {{url}}/api/  ${\color{blue}Get}$		
* **Optional Parameters:** Contains optional query parameters for filtering recipes. It may include properties like:
    - name (string): match for recipe name (case-insensitive).
    - chefName (string): match for chef name (case-insensitive).
    - minPrice (number): Minimum price range.
    - maxPrice (number): Maximum price range.
    - sort (string): Sorting criteria ( "price" for ascending order, "-price" for descending order).
* **Returns:**
    - JSON object containing an data of matching recipes (on success).
    - Error message and appropriate status code (on failure).

### 2. getRecipeById 
* **Description:** Find specific recipe using id.
* **Route:** {{url}}/api/:id1   ${\color{blue}Get}$	
* **Returns:**
    - JSON object containing data of matching recipe (on success).
    - Error message and appropriate status code (on failure).

### 3. showRecipeDetails
* **Description:** Get details of specific recipe using id.
* **Route:** {{url}}/api/:id    ${\color{blue}Get}$	
* **Returns:**
    - JSON object containing data of matching recipe (on success).
    - Error message and appropriate status code (on failure).

### 4. updateRecipe
* **Description:** Update data of specific recipe using id.
* **Route:** {{url}}/api/:id   ${\color{orange}Patch}$	
* **Returns:**
    - JSON object containing updated data of matching recipe (on success).
    - Error message and appropriate status code (on failure).

### 5. getChefById
* **Description:** Get chef data using his id.
* **Route:** {{url}}/api/chef/:chefId   ${\color{blue}Get}$		
* **Returns:**
    - JSON object containing data of matching chef (on success).
    - Error message and appropriate status code (on failure).

### 6. createRecipe
* **Description:** Create new recipe.
* **Route:** {{url}}/api/   ${\color{green}Post}$	
* **Returns:**
    - JSON object containing data of the new recipe (on success).
    - Error message and appropriate status code (on failure).

### 7. deleteRecipe
* **Description:** Delete specific recipe using id.
* **Route:** {{url}}/api/:id   ${\color{red}Delete}$	
* **Returns:**
    - JSON object containing successfully delete message  (on success).
    - Error message and appropriate status code (on failure).

### 8. getSimilarRecipes
* **Description:** Find recipes that have common ingredients with specific recipe.
* **Route:** {{url}}/api/:id/similar   ${\color{blue}Get}$	
* **Returns:**
    - JSON object containing similar recipes  (on success).
    - Error message and appropriate status code (on failure).

## How to run: 
*    git clone https://github.com/khaled-Ramdan/recipe-api.git
*    npm install
## How to use docker:  
* **build:** docker build -t recipe-api .
* **Run:** docker run -p 5000:5000 recipe-api
* **Stop:** 
    - docker ps 
    - docker stop <container-id>
